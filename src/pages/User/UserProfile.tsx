/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

import { motion } from "framer-motion";
import { X, Eye, EyeOff } from "lucide-react";
import Swal from "sweetalert2";


import { useGetProfileQuery, useUpdateProfileMutation } from "../../redux/features/auth/auth.api";

import { updateSchema } from "../../schemas/auth";

// Validation Schema
updateSchema.refine((data) => !data.password || data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

const UserProfile = () => {
  
 const {data} = useGetProfileQuery();
  const [formData, setFormData] = useState({
    name: data?.name || "",
    phone: data?.phone || "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); 
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const result = updateSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    try {
      await updateProfile({
        name: formData.name,
        phone: formData.phone,
        password: formData.password || undefined,
      }).unwrap();

      Swal.fire({
        title: "Success 🎉",
        text: "Profile updated successfully!",
        icon: "success",
        
        confirmButtonColor: "#C8A978",
      background: "#355676",
      color: "#E6D5B8",
      });
      setIsModalOpen(false);
      setFormData({ ...formData, password: "", confirmPassword: "" });
    } catch (err: any) {
      Swal.fire({
        title: "Error ❌",
        text: err?.data?.message || "Failed to update profile",
        icon: "error",
        background: "#355676",
        color: "#E6D5B8",
        confirmButtonColor: "#2b4455",
        
      });
    }
  };

  return (
    <div className="p-6">
      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-[#355676] rounded-2xl shadow-lg p-6 text-[#E6D5B8] max-w-lg mx-auto"
      >
        <h2 className="text-2xl font-bold mb-4">My Profile</h2>
        <div className="space-y-2">
  <p>
    <span className="font-semibold">ID:</span> {data?._id}{" "}
    <button
      onClick={() => {
        navigator.clipboard.writeText(data?._id || "");
        Swal.fire({
          title: "Copied ✅",
          text: "ID copied to clipboard",
          icon: "success",
          background: "#355676",
          color: "#E6D5B8",
          confirmButtonColor: "#2b4455",
          timer: 1500,
          showConfirmButton: false,
        });
      }}
      className="ml-2 px-2 py-1 text-xs rounded bg-[#2b4455] hover:bg-[#2b4455]/80 hover:text-[#C8A978] transition"
    >
      Copy ID
    </button>
  </p>
  <p><span className="font-semibold">Name:</span> {data?.name}</p>
  <p><span className="font-semibold">Phone:</span> {data?.phone}</p>
  <p><span className="font-semibold">Role:</span> {data?.role}</p>
</div>


        <button
          onClick={() => setIsModalOpen(true)}
          className="mt-6 px-5 py-2 rounded-lg bg-[#2b4455] text-[#E6D5B8] hover:text-[#C8A978] transition"
        >
          Edit Profile
        </button>
      </motion.div>

      {/* Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[#355676] rounded-2xl shadow-2xl p-6 w-full max-w-md relative text-[#E6D5B8]"
          >
            {/* Close button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-[#E6D5B8] hover:text-[#C8A978]"
            >
              <X size={22} />
            </button>

            <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block mb-1 text-sm">Name</label>
                <input
                  name="name"
                  value={formData.name}
                  defaultValue={data?.name}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-[#2b4455] text-[#E6D5B8]"
                />
                {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className="block mb-1 text-sm">Phone</label>
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-[#2b4455] text-[#E6D5B8]"
                />
                {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
              </div>

              {/* Password */}
              <div>
                <label className="block mb-1 text-sm">New Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full p-2 rounded bg-[#2b4455] text-[#E6D5B8]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2 text-[#E6D5B8]"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block mb-1 text-sm">Confirm Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-[#2b4455] text-[#E6D5B8]"
                />
                {errors.confirmPassword && <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2 mt-4 rounded-lg bg-[#2b4455] text-[#E6D5B8] hover:text-[#C8A978] transition"
              >
                {isLoading ? "Updating..." : "Save Changes"}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
