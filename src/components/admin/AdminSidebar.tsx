
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  Users, 
  Package, 
  ShoppingBag, 
  UserCheck, 
  CreditCard,
  Truck,
  Star,
  FileText,
  BarChart3,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react';

interface AdminSidebarProps {
  onClose?: () => void;
}

const AdminSidebar = ({ onClose }: AdminSidebarProps) => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
    { icon: Users, label: 'Users', path: '/admin/users' },
    { icon: Package, label: 'Products', path: '/admin/products' },
    { icon: ShoppingBag, label: 'Orders', path: '/admin/orders' },
    { icon: UserCheck, label: 'Farmers', path: '/admin/farmers' },
    { icon: CreditCard, label: 'Payments', path: '/admin/payments' },
    { icon: Truck, label: 'Shipping', path: '/admin/shipping' },
    { icon: Star, label: 'Reviews', path: '/admin/reviews' },
    { icon: FileText, label: 'Reports', path: '/admin/reports' },
    { icon: BarChart3, label: 'Analytics', path: '/admin/analytics' },
    { icon: Settings, label: 'Settings', path: '/admin/settings' },
    { icon: HelpCircle, label: 'Support', path: '/admin/support' }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className={`bg-white border-r border-gray-200 h-full flex flex-col transition-all duration-300 ${
      collapsed ? 'w-16' : 'w-64'
    }`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">AG</span>
            </div>
            <span className="font-bold text-gray-900 text-lg">AgriMarket</span>
          </div>
        )}
        
        {/* Mobile Close Button */}
        <Button
          variant="ghost"
          size="sm"
          className="lg:hidden"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
        
        {/* Desktop Collapse Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={`flex items-center space-x-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors duration-200 ${
                isActive(item.path)
                  ? 'bg-green-100 text-green-700 border-r-2 border-green-500'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <Icon className={`h-5 w-5 flex-shrink-0 ${
                isActive(item.path) ? 'text-green-600' : 'text-gray-400'
              }`} />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="p-4 border-t border-gray-200">
          <div className="text-xs text-gray-500 text-center">
            <p>Admin Panel v2.0</p>
            <p className="mt-1">© 2024 AgriMarket</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSidebar;
