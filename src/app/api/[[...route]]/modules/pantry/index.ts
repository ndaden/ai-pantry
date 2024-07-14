import Elysia, { t } from "elysia";

export const pantryModule = (app: Elysia) =>
  app.post(
    "/add",
    async ({ body, set }) => {
      return "test";
    },
    {}
  );
