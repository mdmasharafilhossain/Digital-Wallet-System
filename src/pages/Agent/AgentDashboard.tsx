import React, { useState } from "react";
import { motion } from "framer-motion";

import WalletCard from "../../components/wallet/WalletCard";
import TransactionList from "../../components/transactions/TransactionList";

import { useGetWalletQuery } from "../../redux/features/auth/wallet.api";
import { useGetMyTransactionsQuery } from "../../redux/features/auth/transaction.Api";
import { useGetProfileQuery } from "../../redux/features/auth/auth.api";
import CashInModal from "../../components/wallet/CashInModal";
import CashOutModal from "../../components/wallet/CashOutModal";

const AgentDashboard: React.FC = () => {
  const { data: user } = useGetProfileQuery();
  const { data: wallet, isLoading: walletLoading } = useGetWalletQuery();

  const [page, setPage] = useState(1);
  const [typeFilter, setTypeFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const limit = 5;

  const { data, isLoading } = useGetMyTransactionsQuery({
    page,
    limit,
    type: typeFilter || undefined,
    startDate: startDate || undefined,
    endDate: endDate || undefined,
  });

  const transactions = data?.transactions || [];
  const totalPages = data?.totalPages || 0;

  const [showCashIn, setShowCashIn] = useState(false);
  const [showCashOut, setShowCashOut] = useState(false);

  return (
    <div className="space-y-6 p-4 sm:p-6 md:p-10 bg-gradient-to-b from-[#355676] via-[#2b4455] to-[#1f2e3d] min-h-screen">
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-[#355676]/90 shadow-xl rounded-2xl p-6 sm:p-8 text-center text-[#E6D5B8] backdrop-blur-md"
      >
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold drop-shadow-lg">
          Welcome back, {user?.name} 👋
        </h1>
        <p className="text-sm sm:text-base md:text-lg mt-2 sm:mt-3 text-[#C8A978] font-medium">
          Manage your wallet and track your transactions effortlessly
        </p>
      </motion.div>

      {/* Wallet Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mx-auto w-full"
      >
        <WalletCard
          wallet={wallet}
          isLoading={walletLoading}
          onAddMoney={() => setShowCashIn(true)}
          onWithdraw={() => setShowCashOut(true)}
          onSendMoney={() => {}}
        />
      </motion.div>

      {/* Transactions Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="bg-[#355676]/90 shadow-xl rounded-2xl p-4 sm:p-6 md:p-8 backdrop-blur-md"
      >
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 items-start sm:items-center mb-4">
          <select
            className="p-2 rounded w-full sm:w-auto bg-[#2C3E50] text-[#E6D5B8]"
            value={typeFilter}
            onChange={(e) => {
              setTypeFilter(e.target.value);
              setPage(1);
            }}
          >
            <option value="">All Types</option>
            <option value="cash-in">Cash In</option>
            <option value="cash-out">Cash Out</option>
          </select>

          <input
            type="date"
            className="p-2 rounded w-full sm:w-auto bg-[#2C3E50] text-[#E6D5B8]"
            value={startDate}
            onChange={(e) => {
              setStartDate(e.target.value);
              setPage(1);
            }}
          />
          <input
            type="date"
            className="p-2 rounded w-full sm:w-auto bg-[#2C3E50] text-[#E6D5B8]"
            value={endDate}
            onChange={(e) => {
              setEndDate(e.target.value);
              setPage(1);
            }}
          />
        </div>

        {/* Transaction List */}
        <TransactionList transactions={transactions} isLoading={isLoading} />

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            <button
              className="px-2 py-1 rounded bg-[#355676] text-[#E6D5B8] disabled:opacity-50 text-sm"
              onClick={() => setPage((prev) => prev - 1)}
              disabled={page === 1}
            >
              Prev
            </button>
            <span className="px-2 py-1 text-[#E6D5B8] text-sm">
              Page {page} of {totalPages}
            </span>
            <button
              className="px-2 py-1 rounded bg-[#355676] text-[#E6D5B8] disabled:opacity-50 text-sm"
              onClick={() => setPage((prev) => prev + 1)}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </motion.div>

      {/* Modals */}
      {showCashIn && <CashInModal isOpen={showCashIn} onClose={() => setShowCashIn(false)} />}
      {showCashOut && <CashOutModal isOpen={showCashOut} onClose={() => setShowCashOut(false)} />}
    </div>
  );
};

export default AgentDashboard;
