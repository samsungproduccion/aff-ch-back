export interface ICreateProduct{
  sku: string;
  name: string;
  description?: string;
  image: string;
  url_page: string;
  url_shop?: string;
  price: number;
  priceOld?: number;
  moduleId: number;
  benefits?: ICreateBenefit[]
  categories?: number[]
}

export interface ICreateProductMany{
  products: ICreateProduct[];
}

export interface ICreateBenefit{
  name: string;
  quantity: number;
  type: "PERCENTAGE" | "AMOUNT"
}

export interface IEditProduct{
  id: number;
  sku: string;
  name: string;
  isActive?: boolean;
  description?: string;
  image: string;
  url_page: string;
  url_shop?: string;
  price: number;
  priceOld?: number;
  benefits: [ICreateBenefit]
  categories?: number[]
}

export interface IProduct {
  id: number;
  sku: string;
  name: string;
  description: string;
  image: string;
  url_page: string;
  url_shop: string;
  price: number;
  isActive: boolean;
  createdAt: number;
  createdBy?: number;
  updatedAt: number;
  updatedBy?: number;
}