import React, { useState } from 'react';
import { Link, useLocation } from 'react-router';

import { 
  HomeIcon, 
  WalletIcon, 
  UsersIcon, 
  SlashIcon, 
  ChartBarIcon, 
  CogIcon,
  ArrowLeftOnRectangleIcon,
  XMarkIcon,
  Bars3Icon
} from '@heroicons/react/24/outline';
import type { User } from '../types';

interface SidebarProps {
  user: User;
}

const Sidebar: React.FC<SidebarProps> = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const userMenu = [
    { name: 'Dashboard', path: '/dashboard', icon: HomeIcon },
    { name: 'My Wallet', path: '/wallet', icon: WalletIcon },
    { name: 'Transactions', path: '/transactions', icon: ChartBarIcon },
    { name: 'Send Money', path: '/send-money', icon: SlashIcon },
    { name: 'Profile', path: '/profile', icon: UsersIcon },
    { name: 'Settings', path: '/settings', icon: CogIcon },
  ];

  const agentMenu = [
    { name: 'Dashboard', path: '/agent/dashboard', icon: HomeIcon },
    { name: 'Cash In', path: '/agent/cash-in', icon: SlashIcon },
    { name: 'Cash Out', path: '/agent/cash-out', icon: WalletIcon },
    { name: 'Transactions', path: '/agent/transactions', icon: ChartBarIcon },
    { name: 'Customers', path: '/agent/customers', icon: UsersIcon },
    { name: 'Reports', path: '/agent/reports', icon: ChartBarIcon },
    { name: 'Settings', path: '/agent/settings', icon: CogIcon },
  ];

  const adminMenu = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: HomeIcon },
    { name: 'Users', path: '/admin/users', icon: UsersIcon },
    { name: 'Agents', path: '/admin/agents', icon: UsersIcon },
    { name: 'Wallets', path: '/admin/wallets', icon: WalletIcon },
    { name: 'Transactions', path: '/admin/transactions', icon: ChartBarIcon },
    { name: 'Reports', path: '/admin/reports', icon: ChartBarIcon },
    { name: 'System Settings', path: '/admin/settings', icon: CogIcon },
  ];

  const getMenu = () => {
    switch (user.role) {
      case 'admin':
        return adminMenu;
      case 'agent':
        return agentMenu;
      default:
        return userMenu;
    }
  };

  const menu = getMenu();

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-blue-900 text-gold-500 border border-gold-500/30 shadow-lg"
      >
        <Bars3Icon className="h-6 w-6" />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-blue-900 to-blue-800 border-r border-gold-500/30 shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static lg:z-auto`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-gold-500/20">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gold-500">
                {user.role.charAt(0).toUpperCase() + user.role.slice(1)} Panel
              </h1>
              <button
                onClick={toggleSidebar}
                className="lg:hidden text-gold-500 hover:text-gold-400"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="mt-4">
              <p className="text-gold-300 text-sm">Welcome back,</p>
              <p className="text-white font-semibold truncate">{user.name}</p>
              <p className="text-gold-400 text-xs">{user.phone}</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 overflow-y-auto">
            <ul className="space-y-2">
              {menu.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                        isActive
                          ? 'bg-gold-500/20 text-gold-500 border-l-4 border-gold-500 shadow-lg'
                          : 'text-blue-100 hover:bg-blue-700 hover:text-white hover:border-l-4 hover:border-gold-400/50'
                      }`}
                    >
                      <Icon className="h-5 w-5 mr-3" />
                      <span className="font-medium">{item.name}</span>
                      {isActive && (
                        <div className="ml-auto w-2 h-2 bg-gold-500 rounded-full animate-pulse" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gold-500/20">
            <button
              onClick={() => {
                // Handle logout
              }}
              className="flex items-center w-full px-4 py-3 text-blue-100 hover:bg-blue-700 hover:text-white rounded-lg transition-all duration-200"
            >
              <ArrowLeftOnRectangleIcon className="h-5 w-5 mr-3" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;