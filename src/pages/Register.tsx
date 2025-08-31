
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Swal from 'sweetalert2';
import { useAuth } from '../hooks/useAuth';
import { registerSchema, type RegisterFormData } from '../schemas/auth';

const RegisterIcon = () => (
<svg
xmlns="http://www.w3.org/2000/svg"
className="h-8 w-8 text-amber-400"
fill="none"
viewBox="0 0 24 24"
stroke="currentColor"
strokeWidth="2">
<path
 strokeLinecap="round"
 strokeLinejoin="round"
 d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
/>
 </svg>
);

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { register: registerUser, isLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      phone: "",
      password: "",
      confirmPassword: "",
      role: "user",
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerUser(data);
      Swal.fire({
        icon: 'success',
        title: 'Account Created!',
        text: "Redirecting to login...",
        timer: 1500,
        showConfirmButton: false,
      });
      navigate('/login');
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Registration failed!',
      });
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md">
        <div className="bg-slate-800 border border-slate-700 rounded-xl shadow-2xl p-8 space-y-6">
          
          {/* Header */}
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <RegisterIcon />
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white">
              Create an Account
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              Fill in the details below to get started.
            </p>
          </div>

          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {/* Name */}
            <div>
                <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-slate-400"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              </div>
              <input
                {...register('name')}
                type="text"
                placeholder="Full Name"
                className={`block w-full rounded-md border-0 py-2.5 pl-10 bg-slate-700 text-white ring-1 ring-inset ${errors.name ? 'ring-red-500' : 'ring-slate-600'} placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-amber-500 sm:text-sm transition-all duration-200`}
              />
              
            </div>
            {errors.name && (
                <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
              )}

            </div>
            {/* Phone */}
            <div>
                <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-slate-400"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              </div>
              <input
                {...register('phone')}
                type="tel"
                placeholder="Phone Number"
                className={`block w-full rounded-md border-0 py-2.5 pl-10 bg-slate-700 text-white ring-1 ring-inset ${errors.phone ? 'ring-red-500' : 'ring-slate-600'} placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-amber-500 sm:text-sm transition-all duration-200`}
              />
              
            </div>
            {errors.phone && (
                <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
              )}
            </div>

            {/* Role */}
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-slate-400"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
              </div>
              <select
                {...register('role')}
                className="block w-full appearance-none rounded-md border-0 py-2.5 pl-10 bg-slate-700 text-white ring-1 ring-inset ring-slate-600 focus:ring-2 focus:ring-inset focus:ring-amber-500 sm:text-sm transition-all duration-200"
              >
                <option value="user">I am a User</option>
                <option value="agent">I am an Agent</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
                <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
              </div>
            </div>

            {/* Password */}
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-slate-400"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
              </div>
              <input
                {...register('password')}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className={`block w-full rounded-md border-0 py-2.5 pl-10 pr-10 bg-slate-700 text-white ring-1 ring-inset ${errors.password ? 'ring-red-500' : 'ring-slate-600'} placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-amber-500 sm:text-sm transition-all duration-200`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-amber-400"
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-5-10-7s4.477-7 10-7c1.276 0 2.493.222 3.625.625M19.07 4.93l-14.14 14.14M9.88 9.88a3 3 0 104.24 4.24"/></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                )}
              </button>
            </div>
              {errors.password && (
                <p className="-mt-4 text-sm text-red-500">{errors.password.message}</p>
              )}

            {/* Confirm Password */}
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-slate-400"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
              </div>
              <input
                {...register('confirmPassword')}
                type="password"
                placeholder="Confirm Password"
                className={`block w-full rounded-md border-0 py-2.5 pl-10 bg-slate-700 text-white ring-1 ring-inset ${errors.confirmPassword ? 'ring-red-500' : 'ring-slate-600'} placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-amber-500 sm:text-sm transition-all duration-200`}
              />
            </div>
              {errors.confirmPassword && (
                <p className="-mt-4 text-sm text-red-500">{errors.confirmPassword.message}</p>
              )}


            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full justify-center rounded-md bg-amber-500 px-3 py-2.5 text-sm font-semibold leading-6 text-slate-900 shadow-sm hover:bg-amber-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {isLoading ? 'Creating account...' : 'Create Account'}
              </button>
            </div>
          </form>

          {/* Footer Link */}
          <p className="text-center text-sm text-slate-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold leading-6 text-amber-400 hover:text-amber-300 transition-colors duration-200"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
