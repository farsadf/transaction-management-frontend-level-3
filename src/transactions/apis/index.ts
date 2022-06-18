import api from "../../api";

import type { Transaction, TransactionDTO } from "../types";

const getTransactions = async () => {
  const { data: transactions } = await api.get<Transaction[]>(
    "/api/accounting/transactions"
  );

  return transactions;
};

const sendTransaction = async (transactionDTO: TransactionDTO) => {
  const { data: transaction } = await api.post<Transaction>(
    "/api/accounting/transactions",
    transactionDTO
  );

  return transaction;
};

export { getTransactions, sendTransaction };
