import { treaty } from "@elysiajs/eden";
import { App } from "./route";

export const client = treaty<App>("localhost:3000");
