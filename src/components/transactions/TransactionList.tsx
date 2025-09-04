import React from "react";
import type { Transaction } from "../../types";

interface TransactionListProps {
  transactions: Transaction[];
  isLoading: boolean;
}

const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <div className="animate-pulse">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-16 bg-[#355676] opacity-50 rounded mb-2"></div>
        ))}
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="text-center py-8 text-[#E6D5B8]">
        No transactions found
      </div>
    );
  }

  const getTransactionColor = (type: string) => {
    switch (type) {
      case "top-up":
      case "cash-in":
        return "text-green-400";
      case "withdraw":
      case "cash-out":
        return "text-red-400";
      default:
        return "text-[#E6D5B8]";
    }
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "top-up":
        return "⬆️";
      case "withdraw":
        return "⬇️";
      case "send":
        return "➡️";
      case "cash-in":
        return "💵";
      case "cash-out":
        return "💰";
      default:
        return "🔁";
    }
  };

  return (
    <div className="overflow-x-auto shadow ring-1 ring-[#E6D5B8]/30 md:rounded-lg">
      {/* Table for medium+ screens */}
      <table className="hidden sm:table min-w-full divide-y divide-[#E6D5B8]/20">
        <thead className="bg-[#355676]">
          <tr>
            {["Type", "Amount", "Date", "Status"].map((header) => (
              <th
                key={header}
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-[#E6D5B8] uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-[#355676] divide-y divide-[#E6D5B8]/20">
          {transactions.map((transaction) => (
            <tr key={transaction._id} className="hover:bg-[#355676]/70">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center text-[#E6D5B8]">
                  <span className="text-lg mr-2">
                    {getTransactionIcon(transaction.type)}
                  </span>
                  <span className="text-sm font-medium capitalize">
                    {transaction.type.replace("-", " ")}
                  </span>
                </div>
              </td>
              <td
                className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${getTransactionColor(
                  transaction.type
                )}`}
              >
                ৳{transaction.amount.toFixed(2)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-[#E6D5B8]/80">
                {new Date(transaction.createdAt).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    transaction.status === "completed"
                      ? "bg-green-700 text-green-200"
                      : transaction.status === "pending"
                      ? "bg-yellow-700 text-yellow-200"
                      : transaction.status === "failed"
                      ? "bg-red-700 text-red-200"
                      : "bg-gray-700 text-gray-200"
                  }`}
                >
                  {transaction.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Card view for small screens */}
      <div className="sm:hidden space-y-4 p-2">
        {transactions.map((transaction) => (
          <div
            key={transaction._id}
            className="bg-[#355676] p-4 rounded-lg shadow border border-[#E6D5B8]/20"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center text-[#E6D5B8]">
                <span className="text-xl mr-2">
                  {getTransactionIcon(transaction.type)}
                </span>
                <span className="capitalize font-semibold">
                  {transaction.type.replace("-", " ")}
                </span>
              </div>
              <span
                className={`text-sm font-bold ${getTransactionColor(
                  transaction.type
                )}`}
              >
                ৳{transaction.amount.toFixed(2)}
              </span>
            </div>

            <div className="mt-2 flex justify-between text-sm text-[#E6D5B8]/80">
              <span>{new Date(transaction.createdAt).toLocaleDateString()}</span>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  transaction.status === "completed"
                    ? "bg-green-700 text-green-200"
                    : transaction.status === "pending"
                    ? "bg-yellow-700 text-yellow-200"
                    : transaction.status === "failed"
                    ? "bg-red-700 text-red-200"
                    : "bg-gray-700 text-gray-200"
                }`}
              >
                {transaction.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionList;
