import { defineConfig } from "drizzle-kit";

export default defineConfig({
  // Add any additional configuration here
  dialect: "postgresql",
  schema: "./src/lib/db/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    host: process.env.DATABASE_HOST as string,
    user: process.env.DATABASE_USER as string,
    password: process.env.DATABASE_PASSWORD as string,
    database: process.env.DATABASE_NAME as string,
  },
  migrations: {
    prefix: "supabase",
  },
});
