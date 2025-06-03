
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  Users, 
  Package, 
  ShoppingBag, 
  UserCheck, 
  BarChart3, 
  Settings, 
  FileText,
  CreditCard,
  Truck,
  Star,
  HelpCircle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const AdminSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const menuItems = [
    {
      title: 'Dashboard',
      href: '/admin/dashboard',
      icon: LayoutDashboard,
      description: 'Overview & Analytics'
    },
    {
      title: 'Users',
      href: '/admin/users',
      icon: Users,
      description: 'User Management'
    },
    {
      title: 'Products',
      href: '/admin/products',
      icon: Package,
      description: 'Product Catalog'
    },
    {
      title: 'Orders',
      href: '/admin/orders',
      icon: ShoppingBag,
      description: 'Order Management'
    },
    {
      title: 'Farmers',
      href: '/admin/farmers',
      icon: UserCheck,
      description: 'Farmer Management'
    },
    {
      title: 'Payments',
      href: '/admin/payments',
      icon: CreditCard,
      description: 'Payment Processing'
    },
    {
      title: 'Shipping',
      href: '/admin/shipping',
      icon: Truck,
      description: 'Delivery Management'
    },
    {
      title: 'Reviews',
      href: '/admin/reviews',
      icon: Star,
      description: 'Customer Reviews'
    },
    {
      title: 'Reports',
      href: '/admin/reports',
      icon: FileText,
      description: 'Analytics & Reports'
    },
    {
      title: 'Analytics',
      href: '/admin/analytics',
      icon: BarChart3,
      description: 'Business Intelligence'
    },
    {
      title: 'Settings',
      href: '/admin/settings',
      icon: Settings,
      description: 'System Configuration'
    },
    {
      title: 'Support',
      href: '/admin/support',
      icon: HelpCircle,
      description: 'Help & Support'
    }
  ];

  const isActive = (href: string) => {
    return location.pathname === href;
  };

  return (
    <div className={cn(
      'bg-white border-r border-gray-200 flex flex-col transition-all duration-300 shadow-lg',
      collapsed ? 'w-16' : 'w-64'
    )}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        {!collapsed && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Admin Panel</h2>
            <p className="text-sm text-gray-500">System Management</p>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="h-8 w-8 p-0"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                'flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors duration-200 group',
                active
                  ? 'bg-green-100 text-green-700 border border-green-200'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              )}
            >
              <Icon className={cn(
                'h-5 w-5 flex-shrink-0',
                active ? 'text-green-600' : 'text-gray-500 group-hover:text-gray-700'
              )} />
              
              {!collapsed && (
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{item.title}</p>
                  <p className="text-xs text-gray-500 truncate">{item.description}</p>
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="p-4 border-t border-gray-200">
          <div className="bg-green-50 p-3 rounded-lg">
            <p className="text-sm font-medium text-green-800">System Status</p>
            <p className="text-xs text-green-600">All systems operational</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSidebar;
