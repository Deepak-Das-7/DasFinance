import * as SQLite from "expo-sqlite";
import { IAccount } from "../utils/types";
const db = SQLite.openDatabaseSync("das");

export const createAccount = async (
  account_name: string,
  balance: number = 0
) => {
  if (!account_name.trim()) {
    throw new Error("Account name cannot be empty.");
  }

  if (balance < 0) {
    throw new Error("Balance cannot be negative.");
  }

  const result = await db.runAsync(
    "INSERT INTO accounts (account_name, balance) VALUES (?, ?)",
    [account_name, balance]
  );

  return result;
};

export const getAccounts = async (): Promise<IAccount[]> => {
  const results = await db.getAllAsync(
    "SELECT * FROM accounts ORDER BY created_at DESC"
  );
  return results as IAccount[];
};

export const getAccountById = async (id: number) => {
  return await db.getFirstAsync("SELECT * FROM accounts WHERE id = ?", [id]);
};

export const updateAccountBalance = async (id: number, balance: number) => {
  return await db.runAsync("UPDATE accounts SET balance = ? WHERE id = ?", [
    balance,
    id,
  ]);
};

export const deleteAccount = async (id: number) => {
  return await db.runAsync("DELETE FROM accounts WHERE id = ?", [id]);
};
