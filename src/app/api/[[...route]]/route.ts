import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { cors } from "@elysiajs/cors";
import { aiModule } from "./modules/ai";
import { pantryModule } from "./modules/pantry";
import { PrismaClient } from "@prisma/client";

// create a new Prisma Client instance
const prisma = new PrismaClient({
  log: ["info", "warn", "error"],
});

// create a new Elysia instance and pass DB as context
const app = new Elysia({ prefix: "/api" })
  .decorate("db", prisma)
  .onAfterHandle(({ request, set }) => {
    // Only process CORS requests
    if (request.method !== "OPTIONS") return;

    const allowHeader = set.headers["Access-Control-Allow-Headers"];
    if (allowHeader === "*") {
      set.headers["Access-Control-Allow-Headers"] =
        request.headers.get("Access-Control-Request-Headers") ?? "";
    }
  })
  .use(cors())
  .use(swagger({ provider: "swagger-ui" }))
  .use(pantryModule)
  .use(aiModule);

export type App = typeof app;

export const GET = app.handle;
export const POST = app.handle;
export const PUT = app.handle;
export const DELETE = app.handle;
