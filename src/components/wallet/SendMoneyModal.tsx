/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useSendMoneyMutation } from '../../redux/features/auth/wallet.api';

interface SendMoneyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SendMoneyModal: React.FC<SendMoneyModalProps> = ({ isOpen, onClose }) => {
  const [receiverPhone, setReceiverPhone] = useState('');
  const [amount, setAmount] = useState('');
  const [sendMoney, { isLoading }] = useSendMoneyMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!receiverPhone.trim()) {
        Swal.fire({
            icon: 'warning',
            title: 'Missing Information',
            text: 'Please enter the receiver\'s phone number.',
            confirmButtonColor: '#355676',
        });
        return;
    }

    if (parseFloat(amount) <= 0 || isNaN(parseFloat(amount))) {
      Swal.fire({
        icon: 'warning',
        title: 'Invalid Amount',
        text: 'Please enter an amount greater than zero.',
        confirmButtonColor: '#355676',
      });
      return;
    }

    try {
      await sendMoney({
        receiverId: receiverPhone,
        amount: parseFloat(amount),
      }).unwrap();
      
      setReceiverPhone('');
      setAmount('');
      onClose();

      Swal.fire({
        icon: 'success',
        title: 'Money Sent!',
        text: 'Your transaction was successful.',
        confirmButtonColor: '#355676',
        timer: 2000,
        timerProgressBar: true,
      });
    } catch (error: any) {
      Swal.fire({
        icon: 'error',
        title: 'Transaction Failed',
        text: error.data?.message || 'Something went wrong. Please try again.',
        confirmButtonColor: '#355676',
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4 transition-opacity duration-300 ease-in-out">
      <div className="relative w-full max-w-md transform rounded-2xl bg-[#fcfaf2] p-6 text-left align-middle shadow-xl transition-all">
        <div className="flex items-start justify-between">
          <h3 className="text-2xl font-bold leading-6 text-[#355676]">
            Send Money to another Person
          </h3>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-200 hover:text-gray-800"
            aria-label="Close modal"
          >
            <span className="text-2xl">&times;</span>
          </button>
        </div>

         <form onSubmit={handleSubmit} className="mt-6">
          <div className="mb-5">
            <label htmlFor="receiverPhone" className="mb-2 block text-sm font-medium text-gray-700">
              Receiver's ID
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
  <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
  <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM7 11a1 1 0 100 2 1 1 0 000-2zm-1 3a2 2 0 014 0H6zm5-2h4a1 1 0 100-2h-4a1 1 0 100 2zm0 2h3a1 1 0 100-2h-3a1 1 0 100 2z" clipRule="evenodd" />
</svg>

              </span>
              <input
                type="text"
                id="receiverPhone"
                name="receiverPhone"
                value={receiverPhone}
                onChange={(e) => setReceiverPhone(e.target.value)}
                className="w-full rounded-lg border-gray-300 bg-white py-3 pl-10 pr-4 text-gray-800 shadow-sm transition focus:border-[#355676] focus:outline-none focus:ring-2 focus:ring-[#355676]"
                placeholder="Enter Receiver's ID"
                required
              />
            </div>
          </div>

          <div className="mb-5">
            <label htmlFor="amount" className="mb-2 block text-sm font-medium text-gray-700">
              Amount to Send
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                ৳
              </span>
              <input
                type="number"
                id="amount"
                name="amount"
                min="0.01"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full rounded-lg border-gray-300 bg-white py-3 pl-8 pr-4 text-gray-800 shadow-sm transition focus:border-[#355676] focus:outline-none focus:ring-2 focus:ring-[#355676]"
                placeholder="0.00"
                required
              />
            </div>
          </div>

          <div className="mt-8 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg px-5 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center justify-center rounded-lg bg-[#355676] px-5 py-2.5 text-sm font-semibold text-[#E6D5B8] shadow-md transition-all hover:bg-[#2a455d] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isLoading ? (
                <>
                  <svg className="-ml-1 mr-3 h-5 w-5 animate-spin text-[#E6D5B8]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </>
              ) : (
                'Confirm and Send'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SendMoneyModal;

