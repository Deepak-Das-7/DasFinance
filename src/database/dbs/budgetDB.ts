import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("das");

export const setupBudgetDB = async () => {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS budgets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      budget_name TEXT NOT NULL,
      amount REAL NOT NULL,
      account_id INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TRIGGER IF NOT EXISTS update_budgets_updated_at
    AFTER UPDATE ON budgets
    FOR EACH ROW
    BEGIN
      UPDATE budgets SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
    END;
  `);
};
