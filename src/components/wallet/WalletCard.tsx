import React from 'react'
import type { Wallet } from '../../types'


interface WalletCardProps {
  wallet: Wallet | undefined
  isLoading: boolean
  onAddMoney: () => void
  onWithdraw: () => void
  onSendMoney: () => void
}

const WalletCard: React.FC<WalletCardProps> = ({
  wallet,
  isLoading,
  onAddMoney,
  onWithdraw,
  onSendMoney
}) => {
  if (isLoading) {
    return (
      <div className="bg-white shadow rounded-lg p-6 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="h-12 bg-gray-200 rounded w-1/2 mb-6"></div>
        <div className="flex space-x-4">
          <div className="h-10 bg-gray-200 rounded w-1/3"></div>
          <div className="h-10 bg-gray-200 rounded w-1/3"></div>
          <div className="h-10 bg-gray-200 rounded w-1/3"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-medium text-gray-900">Your Wallet </h2>
      <div className="mt-4">
        <p className="text-4xl font-bold text-gray-900">
          ৳{wallet?.balance ?  wallet?.balance : 0}
        </p>
        <p className="text-sm text-gray-500 mt-2">
          {wallet?.isBlocked ? (
            <span className="text-red-600">Wallet is blocked</span>
          ) : (
            <span className="text-green-600">Wallet is active</span>
          )}
        </p>
      </div>
      <div className="mt-6 flex space-x-4">
        {

           ( wallet?.user?.role === 'agent' || wallet?.user?.role === 'admin') &&
            <button
          onClick={onAddMoney}
          disabled={wallet?.isBlocked}
          className="flex-1 bg-primary-600 text-black py-2 px-4 rounded-md hover:bg-primary-700 disabled:opacity-50"
        >
          Add Money
        </button>
        }
        <button
          onClick={onWithdraw}
          disabled={wallet?.isBlocked}
          className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 disabled:opacity-50"
        >
          Withdraw
        </button>
        <button
          onClick={onSendMoney}
          disabled={wallet?.isBlocked}
          className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 disabled:opacity-50"
        >
          Send Money
        </button>
      </div>
    </div>
  )
}

export default WalletCard