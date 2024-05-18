"use client";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { WordHalf, searchForm } from "@/components/types";
import { searchWords } from "@/components/server/words";

export default function Page() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<searchForm>();
  const query = watch("searchterm", "");
  const [Debounced, setDebounced] = useState(query);
  const [Words, setWords] = useState<WordHalf[]>([]);

  const search = async () => {
    console.log(Debounced);
    try {
      const response = await searchWords(Debounced);
      if (response.code !== 200) {
        toast.error(response.message);
        setWords([]);
      } else {
        setWords(response.data);
      }
    } catch (error) {
      toast.error("An unexpected error occurred.");
    }
  };

  const error = () => {
    Object.values(errors).forEach((error) => {
      toast.error(error.message || "An unexpected error occurred.");
    });
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounced(query);
    }, 500); // Adjust the delay as needed

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  useEffect(() => {
    if (Debounced) {
      search();
    }
  }, [Debounced]);

  return (
    <>
      <main className="flex flex-col items-center justify-center gap-8 px-4 py-12 md:px-6 lg:py-16">
        <div className="w-full max-w-xl space-y-4">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            <span className=" font-serif">Look Up</span>
            {"  "}the perfect word
          </h1>
          <p className="text-gray-500 md:text-xl">
            Search our comprehensive dictionary to find the definition,
            synonyms, and more for any word.
          </p>
          <form
            className="flex items-center space-x-2"
            onSubmit={handleSubmit(search, error)}
          >
            <Input
              className="flex-1"
              placeholder="Search for a word..."
              type="search"
              {...register("searchterm", {
                required: "Word is required for searching",
              })}
            />
            <Button>Search</Button>
          </form>
        </div>
        <div className="w-full max-w-xl space-y-4">
          <h2 className="text-lg font-bold">Recently Searched</h2>
          <div className="grid gap-4">
            {Words.map((word, index) => (
              <div
                key={index}
                className="grid grid-cols-[1fr_auto] items-center gap-4 rounded-md border border-gray-200 p-4"
              >
                <div>
                  <div className="font-medium">{word.word}</div>
                  <p className="text-sm text-gray-500">{word.usage}</p>
                </div>
                <Link
                  className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
                  href={{ pathname: "/words", query: { wordId: word.id } }}
                >
                  View
                </Link>
              </div>
            ))}
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
