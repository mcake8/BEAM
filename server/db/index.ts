import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

const connectionString = process.env.DATABASE_URL || ''

// postgres-js connects lazily, so an empty string at build time is harmless;
// the first query at runtime is what actually opens a connection.
const client = postgres(connectionString, { max: 10 })

export const db = drizzle(client, { schema })
export { schema }
