import { sql } from '@vercel/postgres'
import { db } from '@/lib/drizzle'
import { WordTable, Word, NewWord } from './drizzle'

const newwords: NewWord[] = [
  {
    id:4,
    word:'Keshav',
  },
  {
    id:2,
    word:'Vanshika'
  },
  {
    id:3,
    word:'Puaada'
  },
]

export async function seed() {
  // Create table with raw SQL
  const createTable = await sql.query(`
      CREATE TABLE IF NOT EXISTS words (
        id SERIAL PRIMARY KEY,
        word VARCHAR(255) NOT NULL
      );
  `)
  console.log(`Created "words" table`)

  const insertedUsers: Word[] = await db
    .insert(WordTable)
    .values(newwords)
    .returning()
  console.log(`Seeded ${insertedUsers.length} words`)

  return {
    createTable,
    insertedUsers,
  }
}
