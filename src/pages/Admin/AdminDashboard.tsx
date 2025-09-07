/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  useGetAllAgentsQuery,
  useGetAllUsersQuery,
} from "../../redux/features/auth/admin.api";
import { useGetAllTransactionsQuery } from "../../redux/features/auth/transaction.Api";
import LoadingScreen from "../../shared/LoaingScreen";
import { useGetProfileQuery } from "../../redux/features/auth/auth.api";
import { motion } from "framer-motion";
import { Users, UserCheck, ReceiptText } from "lucide-react";

const AdminDashboard: React.FC = () => {
  const { data } = useGetProfileQuery();

  // Fetch paginated data (only totals matter)
  const { data: usersData, isLoading: usersLoading } = useGetAllUsersQuery({
    page: 1,
    limit: 1,
  });
  const { data: agentsData, isLoading: agentsLoading } = useGetAllAgentsQuery({
    page: 1,
    limit: 1,
  });

  const { data: transactionsData, isLoading: transactionsLoading } =
    useGetAllTransactionsQuery({ page: 1, limit: 100 });

  if (usersLoading || agentsLoading || transactionsLoading) {
    return <LoadingScreen />;
  }

  // Counts from backend totals
  const userCount = usersData?.total || 0;
  const agentCount = agentsData?.total || 0;
  const transactionCount = transactionsData?.total || 0;

  // Transaction volume (sum of all amounts in current fetch)
  const transactionVolume =
    transactionsData?.transactions?.reduce(
      (sum: number, tx: any) => sum + (tx.amount || 0),
      0
    ) || 0;

  const stats = [
    {
      title: "Users",
      value: userCount,
      icon: <Users className="w-8 h-8 text-[#E6D5B8]" />,
    },
    {
      title: "Agents",
      value: agentCount,
      icon: <UserCheck className="w-8 h-8 text-[#E6D5B8]" />,
    },
    {
      title: "Transactions",
      value: transactionCount,
      subtitle: `Volume: ${transactionVolume} Tk`,
      icon: <ReceiptText className="w-8 h-8 text-[#E6D5B8]" />,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-[#355676] shadow-lg rounded-2xl p-6 text-[#E6D5B8]"
      >
        <h1 className="text-2xl font-bold">
          Welcome <span className="hover:text-[#C8A978]">{data?.name}</span>
        </h1>
        <p className="text-sm opacity-80">
          Manage users, agents, wallets, and transactions
        </p>
      </motion.div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.2 }}
            whileHover={{ scale: 1.05 }}
            className="bg-[#355676] text-[#E6D5B8] shadow-md rounded-2xl p-6 flex items-center justify-between hover:shadow-2xl hover:text-[#C8A978] transition-all duration-300"
          >
            <div>
              <h3 className="text-sm opacity-80">{stat.title}</h3>
              <p className="text-2xl font-bold">{stat.value}</p>
              {stat.subtitle && (
                <p className="text-sm opacity-70">{stat.subtitle}</p>
              )}
            </div>
            <div className="p-3 rounded-full bg-[#E6D5B8]/10">
              {stat.icon}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
