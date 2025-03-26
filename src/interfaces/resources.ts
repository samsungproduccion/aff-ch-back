export interface IResource {
  id: number;
  title: string;
  url: string;
  type: string;
  tags: string;
  isActive: boolean;
  createdAt: number;
}
export interface IResourceCreate {
  title: string;
  url: string;
  type: string;
  tags: string;
}
export interface IResourceEdit {
  id: number;
  title: string;
  url: string;
  type: string;
  tags: string;
  isActive: boolean;
}