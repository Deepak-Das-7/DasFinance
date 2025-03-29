import { setupAccountDB } from "./dbs/accountDB";
import { setupTransactionDB } from "./dbs/transactionDB";
import { setupBudgetDB } from "./dbs/budgetDB";

export const setupAllDatabases = async () => {
  await setupAccountDB();
  await setupTransactionDB();
  await setupBudgetDB();
  console.log("All databases initialized successfully!");
};
