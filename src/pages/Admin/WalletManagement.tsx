/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import {
  useGetAllWalletsQuery,
  
  useToggleWalletBlockMutation,
} from "../../redux/features/auth/admin.api";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import LoadingScreen from "../../shared/LoaingScreen";

const MySwal = withReactContent(Swal);

const WalletManagement: React.FC = () => {
  const [page, setPage] = useState(1);
  const limit = 10;

  // Fetch wallets
  const { data, isLoading, refetch } = useGetAllWalletsQuery(
    { page, limit },
    { refetchOnMountOrArgChange: true }
  );

  // Extract wallets array from response
  const wallets = data?.data.wallets || [];
  const totalPages = data?.pagination?.totalPages || 1;

  const [toggleWalletBlock] = useToggleWalletBlockMutation();

  const handleToggleBlock = async (id: string, isBlocked: boolean) => {
    const action = isBlocked ? "Unblock" : "Block";
console.log(id, "User ID");
    const result = await MySwal.fire({
      title: `Are you sure you want to ${action} this User?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      background: "#355676",
      color: "#E6D5B8",
      confirmButtonColor: "#C8A978",
      cancelButtonColor: "#E6D5B8",
    });

    if (result.isConfirmed) {
      try {
        await toggleWalletBlock({ id }).unwrap();
        refetch();
        MySwal.fire({
          icon: "success",
          title: `User ${action}d successfully!`,
          background: "#355676",
          color: "#E6D5B8",
          timer: 1500,
          showConfirmButton: false,
          
        });
      } catch (err) {
        console.error("Failed to toggle user approval:", err);
        MySwal.fire({
          icon: "error",
          title: "Failed to update User!",
          background: "#355676",
          color: "#E6D5B8",
        });
      }
    }
  };

  if (isLoading) {
    return <LoadingScreen/>
  }

  return (
    <div className="p-4 md:p-6 bg-[#f5f5f5] min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-[#355676]">Wallet Management</h2>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-hidden shadow-lg ring-1 ring-black ring-opacity-5 rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-[#355676]">
            <tr>
              {["Name", "Phone", "Wallet Balance", "Wallet Status", "Actions"].map(
                (header) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-left text-xs font-medium uppercase text-[#E6D5B8]"
                  >
                    {header}
                  </th>
                )
              )}
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {wallets.map((wallet: any) => {
              const user = wallet.user;
              if (!user) return null; // Skip wallets without a user
              return (
                <tr key={wallet._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-[#355676] font-medium">{user.name}</td>
                  <td className="px-6 py-4 text-[#355676]">{user.phone}</td>
                  <td className="px-6 py-4 text-[#355676]">{wallet.balance} Tk</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        !wallet.isBlocked
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {wallet.isBlocked ? "Blocked" : "Active"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">
                    <button
                      onClick={() => handleToggleBlock(wallet._id, wallet.isBlocked)}
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        !wallet.isBlocked
                          ? "bg-red-100 text-red-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {wallet.isBlocked ? "Unblock Wallet" : "Block Wallet"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {wallets.map((wallet: any) => {
          const user = wallet.user;
          if (!user) return null; // Skip wallets without a user
          return (
            <div key={wallet._id} className="bg-white shadow-md rounded-lg p-4 space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="text-[#355676] font-semibold text-lg">{user.name}</h3>
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    !wallet.isBlocked ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}
                >
                  {wallet.isBlocked ? "Blocked" : "Active"}
                </span>
              </div>
              <p className="text-[#355676] font-medium">Phone: {user.phone}</p>
              <p className="text-[#355676] font-medium">Balance: {wallet.balance} Tk</p>
              <button
                onClick={() => handleToggleBlock(wallet._id, wallet.isBlocked)}
                className="w-full px-3 py-2 rounded bg-[#355676] text-[#E6D5B8] hover:text-[#C8A978] font-semibold"
              >
                {!wallet.isBlocked ? "Block Wallet" : "Active Wallet"}
              </button>
            </div>
          );
        })}
      </div>

      {/* Pagination Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-6 space-y-2 md:space-y-0">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-4 py-2 rounded bg-[#355676] text-[#E6D5B8] hover:text-[#C8A978] disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-[#355676] font-medium">
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 rounded bg-[#355676] text-[#E6D5B8] hover:text-[#C8A978] disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default WalletManagement;
