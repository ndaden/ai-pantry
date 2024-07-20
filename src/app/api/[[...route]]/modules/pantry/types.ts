export enum QuantityUnit {
  Piece = "Piece",
  Box = "Box",
  Kilogram = "Kilogram",
  Liter = "Liter",
}

export interface Product {
  id?: string;
  categoryId: string;
  label: string;
  quantity: number;
  quantityUnit: QuantityUnit;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Category {
  id?: string;
  label: string;
  createdAt?: Date;
  updatedAt?: Date;
}
