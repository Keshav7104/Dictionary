"use client";
import { searchWord } from "@/components/server/words";
import { Nouym } from "@/components/types";
import { Word } from "@/lib/drizzle";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function page() {
  const params = useSearchParams();
  let paramsWord = params.get("wordId");
  const route = useRouter();
  const [Searched, setWord] = useState<Word[] | undefined>([]);
  const [synonyms, setsynonyms] = useState<Nouym[] | undefined>([]);
  const [antonym, setantonym] = useState<Nouym[] | undefined>([]);
  const [meaning, setmeaning] = useState<{ meaning: string }[] | undefined>([]);
  const [loading, setloading] = useState(true);

  const search = async () => {
    if (paramsWord === null) paramsWord = "0";
    const wordId = parseInt(paramsWord);
    try {
      const response = await searchWord(wordId);
      if (response.code !== 200) {
        toast.error(response.message);
        setWord([]);
      } else {
        setWord(response.data?.word);
        setsynonyms(response.data?.synonym);
        setantonym(response.data?.antonym);
        setmeaning(response.data?.meaning);
      }
    } catch (error) {
      toast.error("An unexpected error occurred.");
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    if (!paramsWord) {
      route.push("/");
      toast.error("Word not found try again...");
    } else {
      search();
    }
  }, [paramsWord]);

  return (
    <section className="container mx-auto px-4 md:px-6 py-12 md:py-16 lg:py-20">
      <div className="max-w-3xl mx-auto">
        {loading ? (
          <span>Loading ....</span>
        ) : (
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold">
                {Searched?.length !== 0 && Searched !== undefined
                  ? Searched[0].word
                  : "Unknown"}
              </h1>
              <p className="text-gray-700 text-lg py-3">
                {Searched?.length !== 0 && Searched !== undefined
                  ? Searched[0].partofspeech
                  : "Unknown"}
              </p>
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Meanings of the Word</h2>
              <div className="space-y-2">
                <p>
                  {meaning?.length !== 0 &&
                    meaning !== undefined &&
                    meaning.map((mean, index) => (
                      <span key={index}>{mean.meaning}<br /></span>
                    ))}
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Usage Examples</h2>
              <div className="space-y-2">
                <p>
                  {Searched?.length !== 0 && Searched !== undefined
                    ? Searched[0].usage
                    : "Unknown"}
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Added by</h2>
              <p>
                {Searched?.length !== 0 && Searched !== undefined
                  ? Searched[0].addedby
                  : "Unknown"}
              </p>
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Synonyms</h2>
              <div className="flex flex-wrap gap-2">
                {synonyms?.map((word, index) => (
                  <Link
                    href={{ pathname: "/words", query: { wordId: word.id } }}
                    key={index}
                    className="bg-gray-100 px-3 py-1 rounded-md text-sm"
                  >
                    {word.word}
                  </Link>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Antonyms</h2>
              <div className="flex flex-wrap gap-2">
                {antonym?.map((word, index) => (
                  <Link
                    href={{ pathname: "/words", query: { wordId: word.id } }}
                    key={index}
                    className="bg-gray-100 px-3 py-1 rounded-md text-sm"
                  >
                    {word.word}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default page;
