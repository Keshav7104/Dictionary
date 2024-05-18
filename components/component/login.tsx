"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { LoginForm } from "../types";
import { toast } from "react-toastify";
import { login } from "../server/users";
import { useUser } from "../Context";

export function Login() {
  const [_, setUser] = useUser();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginForm>();

  const submit = async (form: LoginForm) => {
    try {
      // Show a loading toast while the promise is pending
      await toast.promise(login(form), {
        pending: "Processing your request...",
        success: {
          render({ data }) {
            if (data.code === 200) {
              setUser(form.username);
              return data.message + " " + form.username;
            } else {
              throw new Error(data.message);
            }
          },
        },
        error: {
          render({ data }: { data: any }) {
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
    <div className="flex min-h-[100dvh] items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md space-y-4 rounded-lg bg-white p-6 shadow-lg">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Welcome back</h1>
          <p className="text-gray-500">
            Enter your credentials to access your account.
          </p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit(submit, error)}>
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              {...register("username", { required: "Username is Required" })}
              placeholder="Enter your username"
              type="text"
            />
          </div>
          <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              {...register("password", {
                required: "password is required",
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
          <Button className="w-full" type="submit">
            Sign in
          </Button>
        </form>
        <div className="text-center text-sm text-gray-500">
          Don't have an account?
          <Link
            className="font-medium text-gray-900 hover:underline"
            href="/signup"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
