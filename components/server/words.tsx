"use server";

import { MeaningsTable, db } from "@/lib/drizzle";
import { WordTable } from "@/lib/drizzle";
import { and, eq, like, ne } from "drizzle-orm";
import { SearchResponse, SearchResponseHome } from "../types";
import { alias } from "drizzle-orm/pg-core";

// Define a type for the function's return value

export const searchWords = async (
  searchWord: string
): Promise<SearchResponseHome> => {
  try {
    const words = await db
      .select({
        id: WordTable.id,
        word: WordTable.word,
        usage: WordTable.usage,
      })
      .from(WordTable)
      .where(like(WordTable.word, `%${searchWord}%`))
      .limit(5);

    if (words.length === 0) {
      return {
        code: 404, // Using 404 for "not found"
        data: [],
        message: "Word not found...",
      };
    }

    return {
      code: 200,
      data: words,
      message: "Searched words are here...",
    };
  } catch (e: any) {
    // Simplifying the error handling logic
    if (
      e.message.includes("NetworkError") ||
      e.message.includes("ECONNREFUSED")
    ) {
      return {
        code: 503, // Using 503 for service unavailable
        data: [],
        message: "Please connect to the internet",
      };
    }

    console.log(e);

    return {
      code: 500, // Using 500 for generic server error
      data: [],
      message: "An error occurred, please try again later...",
    };
  }
};

export const searchWord = async (WordId: number): Promise<SearchResponse> => {
  try {
    const response = await db
      .select()
      .from(WordTable)
      .where(eq(WordTable.id, WordId));

    // const word = words[0];

    if (response.length === 0) {
      return {
        code: 404,
        data: null,
        message: "Word not found...",
      };
    }

    const synonyms = await db
      .select({
        word: WordTable.word,
        id: WordTable.id,
      })
      .from(WordTable)
      .where(eq(WordTable.synonymid, WordId));
    const antonyms = await db
      .select({
        word: WordTable.word,
        id: WordTable.id,
      })
      .from(WordTable)
      .where(eq(WordTable.antonymid, WordId));

    const meaning = await db
      .select({
        meaning: MeaningsTable.meaning,
      })
      .from(MeaningsTable)
      .where(eq(MeaningsTable.wordid, WordId));

    return {
      code: 200,
      data: {
        word: response, // Assuming `response` contains word data
        synonym: synonyms,
        antonym: antonyms,
        meaning: meaning,
      },
      message: "Searched word, synonyms, and antonyms are here...",
    };
  } catch (e: any) {
    if (
      e.message.includes("NetworkError") ||
      e.message.includes("ECONNREFUSED")
    ) {
      return {
        code: 503,
        data: null,
        message: "Please connect to the internet",
      };
    }

    console.log(e);

    return {
      code: 500,
      data: null,
      message: "An error occurred, please try again later...",
    };
  }
};
