export enum Units {
  st="Styck",
  kg="Kilogram",
  g="Gram",
  l="Liter",
  ml="Milliliter",
}

export interface Product {
  name: string,
  location: string,
  amount: number,
  unit: string,
  tag: string[],
  category: string 
}