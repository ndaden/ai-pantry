import { treaty } from "@elysiajs/eden";
import { App } from "./route";

export const client = treaty<App>(
  process.env.KINDE_SITE_URL || "https://ai-pantry-rho.vercel.app/"
);
