import { Category } from "./Category";
import { QuantityUnit } from "./QuantityUnit";

export interface Product {
  id?: string;
  userId: string;
  category: Category;
  categoryId?: string;
  label: string;
  quantity: number;
  quantityUnit: QuantityUnit;
  createdAt?: Date;
  updatedAt?: Date;
}
