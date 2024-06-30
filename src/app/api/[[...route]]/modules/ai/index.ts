import { GoogleGenerativeAI } from "@google/generative-ai";
import Elysia, { t } from "elysia";

const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAi.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig: { responseMimeType: "application/json" },
  systemInstruction: process.env.GEMINI_SYSTEM_INSTRUCTION,
});

export const aiModule = (app: Elysia) =>
  app.post(
    "/image",
    async ({ body, set }) => {
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
