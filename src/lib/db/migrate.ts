import { migrate } from "drizzle-orm/postgres-js/migrator";
import dotenv from "dotenv";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

dotenv.config({ path: ".env.local" });

const migrationClient = postgres(
  process.env.DATABASE_CONNECTION_STRING as string,
  {
    max: 1,
  }
);

const main = async () => {
  await migrate(drizzle(migrationClient), {
    migrationsFolder: "drizzle",
  });
  await migrationClient.end();
};

main();
