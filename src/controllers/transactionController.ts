import * as SQLite from "expo-sqlite";
import { ITransaction } from "../utils/types";

const db = SQLite.openDatabaseSync("das");

export const createTransaction = async (
  amount: number,
  type: "credit" | "debit",
  budget_id: number,
  account_id: number,
  note: string = ""
) => {
  const result = await db.runAsync(
    "INSERT INTO transactions (amount, type, account_id, budget_id, note) VALUES (?, ?, ?, ?, ?)",
    [amount, type, account_id, budget_id, note]
  );
  return result.lastInsertRowId;
};

export const getTransactions = async (): Promise<ITransaction[]> => {
  const results = await db.getAllAsync(
    "SELECT * FROM transactions ORDER BY created_at DESC"
  );
  return results as ITransaction[];
};

export const getTransactionById = async (id: number) => {
  return await db.getFirstAsync("SELECT * FROM transactions WHERE id = ?", [
    id,
  ]);
};

export const updateTransaction = async (
  id: number,
  amount: number,
  type: "credit" | "debit",
  budget_id: number,
  account_id: number,
  note: string
) => {
  return await db.runAsync(
    "UPDATE transactions SET amount = ?, type = ?, account_id = ?, budget_id = ?, note = ? WHERE id = ?",
    [amount, type, account_id, budget_id, note, id]
  );
};

export const deleteTransaction = async (id: number) => {
  return await db.runAsync("DELETE FROM transactions WHERE id = ?", [id]);
};
