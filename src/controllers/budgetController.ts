import * as SQLite from "expo-sqlite";
import { IBudget } from "../utils/types";
const db = SQLite.openDatabaseSync("das");

export const createBudget = async (
  budget_name: string,
  account_id: number,
  amount: number
) => {
  // Start a transaction for atomicity
  await db.execAsync("BEGIN TRANSACTION");

  try {
    // Insert the budget into the budgets table
    const result = await db.runAsync(
      "INSERT INTO budgets (amount, account_id, budget_name) VALUES (?, ?, ?)",
      [amount, account_id, budget_name]
    );

    // Reduce the balance of the corresponding account
    await db.runAsync(
      "UPDATE accounts SET balance = balance - ? WHERE id = ?",
      [amount, account_id]
    );

    // Commit the transaction
    await db.execAsync("COMMIT");
    return result.lastInsertRowId;
  } catch (error) {
    // Rollback in case of an error
    await db.execAsync("ROLLBACK");
    console.error("Error creating budget:", error);
    throw error;
  }
};

export const getBudgets = async (): Promise<IBudget[]> => {
  const results = await db.getAllAsync(
    "SELECT * FROM budgets ORDER BY created_at DESC"
  );
  return results as IBudget[];
};

export const getBudgetById = async (id: number) => {
  return await db.getFirstAsync("SELECT * FROM budgets WHERE id = ?", [id]);
};

export const updateBudget = async (
  id: number,
  amount: string,
  budget_name: string
) => {
  return await db.runAsync(
    "UPDATE budgets SET amount = ?, budget_name = ? WHERE id = ?",
    [amount, budget_name, id]
  );
};

export const deleteBudget = async (id: number) => {
  return await db.runAsync("DELETE FROM budgets WHERE id = ?", [id]);
};
