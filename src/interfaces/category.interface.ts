export interface ICreateCategory {
  name: string;
  slug: string;
}

export interface ICreateEdit extends ICreateCategory{
  id: number;
}