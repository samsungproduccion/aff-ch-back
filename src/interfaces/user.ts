export interface IUserCreate {
  email: string;
  dni: string;
  name: string;
  lastName: string;
  phone: string;
  facebook: string;
  instagram: string;
  tiktok: string;
  website: string;
  address1: string;
  address2: string;
  country: string;
  bankNumber: string;
  dniRepresent: string;
  rucNumber: string;
}

export interface ICreateUser {
  address1: string;
  address2?: string;
  dni: string;
  email: string;
  facebook: string;
  instagram: string;
  lastName: string;
  name: string;
  password: string;
  phone: string;
  tiktok: string;
  website?: string;
  image?: string;
  country?: string;
  productCategory?: string;
  moduleId: number;
  checkInfo?: boolean;
  checkTerms?: boolean;
  checkPrivacy?: boolean;
}
export interface ICreateUserApproved {
  user:{
    address1: string;
    address2?: string;
    dni: string;
    email: string;
    lastName: string;
    name: string;
    password: string;
    phone: string;
    code: string;
    image?: string;
    moduleId: number;
  }
  info: {
    rucNumber: string;
    bankNumber: string;
    dniDoc?: string;
    rucDoc?: string;
    bankDoc?: string;
    validityCert?: string;
    contract?: string;
  };
  representative?: {
    name: string;
    lastName: string;
    email: string;
    phone: string;
    dni: string;
    rucNumber: string;
    bankNumber: string;
    dniDoc: string;
    rucDoc: string;
    bankDoc: string;
    contract: string;
    validityCert?: string;
  };
}

export interface ICreateSuperUser {
  name: string;
  lastName: string;
  email: string;
  phone: string;
  dni: string;
  rolId: number;
  role: 'USER' | 'ADMIN' | 'ROOT';
  moduleId?: number;
}

export interface ICreateAdmin extends ICreateUser {
  role: 'USER' | 'ADMIN' | 'ROOT';
}

export interface IContextUser{
  id: number;
  name: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  dni: string;
  country: string;
  address1: string;
  address2: string;
  image: string;
  role: string;
  status: string;
  approval: number;
  isActive: boolean;
  moduleId: number;
  createdAt: Date;
}

export interface IUser {
  id: number;
  name: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  dni: string;
  country: string;
  address1: string;
  address2: string;
  image: string;
  role: string;
  status: string;
  approval: number;
  isActive: boolean;
  moduleId: number;
  createdAt: Date;
  userInfo: IUserInfo;
  representative?: IRepresentative;
  roles: Role;
  module: IModule;
}

export interface IRepresentative {
  id: number;
  name: string;
  lastName: string;
  email: string;
  phone: string;
  dni: string;
  rucNumber: string;
  bankNumber: string;
  dniDoc?: string;
  rucDoc?: string;
  bankDoc?: string;
  validityCert?: string;
  contract?: string;
  createdAt: Date;
}

export interface IUserInfo {
  id: number;
  userId: number;
  rucNumber?: string;
  rucDoc?: string;
  bankDoc?: string;
  bankNumber?: string;
  validityCert?: string;
  dniRepresent?: string;
  dniDoc?: string;
}
export interface Role {
  id: number;
  name: string;
  slug: string;
  menus: string;
}
export interface IModule{
  id: number,
  name: string,
  isActive: boolean,
  createdAt: Date,
  createdBy?: number,
  updatedAt?: Date,
  updatedBy?: number
}

export interface IContextApp {
  user: IContextUser;
}

export interface IEditUser {
  user: {
    name: string;
    lastName: string;
    email: string;
    image: string;
    phone: string;
    dni: string;
    country?: string;
    address1: string;
    address2?: string;
  };
  info: {
    rucNumber: string;
    bankNumber: string;
    dniDoc: string;
    rucDoc?: string;
    bankDoc?: string;
    validityCert?: string;
    contract?: string;
  };
  representative?: {
    name: string;
    lastName: string;
    email: string;
    phone: string;
    dni: string;
    rucNumber: string;
    bankNumber: string;
    dniDoc: string;
    rucDoc: string;
    bankDoc: string;
    contract: string;
    validityCert?: string;
  };
}


export interface IRegisterUser {
  address1: string;
  address2?: string;
  dni: string;
  email: string;
  facebook: string;
  instagram: string;
  lastName: string;
  name: string;
  password: string;
  phone: string;
  tiktok: string;
  website?: string;
  image?: string;
  country?: string;
  productCategory?: string;
  moduleId: number;
  checkInfo?: boolean;
  checkTerms?: boolean;
  checkPrivacy?: boolean;
  page: string,
  parameters: string,
}