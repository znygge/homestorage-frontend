export enum Units {
  st="Styck",
  kg="Kilogram",
  g="Gram",
  l="Liter",
  ml="Milliliter",
}

export interface Product extends NewProduct{
  _id: string,
}
export interface NewProduct {
  name: string,
  location: string,
  amount: number,
  unit: string,
  tags: string[],
  category?: string 
}