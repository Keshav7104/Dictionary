import { sql } from '@vercel/postgres'
import { NewUser, User, UserTable, db } from '@/lib/drizzle'

const newwords: NewUser[] = [
  {
    username:'Shadow',
    email:'Keshav',
    password:'12345678'
  },
  {
    username:'Panda',
    email:'Vanshika',
    password:'12345678'
  },
]

export async function seed() {
  // Create table with raw SQL
  const createTable = await sql.query(`
  CREATE TABLE IF NOT EXISTS users (
    username VARCHAR(255) PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
  );
  `)
  console.log(`Created "words" table`)

  const insertedUsers: User[] = await db
    .insert(UserTable)
    .values(newwords)
    .returning()
  console.log(`Seeded ${insertedUsers.length} words`)

  return {
    createTable,
    insertedUsers,
  }
}
