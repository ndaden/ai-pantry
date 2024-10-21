import {
  CarrotIcon,
  CherryIcon,
  DatabaseIcon,
  Grid2X2Icon,
} from "lucide-react";

export const SESSION_STORAGE_AI_DATA_KEY = "ai-data";

export const CATEGORY_ICON = [
  {
    name: "Consommables",
    icon: <Grid2X2Icon className="w-5 h-5" />,
  },
  {
    name: "Conserves",
    icon: <DatabaseIcon size={20} />,
  },
  {
    name: "Fruits",
    icon: <CherryIcon size={20} />,
  },
  {
    name: "Légumes",
    icon: <CarrotIcon size={20} />,
  },
] as const;
