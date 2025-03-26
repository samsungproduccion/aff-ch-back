export interface ICreateTransaction{
  totalAmount  :  number;
  orderAmount  :  number;
  affiliateCode:  string;
  operationDate:  string;
}

export interface ICreateTransactions{
  transactions: ICreateTransaction[]
}