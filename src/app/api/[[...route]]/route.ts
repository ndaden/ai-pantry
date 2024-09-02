import { Elysia, t } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { cors } from "@elysiajs/cors";
import { aiModule } from "./modules/ai";
import { pantryModule } from "./modules/pantry";
import { PrismaClient } from "@prisma/client";
import { handleAuth } from "@kinde-oss/kinde-auth-nextjs/server";

// create a new Prisma Client instance
const prisma = new PrismaClient({
  log: ["info", "warn", "error"],
});

// create a new Elysia instance and pass DB as context
const app = new Elysia({ prefix: "/api" })
  .decorate("db", prisma)
  .use(cors({ origin: ["https://aipantry.dnabil.ovh/"] }))
  .use(swagger({ provider: "swagger-ui" }))
  .use(pantryModule)
  .use(aiModule);

export type App = typeof app;

export const GET = app.handle;
export const POST = app.handle;
export const PUT = app.handle;
export const DELETE = app.handle;
