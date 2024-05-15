'use client'
import { useSearchParams } from "next/navigation";
import { useUser } from "@/components/Context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";

function page() {
  const params = useSearchParams();
  const route = useRouter();
  const queryUser = params.get("user");
  const [User, __] = useUser();

  useEffect(() => {
    if (User.length === 0 || User !== queryUser) {
      toast.error("User Not Found please login again");
      route.push("/login");
    }
  }, [User, queryUser, route]);

  return <div>{User.length === 0 ? "Hello world" : queryUser}</div>;
}

export default page;
