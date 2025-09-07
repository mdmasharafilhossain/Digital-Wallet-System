import React from 'react'
import { Link } from 'react-router'
import { motion } from 'framer-motion'

const Unauthorized: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#355676] px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="max-w-md w-full bg-white/10 backdrop-blur-md p-10 rounded-2xl shadow-2xl text-center border border-white/20"
      >
        <div className="text-7xl mb-6">🚫</div>
        <h1 className="text-3xl font-bold text-[#E6D5B8] mb-4">
          Access Denied
        </h1>
        <p className="text-[#E6D5B8]/80 mb-8 leading-relaxed">
          You don’t have permission to access this page.  
          If you believe this is a mistake, please contact support.
        </p>
        <Link
          to="/"
          className="inline-block bg-[#E6D5B8] text-[#355676] font-semibold px-6 py-3 rounded-lg shadow-md 
                     hover:bg-[#C8A978] hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 
                     focus:ring-[#C8A978] transition-all duration-300"
        >
          Go Home
        </Link>
      </motion.div>
    </div>
  )
}

export default Unauthorized
