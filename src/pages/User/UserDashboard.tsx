import React, { useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

import WalletCard from "../../components/wallet/WalletCard";
import TransactionList from "../../components/transactions/TransactionList";
import AddMoneyModal from "../../components/wallet/AddMoneyModal";
import WithdrawMoneyModal from "../../components/wallet/WithdrawMoneyModal";
import SendMoneyModal from "../../components/wallet/SendMoneyModal";

import type { RootState } from "../../redux/store/store";
import { useGetWalletQuery } from "../../redux/features/auth/wallet.api";
import { useGetMyTransactionsQuery } from "../../redux/features/auth/transaction.Api";

const UserDashboard: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { data: wallet, isLoading: walletLoading } = useGetWalletQuery();
  const { data: transactions, isLoading: transactionsLoading } =
    useGetMyTransactionsQuery({ page: 1, limit: 10 });

  const [showAddMoney, setShowAddMoney] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [showSendMoney, setShowSendMoney] = useState(false);

  return (
    <div className="space-y-10 p-4 md:p-10 bg-gradient-to-b from-[#355676] via-[#2b4455] to-[#1f2e3d] min-h-screen">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-[#355676]/90 shadow-xl rounded-2xl p-8 text-center text-[#E6D5B8] backdrop-blur-md"
      >
        <h1 className="text-3xl md:text-4xl font-extrabold drop-shadow-lg">
          Welcome back, {user?.name} 👋
        </h1>
        <p className="text-[#C8A978] mt-3 text-base md:text-lg font-medium">
          Manage your wallet and track your transactions effortlessly
        </p>
      </motion.div>

      {/* Wallet Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className=" mx-auto w-full"
      >
        <WalletCard
          wallet={wallet}
          isLoading={walletLoading}
          onAddMoney={() => setShowAddMoney(true)}
          onWithdraw={() => setShowWithdraw(true)}
          onSendMoney={() => setShowSendMoney(true)}
        />
      </motion.div>

      {/* Transactions Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="bg-[#355676]/90 shadow-xl rounded-2xl p-6 md:p-8 backdrop-blur-md"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-[#E6D5B8] drop-shadow">
            Recent Transactions
          </h2>
          <motion.span
            whileHover={{ scale: 1.1 }}
            className="text-sm md:text-base text-[#C8A978] cursor-pointer hover:underline"
          >
            View All
          </motion.span>
        </div>
        <TransactionList
          transactions={transactions || []}
          isLoading={transactionsLoading}
        />
      </motion.div>

      {/* Modals */}
      {showAddMoney && (
        <AddMoneyModal
          isOpen={showAddMoney}
          onClose={() => setShowAddMoney(false)}
        />
      )}
      {showWithdraw && (
        <WithdrawMoneyModal
          isOpen={showWithdraw}
          onClose={() => setShowWithdraw(false)}
        />
      )}
      {showSendMoney && (
        <SendMoneyModal
          isOpen={showSendMoney}
          onClose={() => setShowSendMoney(false)}
        />
      )}
    </div>
  );
};

export default UserDashboard;
