/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import {
    useGetAllAgentsQuery,
  
  useToggleAgentApprovalMutation,
  
  
} from "../../redux/features/auth/admin.api";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const AgentManagement: React.FC = () => {
  const [page, setPage] = useState(1);
  const limit = 5;

  const { data, isLoading, refetch } = useGetAllAgentsQuery({ page, limit });
  const [toggleAgentApproval] = useToggleAgentApprovalMutation();

  const agents = data?.agents || [];
  const totalPages = Math.ceil((data?.total || 0) / limit);
  

  const handleToggleBlock = async (id: string, isActive: boolean) => {
    const action = isActive ? "Suspend" : "Approve";

    const result = await MySwal.fire({
      title: `Are you sure you want to ${action} this Agent?`,
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
        await toggleAgentApproval({ id }).unwrap();
        refetch();
        MySwal.fire({
          icon: "success",
          title: `Agent ${action}d successfully!`,
          background: "#355676",
          color: "#E6D5B8",
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (err) {
        console.error("Failed to toggle user block:", err);
        MySwal.fire({
          icon: "error",
          title: "Failed to update Agent!",
          background: "#355676",
          color: "#E6D5B8",
        });
      }
    }
  };

  if (isLoading) {
    return (
      <div className="animate-pulse p-4">
        <div className="h-8 bg-[#355676] rounded w-1/4 mb-4"></div>
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-16 bg-[#355676] rounded mb-2"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 bg-[#f5f5f5] min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-[#355676]">
        Agent Management
      </h2>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-hidden shadow-lg ring-1 ring-black ring-opacity-5 rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-[#355676]">
            <tr>
              {["Name", "Phone", "Status", "Created At", "Actions"].map(
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
            {agents.map((user: any) => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-[#355676] font-medium">
                  {user.name}
                </td>
                <td className="px-6 py-4 text-[#355676]">{user.phone}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      user.isAgentApproved
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {user.isAgentApproved ? "Approved" : "Suspended / Pending"}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-sm font-medium">
                  <button
                    onClick={() =>
                      handleToggleBlock(user._id, user.isAgentApproved)
                    }
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      user.isAgentApproved
                        ? "bg-red-100 text-red-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  
                  >
                    {user.isAgentApproved ?   "Suspend Agent" : "Approve Agent"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {agents.map((user: any) => (
          <div
            key={user._id}
            className="bg-white shadow-md rounded-lg p-4 space-y-2"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-[#355676] font-semibold text-lg">
                {user.name}
              </h3>
              <span
                className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  user.isActive
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {user.isActive ? "Active" : "Inactive"}
              </span>
            </div>
            <p className="text-[#355676] font-medium">Phone: {user.phone}</p>
            <p className="text-gray-500 text-sm">
              Created: {new Date(user.createdAt).toLocaleDateString()}
            </p>
            <button
              onClick={() => handleToggleBlock(user._id, user.isActive)}
              className="w-full px-3 py-2 rounded bg-[#355676] text-[#E6D5B8] hover:text-[#C8A978] font-semibold"
            >
              {user.isActive ? "Block User" : "Unblock User"}
            </button>
          </div>
        ))}
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

export default AgentManagement;
