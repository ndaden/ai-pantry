import { CategoryView } from "./CategoryView";
import { QuantityUnit } from "./QuantityUnit";

export interface ProductView {
  id: string;
  label: string;
  categoryId: string;
  category: CategoryView;
  quantityUnit: QuantityUnit;
  quantity: number;
}
