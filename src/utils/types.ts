export interface IAccount {
  id: number;
  account_name: string;
  balance: number;
  created_at: Date;
  updated_at: Date;
}

export interface ITransaction {
  id: number;
  account_id: number;
  amount: number;
  type: "credit" | "debit";
  budgetId: number;
  note?: string;
  created_at: Date;
  updated_at: Date;
}

export interface IBudget {
  id: number;
  budget_name: string;
  amount: number;
  account_id: number;
  created_at: Date;
  updated_at: Date;
}
