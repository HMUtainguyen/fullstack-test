import { Order } from 'utils/sortTable';

export interface ParamsType {
  pageIndex?: number;
  pageSize?: number;
  sortBy?: string;
  sortDirection?: Order;
  name?: string | null;
  category?: string | null;
  // status?: StatusType | null;
  // productType?: OptionsProps | null;
}

export interface ParamsInventoryProductsType {
  pageIndex?: number;
  pageSize?: number;
  sortBy?: string;
  sortDirection?: Order;
}

export interface StatusType {
  label: string;
  value: string;
  chipType: string;
}

export interface ProductType {
  id: number;
  productTypeName: string;
  createdDate: number;
  status: number;
}

export interface OptionsProps {
  label: string;
  value: number;
}

export interface FormInputTypes {
  category?: string | null;
  name?: string | null;
}

export interface RowDataProps {
  id: string | number;
  name: string;
  description: string;
  category: string;
  price: number;
}

