export interface IMenu{
  id: number;
  name: string;
  slug: string;
  type: 'LIST' | 'CONFIG'
  isActive: boolean;
  createdAt: number;
  createdBy: number;
  updatedAt: number;
  updatedBy: number;
}
export interface IMenuCreate{
  name: string;
  slug: string;
  type: 'LIST' | 'CONFIG'
}

export interface IMenuEdit extends IMenuCreate{
  id: number;
  order?: number;
}