import React, { useState } from 'react';
import { useSelector } from 'react-redux';


import { 
  ArrowTrendingUpIcon, 
  ArrowTrendingDownIcon, 
  ArrowsRightLeftIcon 
} from '@heroicons/react/24/outline';
import type { RootState } from '../../redux/store/store';

const UserDashboard: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  // const { data: wallet, isLoading: walletLoading } = useGetWalletQuery();
  // const { data: transactions, isLoading: transactionsLoading } = useGetMyTransactionsQuery({ page: 1, limit: 5 });
  const [showAddMoney, setShowAddMoney] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [showSendMoney, setShowSendMoney] = useState(false);

  const stats = [
    {
      title: 'Total Balance',
      // wallet?.balance.toFixed(2)
      value: `৳${  '0.00'}`,
      icon: ArrowTrendingUpIcon,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
    },
    {
      title: 'Monthly Transactions',
      value: '24',
      icon: ArrowsRightLeftIcon,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      title: 'Pending Actions',
      value: '2',
      icon: ArrowTrendingDownIcon,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 text-white">
        <h1 className="text-2xl font-bold">Welcome back, {user?.name}! 👋</h1>
        <p className="text-blue-100">Manage your wallet and track your transactions</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gold-500/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gold-500/20">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => setShowAddMoney(true)}
            className="flex flex-col items-center justify-center p-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-md"
          >
            <ArrowTrendingUpIcon className="h-8 w-8 mb-2" />
            <span className="font-medium">Add Money</span>
          </button>
          <button
            onClick={() => setShowWithdraw(true)}
            className="flex flex-col items-center justify-center p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md"
          >
            <ArrowTrendingDownIcon className="h-8 w-8 mb-2" />
            <span className="font-medium">Withdraw</span>
          </button>
          <button
            onClick={() => setShowSendMoney(true)}
            className="flex flex-col items-center justify-center p-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all duration-200 shadow-md"
          >
            <ArrowsRightLeftIcon className="h-8 w-8 mb-2" />
            <span className="font-medium">Send Money</span>
          </button>
        </div>
      </div>

      {/* Recent Transactions */}
      {/* <div className="bg-white rounded-2xl p-6 shadow-lg border border-gold-500/20">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Recent Transactions</h2>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            View All
          </button>
        </div>
        <TransactionList 
          transactions={transactions || []} 
          isLoading={transactionsLoading}
        />
      </div> */}

      {/* Modals */}
      {/* {showAddMoney && (
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
      )} */}
    </div>
  );
};

export default UserDashboard;