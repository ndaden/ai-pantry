import { CategoryView } from "./CategoryView";

export interface ProductView {
  id: string;
  label: string;
  category: CategoryView;
  quantityUnit: string;
  quantity: number;
}
