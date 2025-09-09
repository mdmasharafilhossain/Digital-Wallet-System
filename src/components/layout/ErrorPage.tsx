/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Link, useNavigate, useRouteError } from "react-router";
import { motion } from "framer-motion";
import type { ErrorPageProps } from "../../types";



const ErrorGraphic: React.FC = () => (
  <svg
    width="320"
    height="240"
    viewBox="0 0 320 240"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="Error illustration"
  >
    <rect width="320" height="240" rx="20" fill="#234556" />
    <g transform="translate(40,28)">
      <circle cx="120" cy="80" r="48" fill="#E6D5B8" fillOpacity="0.08" />
      <path d="M48 160c20-30 56-44 86-20 30 24 58 8 86-20" stroke="#E6D5B8" strokeOpacity="0.12" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
      <g transform="translate(86,52)">
        <rect x="-10" y="-10" width="20" height="20" rx="4" fill="#E6D5B8" fillOpacity="0.14" />
        <rect x="20" y="-10" width="20" height="20" rx="4" fill="#E6D5B8" fillOpacity="0.14" />
        <rect x="-10" y="20" width="50" height="10" rx="3" fill="#E6D5B8" fillOpacity="0.08" />
      </g>
    </g>
  </svg>
);

const ErrorPage: React.FC<ErrorPageProps> = ({ title, message, code }) => {
  // Try to read a router error if available (works when used as errorElement)
  const routeError = useRouteError() as any;
  const navigate = useNavigate();

  const status = code ?? routeError?.status ?? (routeError?.statusText ? routeError.statusText : "Error");
  const heading = title ?? routeError?.message ?? "Something went wrong";
  const details = message ?? routeError?.data?.message ?? routeError?.statusText ?? "We couldn't complete your request. Try again or contact support.";

  const handleRetry = () => {
    // simple retry: reload current route
    window.location.reload();
  };

  const handleContact = () => {
    const subject = encodeURIComponent("App Issue Report");
    const body = encodeURIComponent(`I encountered an error:\n\nStatus: ${status}\nMessage: ${heading}\n\nPlease help.\n`);
    window.location.href = `mailto:support@yourdomain.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#355676] text-[#E6D5B8] px-4">
      <motion.div
        initial={{ opacity: 0, y: 12, scale: 0.995 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="max-w-5xl w-full grid md:grid-cols-2 gap-8 items-center"
      >
        {/* Left: Illustration */}
        <div className="flex items-center justify-center">
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm shadow-lg"
          >
            <ErrorGraphic />
          </motion.div>
        </div>

        {/* Right: Content */}
        <div className="bg-white/5 p-8 rounded-2xl shadow-lg">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-wide opacity-80">Error</p>
              <h1 className="mt-2 text-3xl md:text-4xl font-extrabold leading-tight">
                <span className="block text-[#E6D5B8]">{heading}</span>
              </h1>
              <p className="mt-3 text-sm md:text-base text-[#E6D5B8]/90 max-w-xl">
                {details}
              </p>
            </div>

            <div className="ml-4 flex-shrink-0 text-right">
              <div className="text-xs text-[#E6D5B8]/70">Status</div>
              <div className="mt-2 px-3 py-1 rounded-full bg-[#E6D5B8]/10 text-[#E6D5B8] font-semibold">
                {status}
              </div>
            </div>
          </div>

          {/* Helpful actions */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => navigate("/")}
              className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-2 rounded-lg bg-[#E6D5B8] text-[#355676] font-semibold hover:text-[#C8A978] transition"
              aria-label="Go to Home"
            >
              Go to Home
            </button>

            <button
              onClick={handleRetry}
              className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-2 rounded-lg border border-[#E6D5B8]/20 text-[#E6D5B8] hover:text-[#C8A978] transition"
              aria-label="Retry"
            >
              Retry
            </button>

            <button
              onClick={handleContact}
              className="hidden w-full sm:w-auto  items-center justify-center px-5 py-2 rounded-lg bg-transparent text-[#E6D5B8] hover:text-[#C8A978] border border-[#E6D5B8]/10 transition"
              aria-label="Contact support"
            >
              Contact Support
            </button>
          </div>

          {/* Extra: report info */}
          <div className="mt-5 text-xs text-[#E6D5B8]/60">
            <p>
              Tip: If the problem persists, please take a screenshot and send it to{" "}
              <a className="underline hover:text-[#C8A978]" href="mashrafilmahi007@gmail.com">
                mashrafilmahi007@gmail.com
              </a>
              .
            </p>
          </div>

          {/* Small footer */}
          <div className="mt-6 flex items-center justify-between text-xs text-[#E6D5B8]/60">
            <div>© {new Date().getFullYear()} Your Company</div>
            <div className="flex items-center gap-3">
              <Link to="/terms" className="hover:text-[#C8A978]">Terms</Link>
              <Link to="/privacy" className="hover:text-[#C8A978]">Privacy</Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ErrorPage;
