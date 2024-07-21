import { QuantityUnit } from "@/lib/types/QuantityUnit";

export const UNITS = [
  { name: "Kilogramme", value: QuantityUnit.Kilogram },
  { name: "Litre", value: QuantityUnit.Liter },
  { name: "Boîte", value: QuantityUnit.Box },
  { name: "Pièce", value: QuantityUnit.Piece },
] as const;

export const QUANTITIES = [
  { name: "1", value: 1 },
  { name: "2", value: 2 },
  { name: "3", value: 3 },
  { name: "4", value: 4 },
] as const;
