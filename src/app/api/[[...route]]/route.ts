import { Elysia, t } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { aiModule } from "./modules/ai";
import { pantryModule } from "./modules/pantry";
import { PrismaClient } from "@prisma/client";
import { treaty } from "@elysiajs/eden";

// create a new Prisma Client instance
const prisma = new PrismaClient({
  log: ["info", "warn", "error"],
});

// create a new Elysia instance and pass DB as context
const app = new Elysia({ prefix: "/api" })
  .decorate("db", prisma)
  .use(swagger({ provider: "swagger-ui" }))
  .get("/", ({ db }) => {
    db.product.findMany();
    return "Hello from Elysia";
  })
  .post(
    "/sign",
    ({ body }) => {
      return body;
    },
    {
      body: t.Object({
        name: t.String(),
        password: t.String(),
      }),
    }
  )
  .use(pantryModule)
  .use(aiModule);

export type App = typeof app;

export const GET = app.handle;
export const POST = app.handle;
export const PUT = app.handle;
export const DELETE = app.handle;

export const client = treaty<App>("localhost:3000");
