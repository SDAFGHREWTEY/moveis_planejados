import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./drizzle/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL || "postgresql://neondb_owner:npg_rseUCT7bJp5i@ep-plain-wave-axmrue4r-pooler.c-4.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
  },
});
