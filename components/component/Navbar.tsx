'use client'
import Link from "next/link";
import { useUser } from "../Context";

function Navbar() {
    
  const [User, _] = useUser();
  return (
    <header className="flex items-center justify-between px-4 py-3 border-b md:px-6">
      <Link className="flex items-center gap-2 text-lg font-bold" href="/">
        <span>Look Up</span>
      </Link>
      <div className="flex items-center gap-4">
        {User.length === 0 ? (
          <>
            <Link
              className="text-sm font-medium hover:underline underline-offset-4"
              href="/login"
            >
              Log in
            </Link>
            <Link
              className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 "
              href="/signup"
            >
              Sign up
            </Link>
          </>
        ) : (
          <Link
            className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 "
            href={{ pathname: "/user", query: { user: User } }}
          >
            {User}
          </Link>
        )}
      </div>
    </header>
  );
}

export default Navbar;
