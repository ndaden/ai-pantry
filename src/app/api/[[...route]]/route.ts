import bearer from "@elysiajs/bearer";
import { Elysia, t } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { aiModule } from "./modules/ai";

const app = new Elysia({ prefix: "/api" })
  .use(swagger({ provider: "swagger-ui" }))
  .get("/", () => "Hello from Elysia")
  /* .use(bearer())
  .onBeforeHandle(async ({ bearer, set }) => {
    if (!bearer) return (set.status = "Unauthorized");
    const isAuthorized = bearer === "12345678";
    if (!isAuthorized) {
      return (set.status = "Unauthorized");
    }
  }) */
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
  .use(aiModule);

export type App = typeof app;

export const GET = app.handle;
export const POST = app.handle;
export const PUT = app.handle;
export const DELETE = app.handle;
