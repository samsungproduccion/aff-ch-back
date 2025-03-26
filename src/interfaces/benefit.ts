export interface IBenefit {
  id: number;
  name: string;
  slug: string;
  percentage: number;
  order: string;
  createdAt: number;
}
export interface IBenefitCreate {
  name: string;
  slug: string;
  percentage: number;
  order: number;
}
export interface IBenefitEdit {
  id: number;
  name: string;
  slug: string;
  percentage: number;
  order: number;
}