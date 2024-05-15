"use client";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { IFormInput } from "../types";
import { addUser } from "../server/users";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export function Signup() {

  const route = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormInput>();

  const submit = async (data: IFormInput) => {
    try {
      // Show a loading toast while the promise is pending
      await toast.promise(addUser(data), {
        pending: "Processing your request...",
        success: {
          render({ data }) {
            if (data.code === 100) {
              route.push('/login');
              return data.message;
            } else {
              throw new Error(data.message);
            }
          },
        },
        error: {
          render({ data }:{data:any}) {
            return data.message;
        },
        },
      });
    } catch (error: any) {
      // Show error toast if there's an exception
      toast(error.message || "An unexpected error occurred.");
    }
  };

  const error = () => {
    Object.values(errors).forEach((error) => {
      toast.error(error.message || "An unexpected error occurred.");
    });
  };
  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-gray-100 px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 ">
            Create an account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 ">
            Or{"  "}
            <Link
              className="font-medium text-black hover:text-gray-800 "
              href="/login"
            >
              sign in to your existing account
            </Link>
          </p>
        </div>
        <form onSubmit={handleSubmit(submit, error)} className="space-y-6">
          <div>
            <Label htmlFor="username">Username</Label>
            <Input
              autoComplete="username"
              id="username"
              {...register("username", { required: "Username is Mandatory" })}
              placeholder="Enter your username"
              type="text"
            />
          </div>
          <div>
            <Label htmlFor="email">Email address</Label>
            <Input
              autoComplete="email"
              id="email"
              {...register("email", { required: "Email is also mandatory" })}
              placeholder="Enter your email"
              type="email"
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              autoComplete="new-password"
              id="password"
              {...register("password", {
                required: "Password is also mandatory",
                minLength: {
                  value: 8,
                  message: "Password length should be 8 or more",
                },
                maxLength: {
                  value: 12,
                  message: "Password length should 12 or less",
                },
              })}
              placeholder="Enter your password"
              type="password"
            />
          </div>
          <div>
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input
              autoComplete="new-password"
              id="confirm-password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
              placeholder="Confirm your password"
              type="password"
            />
          </div>
          <div>
            <Button className="w-full" type="submit">
              Sign Up
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
