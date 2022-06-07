export type Transaction = {
  account_id: string;
  amount: number;
  transaction_id: string;
  created_at: string;
};

export type TransactionDTO = Omit<Transaction, "transaction_id" | "created_at">;

export type Account = {
  account_id: string;
  balance: number;
};
