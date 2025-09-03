/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'

import toast from 'react-hot-toast'
import { useAddMoneyMutation } from '../../redux/features/auth/wallet.api'

interface AddMoneyModalProps {
  isOpen: boolean
  onClose: () => void
}

const AddMoneyModal: React.FC<AddMoneyModalProps> = ({ isOpen, onClose }) => {
  const [amount, setAmount] = useState('')
  const [addMoney, { isLoading }] = useAddMoneyMutation()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await addMoney({ amount: parseFloat(amount) }).unwrap()
      toast.success('Money added successfully!')
      setAmount('')
      onClose()
    } catch (error: any) {
      toast.error(error.data?.message || 'Failed to add money')
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-900">Add Money</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <span className="text-2xl">&times;</span>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
              Amount
            </label>
            <input
              type="number"
              id="amount"
              min="1"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Enter amount"
              required
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700 disabled:opacity-50"
            >
              {isLoading ? 'Adding...' : 'Add Money'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddMoneyModal