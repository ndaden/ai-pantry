import { AiProduct } from "@/app/pantry/list/preview/page";
import { Category } from "@/lib/types/Category";
import { Product } from "@/lib/types/Product";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { PrismaClient } from "@prisma/client";
import Elysia, { t } from "elysia";

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
        .get("/list", async ({ db }) => {
          const { getUser } = getKindeServerSession();
          const user = await getUser();

          return db.product.findMany({
            select: {
              id: true,
              label: true,
              quantity: true,
              quantityUnit: true,
              categoryId: true,
              category: { select: { label: true } },
            },
            where: {
              userId: {
                equals: user?.id,
              },
            },
          });
        })
        .post("/add", async ({ body, db }) => {
          if (Array.isArray(body)) {
            return db.product.createMany({ data: body as Product[] });
          }

          return db.product.create({
            data: body as Product,
          });
        })
        .post("/ai-add", async ({ body, db }) => {
          const products = body as AiProduct[];

          const productsToCreate: Product[] = await Promise.all(
            products.map(async (product) => {
              const category = await db.category.findFirst({
                where: {
                  label: { equals: product.category },
                },
              });

              return {
                userId: product.userId,
                categoryId: category?.id,
                label: product.label,
                quantity: product.quantity,
                quantityUnit: product.quantityUnit,
              } as Product;
            })
          );

          return db.product.createMany({ data: productsToCreate });
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
        .get("/find/:categoryName", ({ db, params }) => {
          return db.category.findFirst({
            where: {
              label: { equals: params.categoryName },
            },
          });
        })
        .post(
          "/add",
          async ({ body, db }) => {
            return db.category.create({
              data: body as Category,
            });
          },
          {
            body: t.Object({
              label: t.String(),
            }),
          }
        )
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
