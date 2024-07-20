import { PrismaClient } from "@prisma/client";
import Elysia, { t } from "elysia";
import { Category, Product } from "./types";

type App = Elysia<
  "",
  false,
  {
    decorator: { db: PrismaClient };
    store: {};
    derive: {};
    resolve: {};
  }
>;

export const pantryModule = (app: App) =>
  app
    .group("/product", (app) =>
      app
        .get("/list", ({ db }) => {
          return db.product.findMany({
            select: {
              id: true,
              label: true,
              quantity: true,
              quantityUnit: true,
              categoryId: false,
              category: { select: { label: true } },
            },
          });
        })
        .post("/add", async ({ body, db }) => {
          return db.product.create({
            data: body as Product,
          });
        })
        .put("/:id", ({ db, body, params }) => {
          return db.product.update({
            where: { id: params.id },
            data: body as Product,
          });
        })
        .delete("/:id", ({ db, params }) => {
          return db.product.delete({ where: { id: params.id } });
        })
    )
    .group("/category", (app) =>
      app
        .get("/list", ({ db }) => {
          return db.category.findMany();
        })
        .post("/add", async ({ body, db }) => {
          return db.category.create({
            data: body as Category,
          });
        })
        .put("/:id", ({ db, body, params }) => {
          return db.category.update({
            where: { id: params.id },
            data: body as Category,
          });
        })
        .delete("/:id", ({ db, params }) => {
          return db.category.delete({ where: { id: params.id } });
        })
    );
