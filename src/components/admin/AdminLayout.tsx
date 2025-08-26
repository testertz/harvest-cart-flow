
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
    <div className="min-h-screen bg-background flex">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-30 w-64 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <AdminSidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Header */}
        <header className="bg-card shadow-sm border-b border-border px-4 py-4 lg:px-6 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 min-w-0">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-md text-muted-foreground hover:bg-muted flex-shrink-0"
              >
                <Menu className="h-6 w-6" />
              </button>
              <div className="min-w-0">
                <h1 className="text-xl font-semibold text-foreground truncate">{title}</h1>
                {subtitle && <p className="text-sm text-muted-foreground truncate">{subtitle}</p>}
              </div>
            </div>
            
            <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
              {/* Search */}
              <div className="hidden md:flex items-center space-x-2">
                <Search className="h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="border border-input rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent w-48"
                />
              </div>
              
              {/* User Menu */}
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-primary-foreground text-sm font-medium">
                    {user?.name?.charAt(0) || 'A'}
                  </span>
                </div>
                <div className="hidden sm:block min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{user?.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{user?.role}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg flex-shrink-0"
                  title="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-4 lg:p-6 overflow-auto min-h-0">
          <div className="max-w-full">
            {children}
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-card border-t border-border px-4 py-3 lg:px-6 flex-shrink-0">
          <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground">
            <p>© 2024 AgriMarket. All rights reserved.</p>
            <div className="flex items-center space-x-4 mt-2 sm:mt-0">
              <span className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>System Online</span>
              </span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default AdminLayout;
