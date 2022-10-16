export enum Units {
  st="st",
  kg="kg",
  g="g",
  l="l",
  ml="ml",
}

export enum UnitsString {
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