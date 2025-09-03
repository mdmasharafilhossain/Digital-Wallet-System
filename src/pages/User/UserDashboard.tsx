import React, { useState } from 'react'


import { useGetWalletQuery } from '../../redux/features/auth/wallet.api'

import WalletCard from '../../components/wallet/WalletCard'

import { useGetProfileQuery } from '../../redux/features/auth/auth.api'
import AddMoneyModal from '../../components/wallet/AddMoneyModal'
import WithdrawMoneyModal from '../../components/wallet/WithdrawMoneyModal'
import SendMoneyModal from '../../components/wallet/SendMoneyModal'


const UserDashboard: React.FC = () => {
//   const { user } = useSelector((state: RootState) => state.auth)
  const {  data  } = useGetProfileQuery();
  const { data: wallet, isLoading: walletLoading } = useGetWalletQuery()
//   const { data: transactions, isLoading: transactionsLoading } = useGetMyTransactionsQuery({ page: 1, limit: 10 })
  const [showAddMoney, setShowAddMoney] = useState(false)
  const [showWithdraw, setShowWithdraw] = useState(false)
  const [showSendMoney, setShowSendMoney] = useState(false)
console.log(data,"user from user dashboard");
    console.log(wallet,"wallet from user dashboard");
   
  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, {data?.name ? data?.name : 'User'}!</h1>
        <p className="text-gray-600">Manage your wallet and transactions</p>
      </div>

      <WalletCard 
        wallet={wallet} 
        isLoading={walletLoading}
        onAddMoney={() => setShowAddMoney(true)}
        onWithdraw={() => setShowWithdraw(true)}
        onSendMoney={() => setShowSendMoney(true)}
      />

      {/* <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Transactions</h2>
        <TransactionList 
          transactions={transactions || []} 
          isLoading={transactionsLoading}
        />
      </div> */}

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
  )
}

export default UserDashboard