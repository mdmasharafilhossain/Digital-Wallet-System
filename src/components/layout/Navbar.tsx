import React, { useState } from 'react';
import { Link} from 'react-router';
// Correct import from react-router-dom
import logo2 from '../../assets/logo-removebg-preview.png' 
import { FiAlignJustify } from "react-icons/fi";// Correct import from react-router-dom
// import { useSelector, useDispatch } from 'react-redux';
// import { RootState } from '../../store'; // Assuming this is your RootState path
// import { logout } from '../../store/slices/authSlice'; // Assuming this is your slice path

// SVG Icon components for clarity


const CloseIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);


const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

  const handleLogout = () => {
    // dispatch(logout());
    // navigate('/');
    // setIsMenuOpen(false); // Close menu on logout
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/features', label: 'Features' },
    { href: '/contact', label: 'Contact' },
  ];
 const isAuthenticated = true; // Placeholder, replace with actual auth state
 const user = null; // Placeholder, replace with actual user data
  return (
    <nav className="bg-[#1c3144] shadow-md sticky top-0 z-50 transition-all duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Brand Name */}
          <div className="flex-shrink-0">
            <img className='h-16 w-20' src={logo2}alt="" />
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-[#E6D5B8] hover:text-[#C8A978] px-3 py-2 rounded-md text-[18px] font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <span className="text-[#E6D5B8] font-medium text-[18px]">Hello, {user?.name || 'User'}</span>
                <button
                  onClick={handleLogout}
                  className="bg-[#355676] text-[#E6D5B8] px-4 py-2 rounded-md text-[18px] font-medium hover:text-[#C8A978] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#C8A978] transition-all"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-[#E6D5B8] hover:text-[#C8A978] px-4 py-2 rounded-md text-[18px] font-medium transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-[#355676] text-[#E6D5B8] px-4 py-2 rounded-md text-sm font-medium hover:text-[#C8A978] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#C8A978] transition-all"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-[#E6D5B8] bg-[#355676] hover:text-[#C8A978] hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#E6D5B8]"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <CloseIcon /> : <FiAlignJustify className='text-2xl'/>}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } absolute top-16 left-0 w-full bg-[#355676] shadow-lg`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="text-[#E6D5B8] hover:bg-[#1c3144] hover:text-[#C8A978] block px-3 py-2 rounded-md text-base font-medium transition-colors"
            >
              {link.label}
            </Link>
          ))}

          {/* Mobile Auth Buttons */}
          <div className="pt-4 pb-3 border-t border-gray-200">
            {isAuthenticated ? (
              <div className="px-5 flex items-center justify-between">
                <span className="font-medium text-gray-800">Hello, {user?.name || 'User'}</span>
                <button
                  onClick={handleLogout}
                  className="bg-indigo-600 text-white px-3 py-1.5 rounded-md text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="px-2 space-y-2">
                 <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full text-center bg-gray-100 text-gray-800 px-4 py-2 rounded-md text-base font-medium hover:bg-gray-200 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full text-center bg-indigo-600 text-white px-4 py-2 rounded-md text-base font-medium hover:bg-indigo-700 transition-colors"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;