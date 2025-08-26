import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
// import { useSelector, useDispatch } from 'react-redux'
// import { RootState } from '../../store'
// import { logout } from '../../store/slices/authSlice'

const Navbar: React.FC = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false)
//   const { isAuthenticated, user } = useSelector((state: RootState) => state.auth)
//   const dispatch = useDispatch()
//   const navigate = useNavigate()

  const handleLogout = () => {
    // dispatch(logout())
    // navigate('/')
  }
const isAuthenticated = false
  return (
    <nav className="bg-primary-700 text-black shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 text-xl font-bold">
              Digital Wallet
            </Link>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-600">
                Home
              </Link>
              <Link to="/about" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-600">
                About
              </Link>
              <Link to="/features" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-600">
                Features
              </Link>
              <Link to="/contact" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-600">
                Contact
              </Link>
            </div>
          </div>

          <div className="flex items-center">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                {/* {user?.name} */}
                <span className="text-sm">Hello, {"Mahi"}</span>
                <button
                  onClick={handleLogout}
                  className="bg-primary-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-500"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex space-x-2">
                <Link
                  to="/login"
                  className="bg-primary-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-500"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-white text-primary-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-100"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar