import React, { useState } from 'react';
import { Link, useNavigate} from 'react-router';

import logo2 from '../../assets/logo-removebg-preview.png' 
import { FiAlignJustify } from "react-icons/fi";
import { useSelector} from 'react-redux';
import type { RootState } from '../../redux/store/store';
import { useAuth } from '../../hooks/useAuth';

import Swal from "sweetalert2";



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
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const { logout } = useAuth();
  const navigate = useNavigate();

  

const handleLogout = async () => {
  try {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account!",
      icon: "warning",
      showCancelButton: true,
      
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
       confirmButtonColor: "#C8A978",
      background: "#355676",
      color: "#E6D5B8",
    });

    if (result.isConfirmed) {
      await logout();
      Swal.fire({
        title: "Logged out!",
        text: "You have been successfully logged out.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
        
      background: "#355676",
      color: "#E6D5B8",
      });
      navigate("/");
    }
  } catch (error) {
    Swal.fire({
      title: "Error!",
      text: `Something went wrong while logging out." || ${error}`,
      icon: "error",
      confirmButtonText: "OK",
    });
  }
};


  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' , id :'about'},
    { href: '/features', label: 'Features' , id: 'features' },
    { href: '/contact', label: 'Contact',  id: 'contact'},
    { href: '/faq', label: 'FAQ',id:'faq' },
    
  ];
  
  return (
    <nav className="bg-[#1c3144] shadow-md sticky top-0 z-50 transition-all duration-300 "  id="sidebar-nav">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Brand Name */}
          <div className="flex-shrink-0">
            <img className='h-16 w-20' src={logo2}alt="" />
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                id={link.id}
                to={link.href}
                className="text-[#E6D5B8] hover:text-[#C8A978] px-3 py-2 rounded-md text-[18px] font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
            {isAuthenticated && user?.role && (
    <Link
      to={
        user.role === 'admin'
          ? '/admin'
          : user.role === 'agent'
          ? '/agent'
          : '/user'
      }
      className="text-[#E6D5B8] hover:text-[#C8A978] px-3 py-2 rounded-md text-[18px] font-medium transition-colors"
    id="dashboard">
      Dashboard
    </Link>
  )}
          </div>
 
          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <span className="text-[#E6D5B8] font-medium text-[18px]">Welcome, {user?.name ? user.name.split(" ")[0] : "User"}</span>
                <button
                  onClick={handleLogout}
                  className="bg-[#355676] text-[#E6D5B8] px-4 py-2 rounded-md text-[18px] font-medium hover:text-[#C8A978] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#C8A978] transition-all"
                id="logout">
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
                  className="bg-[#355676] text-[#E6D5B8] px-4 py-2 rounded-md  font-medium hover:text-[#C8A978] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#C8A978] transition-all"
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
{isAuthenticated && user?.role && (
    <Link
      to={
        user.role === 'admin'
          ? '/admin'
          : user.role === 'agent'
          ? '/agent'
          : '/user'
      }
      onClick={() => setIsMenuOpen(false)}
      className="text-[#E6D5B8] hover:bg-[#1c3144] hover:text-[#C8A978] block px-3 py-2 rounded-md text-base font-medium transition-colors"
    >
      Dashboard
    </Link>
  )}
          {/* Mobile Auth Buttons */}
          <div className="pt-4 pb-3 border-t border-[#1c3144]">
            {isAuthenticated ? (
              <div className="px-5 flex items-center justify-between">
                <span className="font-medium  text-[#E6D5B8]">Hello, {user?.name || 'User'}</span>
                <button
                  onClick={handleLogout}
                  className="bg-[#355676] text-[#E6D5B8] px-3 py-1.5 rounded-md text-sm font-medium hover:text-[#C8A978] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#C8A978] transition-all"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="px-2 space-y-2">
                 <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full text-center bg-[#355676] text-[#E6D5B8] hover:text-[#C8A978] px-4 py-2 rounded-md text-base font-medium hover:bg-[#1c3144] transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full text-center bg-[#355676] text-[#E6D5B8] hover:text-[#C8A978] px-4 py-2 rounded-md text-base font-medium hover:bg-[#1c3144]  transition-colors"
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