import type { Transaction } from "../types";

export interface TransactionListProps {
  transactions: Transaction[];
  isLoading: boolean;
}