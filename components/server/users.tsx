"use server";

import { IFormInput, LoginForm, SearchResponse, SearchResponseHome } from "../types";
import { WordTable, db } from "@/lib/drizzle";
import { UserTable } from "@/lib/drizzle";
import { seed } from "@/lib/userseed";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";

// addUser function
export const addUser = async (data: IFormInput):Promise<{code:number,message:string}>=> {
  try {
    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Insert the new user data into the UserTable
    await db
      .insert(UserTable)
      .values({
        username: data.username,
        email: data.email,
        password: hashedPassword,
      })
      .returning();

    return {
      code: 200,
      message: "Signed up successfully. Now you can log in.",
    };
  } catch (e: any) {
    if (e.message.includes(`relation "${UserTable}" does not exist`)) {
      console.log(
        "Table does not exist, creating and seeding it with dummy data now..."
      );
      await seed();
      return {
        code: 500,
        message: "An error occurred, try again after some time.",
      };
    } else if (e.code === "23505") {
      // Unique constraint violation (PostgreSQL specific error code)
      return {
        code: 409,
        message: "User already exists with this username.",
      };
    } else if (
      e.message.includes("NetworkError") ||
      e.message.includes("ECONNREFUSED")
    ) {
      // Network errors
      console.error("Network error, please check your internet connection.");
      return {
        code: 503,
        message: "Network error, please check your internet connection.",
      };
    } else {
      console.error(e);
      return {
        code: 500,
        message: "An unexpected error occurred.",
      };
    }
  }
};

// login function
export const login = async (data: LoginForm):Promise<{code:number,message:string}> => {
  try {
    // Retrieve the user from the database
    const users = await db
      .select({ username: UserTable.username, password: UserTable.password })
      .from(UserTable)
      .where(eq(UserTable.username, data.username))
      .limit(1);

    if (users.length === 0) {
      return { code: 401, message: "Invalid username or password." };
    }

    const user = users[0];

    // Compare the hashed password
    const passwordMatch = await bcrypt.compare(data.password, user.password);

    if (passwordMatch) {
      return { code: 200, message: "Logged in successfully." };
    } else {
      return { code: 401,message: "Invalid username or password." };
    }
  } catch (e: any) {
    if (e.message.includes(`relation "${UserTable}" does not exist`)) {
      console.log(
        "Table does not exist, creating and seeding it with dummy data now..."
      );
      await seed();
      return {
        code: 500,
        message: "An error occurred, try again after some time.",
      };
    } else if (
      e.message.includes("NetworkError") ||
      e.message.includes("ECONNREFUSED")
    ) {
      // Network errors
      console.error("Network error, please check your internet connection.");
      return {
        code: 503,
        message: "Network error, please check your internet connection.",
      };
    } else {
      console.error(e);
      return {
        code: 500, 
        message: "An unexpected error occurred.",
      };
    }
  }
};

export const getWords = async (User:string):Promise<SearchResponseHome> =>{
  try {
    const response = await db.select({
      id:WordTable.id,
      usage:WordTable.usage,
      word:WordTable.word,
    }).from(WordTable).where(eq(WordTable.addedby,User));

    // console.log(response)
    return{
      code:200,
      data:response,
      message:"success"
    }

  } catch (e:any) {
    if (
      e.message.includes("NetworkError") ||
      e.message.includes("ECONNREFUSED")
    ) {
      // Network errors
      console.error("Network error, please check your internet connection.");
      return {
        code: 503,
        data:[],
        message: "Network error, please check your internet connection.",
      };
    } else {
      console.error(e);
      return {
        code: 500, 
        data:[],
        message: "An unexpected error occurred.",
      };
    }
  }
}
