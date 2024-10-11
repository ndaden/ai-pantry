import { GoogleGenerativeAI } from "@google/generative-ai";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";
import { PrismaClient } from "@prisma/client";
import Elysia, { t } from "elysia";

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

const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAi.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig: { responseMimeType: "application/json" },
  systemInstruction: process.env.GEMINI_SYSTEM_INSTRUCTION,
});

export const aiModule = (app: App) =>
  app.post(
    "/image",
    async ({ body, set, user, error }) => {
      if (!user) {
        return error(401, "Unauthorized");
      }

      if (!body.image) {
        set.status = 400;
        return { success: false, message: "Please upload an image" };
      }

      const prompt = process.env.GEMINI_PROMPT_READ_IMAGE || "";

      const imageBase64 = Buffer.from(await body.image.arrayBuffer()).toString(
        "base64"
      );
      const promptImage = {
        inlineData: {
          data: imageBase64,
          mimeType: "image/jpg",
        },
      };

      const result = await model.generateContent([prompt, promptImage]);
      set.status = 200;

      return result.response.text();
    },
    { body: t.Object({ image: t.File() }), detail: { tags: ["image"] } }
  );
