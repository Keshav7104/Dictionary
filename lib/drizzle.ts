import { integer, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";

export const WordTable = pgTable("words", {
  id: serial("id").primaryKey(),
  word: varchar("word", { length: 100 }).notNull(),
  partofspeech: varchar("partofspeech", { length: 50 }),
  usage: text("usage"),
  synonymid: integer("synonymid"),
  antonymid: integer("antonymid"),
  addedby: varchar("addedby", { length: 100 }).references(
    () => UserTable.username
  ),
});

export const wordsRelations = relations(WordTable, ({ one }) => ({
  synonym: one(WordTable, {
    fields: [WordTable.synonymid],
    references: [WordTable.id],
  }),
  antonym: one(WordTable, {
    fields: [WordTable.antonymid],
    references: [WordTable.id],
  }),
}));

export type Word = InferSelectModel<typeof WordTable>;
export type NewWord = InferInsertModel<typeof WordTable>;

export const UserTable = pgTable("users", {
  username: varchar("username", { length: 100 }).primaryKey(),
  email: varchar("email", { length: 100 }).notNull(),
  password: varchar("password", { length: 100 }).notNull(),
});

export type User = InferSelectModel<typeof UserTable>;
export type NewUser = InferInsertModel<typeof UserTable>;


export const MeaningsTable = pgTable('meanings', {
  id: serial('id').primaryKey(),
  meaning: text('meaning').notNull(),
  wordid: integer('wordid').references(() => WordTable.id),
  addedby: varchar('addedby', { length: 100 }).references(() => UserTable.username),
});

// Define types for the meanings table
export type Meaning = InferSelectModel<typeof MeaningsTable>;
export type NewMeaning = InferInsertModel<typeof MeaningsTable>;

// Connect to Vercel Postgres
export const db = drizzle(sql);
