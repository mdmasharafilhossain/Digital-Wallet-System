import React, { useState } from "react";

import { motion } from "framer-motion";


import TransactionList from "../../components/transactions/TransactionList";




import { useGetAllTransactionsQuery,} from "../../redux/features/auth/transaction.Api";


const TransactionList_Admin: React.FC = () => {
  
  
 
   
  const [page, setPage] = useState(1);
  const [typeFilter, setTypeFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const limit = 5;

  const { data, isLoading } = useGetAllTransactionsQuery({
    page,
    limit,
    type: typeFilter || undefined,
    startDate: startDate || undefined,
    endDate: endDate || undefined,
  });

  const transactions = data?.transactions || [];
  const totalPages = data?.totalPages || 0;
  console.log(transactions , "Admin Transctions");



  return (
    <div className="space-y-10 p-4 md:p-10 bg-gradient-to-b from-[#355676] via-[#2b4455] to-[#1f2e3d] min-h-screen">
      {/* Header */}
     

      {/* Wallet Section */}
     

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
             {/* Filters */}
      <div className="flex flex-col md:flex-row gap-3 items-center mb-4">
        <select
          className="p-2 rounded bg-[#2C3E50] text-[#E6D5B8]"
          value={typeFilter}
          onChange={(e) => { setTypeFilter(e.target.value); setPage(1); }}
        >
          <option value="">All Types</option>
          <option value="top-up">Top-up</option>
          <option value="withdraw">Withdraw</option>
          <option value="send">Send</option>
        </select>

        <input
          type="date"
          className="p-2 rounded bg-[#2C3E50] text-[#E6D5B8]"
          value={startDate}
          onChange={(e) => { setStartDate(e.target.value); setPage(1); }}
        />
        <input
          type="date"
          className="p-2 rounded bg-[#2C3E50] text-[#E6D5B8]"
          value={endDate}
          onChange={(e) => { setEndDate(e.target.value); setPage(1); }}
        />
      </div>

        </div>
          <div className="p-4">
      <h1 className="text-xl font-bold mb-4 text-[#E6D5B8]">My Transactions</h1>

      {/* Transaction Table/List */}
      <TransactionList transactions={transactions} isLoading={isLoading} />

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          <button
            className="px-3 py-1 rounded bg-[#355676] text-[#E6D5B8] disabled:opacity-50"
            onClick={() => setPage((prev) => prev - 1)}
            disabled={page === 1}
          >
            Prev
          </button>
          <span className="px-3 py-1 text-[#E6D5B8]">
            Page {page} of {totalPages}
          </span>
          <button
            className="px-3 py-1 rounded bg-[#355676] text-[#E6D5B8] disabled:opacity-50"
            onClick={() => setPage((prev) => prev + 1)}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
      </motion.div>

   
    </div>
  );
};

export default TransactionList_Admin;
