import {
  pgTable,
  serial,
  text,
  uniqueIndex,
} from 'drizzle-orm/pg-core'
import { InferSelectModel, InferInsertModel } from 'drizzle-orm'
import { sql } from '@vercel/postgres'
import { drizzle } from 'drizzle-orm/vercel-postgres'

export const WordTable = pgTable(
  'words',
  {
    id: serial('id').primaryKey(),
    word: text('word').notNull(),
    partofspeech:text('partofspeech'),
    usage:text('usage'),
    synoniumid:text('synoniumid'),
    antoniumid:text('antoniumid'),
    addedby:text('addedby').notNull(),
  },
  (words) => {
    return {
      uniqueIdx: uniqueIndex('unique_idx').on(words.id),
    }
  }
)


export type Word = InferSelectModel<typeof WordTable>
export type NewWord = InferInsertModel<typeof WordTable>

export const UserTable = pgTable(
  'users',
  {
    username:text('username').primaryKey(),
    email:text('email').notNull(),
    password:text('password').notNull()
  },
  (user) => {
    return {
      uniqueIdx:uniqueIndex("unique_idx").on(user.username),
    }
  }
)

export type User = InferSelectModel<typeof UserTable>
export type NewUser = InferInsertModel<typeof UserTable>

// Connect to Vercel Postgres
export const db = drizzle(sql)
