import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {  ArrowDownTrayIcon, PaperAirplaneIcon } from '@heroicons/react/24/solid';


import { useGetWalletQuery } from '../../redux/features/auth/wallet.api';
import { useGetProfileQuery } from '../../redux/features/auth/auth.api';

import AddMoneyModal from '../../components/wallet/AddMoneyModal';
import WithdrawMoneyModal from '../../components/wallet/WithdrawMoneyModal';
import SendMoneyModal from '../../components/wallet/SendMoneyModal';
import type { ActionButtonProps } from '../../types';

const UserDashboard: React.FC = () => {
  const { data: userProfile } = useGetProfileQuery();
  const { data: wallet, isLoading: walletLoading } = useGetWalletQuery();

  const [showAddMoney, setShowAddMoney] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [showSendMoney, setShowSendMoney] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <div className="bg-[#1E2A38] text-[#E6D5B8] min-h-screen p-4 sm:p-6 lg:p-8 font-sans">
      <motion.div
        className="space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Welcome */}
        <motion.div variants={itemVariants}>
          <h1 className="text-4xl font-bold">
            Welcome back, {userProfile?.name || 'User'}!
          </h1>
          <p className="text-lg text-[#E6D5B8]/70 mt-1">
            Here&apos;s your financial overview.
          </p>
        </motion.div>

        {/* Wallet */}
        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            {/* Balance */}
            <div className="space-y-2">
              <h2 className="text-sm font-medium uppercase tracking-widest text-[#E6D5B8]/60">
                Available Balance
              </h2>
              {walletLoading ? (
                <div className="animate-pulse bg-white/20 h-12 w-48 rounded-md"></div>
              ) : (
                <p className="text-5xl font-bold tracking-tight text-[#FFD580]">
                  ৳{wallet?.balance?.toFixed(2) || '0.00'}
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              
              <ActionButton icon={<ArrowDownTrayIcon className="w-5 h-5" />} onClick={() => setShowWithdraw(true)} label="Withdraw" />
              <ActionButton icon={<PaperAirplaneIcon className="w-5 h-5" />} onClick={() => setShowSendMoney(true)} label="Send" />
            </div>
          </div>
        </motion.div>

        {/* Transactions */}
        <motion.div variants={itemVariants}>
          <h2 className="text-2xl font-semibold mb-4 text-[#E6D5B8]">Recent Activity</h2>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
            <p className="text-[#E6D5B8]/70">Your recent transactions will appear here.</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Modals */}
      {showAddMoney && (
        <AddMoneyModal isOpen={showAddMoney} onClose={() => setShowAddMoney(false)} />
      )}
      {showWithdraw && (
        <WithdrawMoneyModal isOpen={showWithdraw} onClose={() => setShowWithdraw(false)} />
      )}
      {showSendMoney && (
        <SendMoneyModal isOpen={showSendMoney} onClose={() => setShowSendMoney(false)} />
      )}
    </div>
  );
};



const ActionButton: React.FC<ActionButtonProps> = ({ onClick, icon, label }) => (
  <button
    onClick={onClick}
    className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[#2C3E50] text-[#E6D5B8] font-semibold rounded-xl
               hover:bg-[#34495E] hover:text-[#FFD580] focus:outline-none focus:ring-2 focus:ring-offset-2
               focus:ring-offset-[#1E2A38] focus:ring-[#FFD580] transition-all duration-300 shadow-md hover:shadow-lg"
  >
    {icon}
    <span className="hidden sm:inline">{label}</span>
  </button>
);

export default UserDashboard;
