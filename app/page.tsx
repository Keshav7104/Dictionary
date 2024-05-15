import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <>
      <main className="flex flex-col items-center justify-center gap-8 px-4 py-12 md:px-6 lg:py-16">
        <div className="w-full max-w-xl space-y-4">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Find the perfect word
          </h1>
          <p className="text-gray-500 md:text-xl">
            Search our comprehensive dictionary to find the definition,
            synonyms, and more for any word.
          </p>
          <form className="flex items-center space-x-2">
            <Input
              className="flex-1"
              placeholder="Search for a word..."
              type="search"
            />
            <Button type="submit">Search</Button>
          </form>
        </div>
        <div className="w-full max-w-xl space-y-4">
          <h2 className="text-lg font-bold">Recently Searched</h2>
          <div className="grid gap-4">
            <div className="grid grid-cols-[1fr_auto] items-center gap-4 rounded-md border border-gray-200 p-4">
              <div>
                <div className="font-medium">Serendipity</div>
                <p className="text-sm text-gray-500">
                  The occurrence and development of events by chance in a happy
                  or beneficial way.
                </p>
              </div>
              <Link
                className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
                href="#"
              >
                View
              </Link>
            </div>
            <div className="grid grid-cols-[1fr_auto] items-center gap-4 rounded-md border border-gray-200 p-4">
              <div>
                <div className="font-medium">Ephemeral</div>
                <p className="text-sm text-gray-500">
                  Lasting for a very short time; short-lived.
                </p>
              </div>
              <Link
                className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 "
                href="#"
              >
                View
              </Link>
            </div>
            <div className="grid grid-cols-[1fr_auto] items-center gap-4 rounded-md border border-gray-200 p-4">
              <div>
                <div className="font-medium">Quintessential</div>
                <p className="text-sm text-gray-500">
                  Representing the most perfect or typical example of a quality
                  or class.
                </p>
              </div>
              <Link
                className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
                href="#"
              >
                View
              </Link>
            </div>
          </div>
        </div>
      </main>
      <footer className="flex flex-col items-center justify-between gap-4 px-4 py-6 border-t md:flex-row md:px-6">
        <p className="text-sm text-gray-500 ">
          © 2024 Dictionary. All rights reserved.
        </p>
        <nav className="flex items-center gap-4">
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            About
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            Contact
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            Terms
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            Privacy
          </Link>
        </nav>
      </footer>
    </>
  );
}
