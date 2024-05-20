import { Word } from "@/lib/drizzle";

export type IFormInput = {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  }

export type LoginForm ={
  username:string,
  password:string,
}

export type searchForm = {
  searchterm:string,
}

export type WordHalf = {
  id:number,
  word:string,
  usage:string | null,
}

export type Nouym = {
  id:number,
  word:string,
}

export type SearchResponse = {
  code: number;
  data: {
    word:Word[],
    synonym:Nouym[],
    antonym:Nouym[],
    meaning:{meaning:string}[],
  } | null;
  message: string;
};


export type SearchResponseHome = {
  code: number;
  data: WordHalf[];
  message: string;
};

