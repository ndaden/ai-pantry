import { Category } from "@/lib/types/Category";
import { Product } from "@/lib/types/Product";
import { ProductView } from "@/lib/types/ProductView";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";
import { PrismaClient } from "@prisma/client";
import Elysia, { t } from "elysia";
import { groupBy } from "lodash";

type App = Elysia<
  "",
  false,
  {
    decorator: { db: PrismaClient };
    store: {};
    derive: { user: KindeUser<any> | null };
    resolve: {};
  }
>;

export const pantryModule = (app: App) =>
  app
    .group("/product", (app) =>
      app
        .get("/list", async ({ db, user, error }) => {
          if (!user) {
            return error(401, "Unauthorized");
          }

          const result = await db.product.findMany({
            select: {
              id: true,
              userId: true,
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

          const resultGroupedByCategory = groupBy(
            result,
            ({ category: { label } }: ProductView) => label
          );

          return resultGroupedByCategory;
        })
        .post(
          "/batch-add",
          async ({ body, db, user, error }) => {
            if (!user) {
              return error(401, "Unauthorized");
            }

            return db.product.createMany({ data: body as Product[] });
          },
          {
            body: t.Array(
              t.Object({
                userId: t.String(),
                categoryId: t.String(),
                label: t.String(),
                quantity: t.Number(),
                quantityUnit: t.String(),
              })
            ),
          }
        )
        .post(
          "/add",
          async ({ body, db, user, error }) => {
            if (!user) {
              return error(401, "Unauthorized");
            }

            return db.product.create({
              data: body as Product,
            });
          },
          {
            body: t.Object({
              userId: t.String(),
              categoryId: t.String(),
              label: t.String(),
              quantity: t.Number(),
              quantityUnit: t.String(),
            }),
          }
        )
        .post(
          "/ai-add",
          async ({ body, db, user, error }) => {
            if (!user) {
              return error(401, "Unauthorized");
            }

            if (!body) {
              return [];
            }

            const productsToCreate: Product[] = await Promise.all(
              body.map(async (product) => {
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
          },
          {
            body: t.Array(
              t.Object({
                userId: t.String(),
                category: t.String(),
                label: t.String(),
                quantity: t.Number(),
                quantityUnit: t.String(),
              })
            ),
          }
        )
        .put(
          "/:id",
          async ({ db, body, params, user, error }) => {
            if (!user) {
              return error(401, "Unauthorized");
            }

            return db.product.update({
              where: { id: params.id },
              data: body as Product,
            });
          },
          {
            body: t.Object({
              userId: t.Optional(t.String()),
              categoryId: t.String(),
              label: t.String(),
              quantity: t.Number(),
              quantityUnit: t.String(),
            }),
          }
        )
        .delete("/:id", async ({ db, params, user, error }) => {
          if (!user) {
            return error(401, "Unauthorized");
          }

          return db.product.delete({ where: { id: params.id } });
        })
    )
    .group("/category", (app) =>
      app
        .get("/list", async ({ db, user, error }) => {
          if (!user) {
            return error(401, "Unauthorized");
          }

          return db.category.findMany({
            select: {
              label: true,
              id: true,
              createdAt: false,
              updatedAt: false,
            },
          });
        })
        .get("/find/:categoryName", async ({ db, params, user, error }) => {
          if (!user) {
            return error(401, "Unauthorized");
          }

          return db.category.findFirst({
            where: {
              label: { equals: params.categoryName },
            },
          });
        })
        .post(
          "/add",
          async ({ body, db, user, error }) => {
            if (!user) {
              return error(401, "Unauthorized");
            }

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
        .put("/:id", async ({ db, body, params, user, error }) => {
          if (!user) {
            return error(401, "Unauthorized");
          }

          return db.category.update({
            where: { id: params.id },
            data: body as Category,
          });
        })
        .delete("/:id", async ({ db, params, user, error }) => {
          if (!user) {
            return error(401, "Unauthorized");
          }

          return db.category.delete({ where: { id: params.id } });
        })
    );
