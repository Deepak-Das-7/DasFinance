import * as SQLite from "expo-sqlite";
import { ITransaction } from "../utils/types";

const transactionDB = SQLite.openDatabaseSync("transaction");

export const createTransaction = async (
  amount: number,
  type: "credit" | "debit",
  budget_id: number,
  account_id: number,
  note: string = ""
) => {
  const result = await transactionDB.runAsync(
    "INSERT INTO transactions (amount, type, account_id, budget_id, note) VALUES (?, ?, ?, ?, ?)",
    [amount, type, account_id, budget_id, note]
  );
  return result.lastInsertRowId;
};

export const getTransactions = async (): Promise<ITransaction[]> => {
  const results = await transactionDB.getAllAsync(
    "SELECT * FROM transactions ORDER BY created_at DESC"
  );
  return results as ITransaction[];
};

export const getTransactionById = async (id: number) => {
  return await transactionDB.getFirstAsync(
    "SELECT * FROM transactions WHERE id = ?",
    [id]
  );
};

export const updateTransaction = async (
  id: number,
  amount: number,
  type: "credit" | "debit",
  budget_id: number,
  account_id: number,
  note: string
) => {
  return await transactionDB.runAsync(
    "UPDATE transactions SET amount = ?, type = ?, account_id = ?, budget_id = ?, note = ? WHERE id = ?",
    [amount, type, account_id, budget_id, note, id]
  );
};

export const deleteTransaction = async (id: number) => {
  return await transactionDB.runAsync("DELETE FROM transactions WHERE id = ?", [
    id,
  ]);
};
