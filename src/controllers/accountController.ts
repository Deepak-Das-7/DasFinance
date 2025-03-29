import * as SQLite from "expo-sqlite";

const accountDB = SQLite.openDatabaseSync("account");

export const createAccount = async (
  account_name: string,
  balance: number = 0
) => {
  const result = await accountDB.runAsync(
    "INSERT INTO accounts (account_name, balance) VALUES (?, ?)",
    [account_name, balance]
  );
  return result.lastInsertRowId;
};

export const getAccounts = async () => {
  return await accountDB.getAllAsync(
    "SELECT * FROM accounts ORDER BY created_at DESC"
  );
};

export const getAccountById = async (id: number) => {
  return await accountDB.getFirstAsync("SELECT * FROM accounts WHERE id = ?", [
    id,
  ]);
};

export const updateAccountBalance = async (id: number, balance: number) => {
  return await accountDB.runAsync(
    "UPDATE accounts SET balance = ? WHERE id = ?",
    [balance, id]
  );
};

export const deleteAccount = async (id: number) => {
  return await accountDB.runAsync("DELETE FROM accounts WHERE id = ?", [id]);
};
