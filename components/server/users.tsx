"use server";

import { IFormInput, LoginForm } from "../types";
import { db } from "@/lib/drizzle";
import { UserTable } from "@/lib/drizzle";
import { seed } from "@/lib/userseed";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";

export const addUser = async (data: IFormInput) => {
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

    return { code: 100, message: "Signed up successfully Now you can Login..." };
  } catch (e: any) {
    if (e.message.includes(`relation "${UserTable}" does not exist`)) {
      console.log(
        "Table does not exist, creating and seeding it with dummy data now..."
      );
      await seed();
      return {
        code: 501,
        message: "An error occurred, try again after some time",
      };
    } else if (e.code === "23505") {
      // Unique constraint violation (PostgreSQL specific error code)
      return {
        code: 501,
        message: "User already exists with this username",
      };
    } else if (
      e.message.includes("NetworkError") ||
      e.message.includes("ECONNREFUSED")
    ) {
      // Network errors
      console.error("Network error, please check your internet connection.");
      return {
        code: 501,
        message: "Network error, please check your internet connection.",
      };
    } else {
      console.error(e);
      return {
        code: 501,
        message: "An unexpected error occurred.",
      };
    }
  }
};

export const login = async (data: LoginForm) => {
  try {
    // Retrieve the user from the database
    const users = await db.select().from(UserTable).where(eq(UserTable.username, data.username)).limit(1);

    if (users.length === 0) {
      return { code: 401, message: "Invalid username or password" };
    }

    const user = users[0];

    // Compare the hashed password
    const passwordMatch = await bcrypt.compare(data.password, user.password);

    if (passwordMatch) {
      return { code: 100, message: "Logged in successfully" };
    } else {
      return { code: 401, message: "Invalid username or password" };
    }
  } catch (e: any) {
    if (e.message.includes(`relation "${UserTable}" does not exist`)) {
      console.log(
        "Table does not exist, creating and seeding it with dummy data now..."
      );
      await seed();
      return {
        code: 501,
        message: "An error occurred, try again after some time",
      };
    } else if (
      e.message.includes("NetworkError") ||
      e.message.includes("ECONNREFUSED")
    ) {
      // Network errors
      console.error("Network error, please check your internet connection.");
      return {
        code: 501,
        message: "Network error, please check your internet connection.",
      };
    } else {
      console.error(e);
      return {
        code: 501,
        message: "An unexpected error occurred.",
      };
    }
  }
};
