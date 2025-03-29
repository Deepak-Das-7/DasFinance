import * as SQLite from "expo-sqlite";

const budgetDB = SQLite.openDatabaseSync("budget");

export const createBudget = async (
  amount: number,
  account_id: number,
  budget_name: string
) => {
  const result = await budgetDB.runAsync(
    "INSERT INTO budgets (amount, account_id, budget_name) VALUES (?, ?, ?)",
    [amount, account_id, budget_name]
  );
  return result.lastInsertRowId;
};

export const getBudgets = async () => {
  return await budgetDB.getAllAsync(
    "SELECT * FROM budgets ORDER BY created_at DESC"
  );
};

export const getBudgetById = async (id: number) => {
  return await budgetDB.getFirstAsync("SELECT * FROM budgets WHERE id = ?", [
    id,
  ]);
};

export const updateBudget = async (
  id: number,
  amount: string,
  budget_name: string
) => {
  return await budgetDB.runAsync(
    "UPDATE budgets SET amount = ?, budget_name = ? WHERE id = ?",
    [amount, budget_name, id]
  );
};

export const deleteBudget = async (id: number) => {
  return await budgetDB.runAsync("DELETE FROM budgets WHERE id = ?", [id]);
};
