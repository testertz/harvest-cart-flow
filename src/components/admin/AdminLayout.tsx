
import { ReactNode } from 'react';
import { useAuthStore } from '@/store/authStore';
import { Navigate } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import { Button } from '@/components/ui/button';
import { Bell, Search, User, LogOut, Menu } from 'lucide-react';
import { useState } from 'react';

interface AdminLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

const AdminLayout = ({ children, title, subtitle }: AdminLayoutProps) => {
  const { user, logout } = useAuthStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={`fixed lg:static inset-y-0 left-0 z-50 w-64 transform ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 transition-transform duration-200 ease-in-out`}>
        <AdminSidebar onClose={() => setSidebarOpen(false)} />
      </div>
      
      <div className="flex-1 flex flex-col lg:ml-0">
        {/* Fixed Top Header */}
        <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4 fixed top-0 right-0 left-0 lg:left-64 z-40">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
              
              <div>
                {title && (
                  <h1 className="text-xl lg:text-2xl font-bold text-gray-900">{title}</h1>
                )}
                {subtitle && (
                  <p className="text-gray-600 mt-1 text-sm lg:text-base">{subtitle}</p>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-2 lg:space-x-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent w-48 lg:w-64"
                />
              </div>
              
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </Button>
              
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 bg-green-500 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500">Administrator</p>
                </div>
                <Button variant="ghost" size="sm" onClick={handleLogout} className="text-red-600 hover:text-red-700">
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content with margin for fixed header */}
        <main className="flex-1 p-4 lg:p-6 overflow-auto mt-16 lg:mt-20 mb-16">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>

        {/* Fixed Footer */}
        <footer className="bg-white border-t border-gray-200 px-4 lg:px-6 py-4 fixed bottom-0 right-0 left-0 lg:left-64 z-40">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0">
            <div className="text-xs lg:text-sm text-gray-600">
              © 2024 AgriMarket Tanzania. All rights reserved.
            </div>
            <div className="flex items-center space-x-4 text-xs lg:text-sm text-gray-600">
              <span className="hidden sm:block">System Status: All operational</span>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default AdminLayout;
