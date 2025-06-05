
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import DataTable from '@/components/dashboard/DataTable';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Plus, Download, Filter, CheckCircle, Eye } from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';
import { toast } from 'sonner';

const AdminOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([
    {
      id: 'ORD-001',
      customer: 'John Mwangi',
      email: 'john@example.com',
      items: 3,
      total: 45000,
      status: 'Processing',
      date: '2024-03-15',
      paymentMethod: 'Credit Card',
      shippingAddress: 'Dar es Salaam'
    },
    {
      id: 'ORD-002',
      customer: 'Mary Kilimo',
      email: 'mary@example.com',
      items: 2,
      total: 28000,
      status: 'Shipped',
      date: '2024-03-15',
      paymentMethod: 'Mobile Money',
      shippingAddress: 'Arusha'
    },
    {
      id: 'ORD-003',
      customer: 'Peter Shamba',
      email: 'peter@example.com',
      items: 5,
      total: 67000,
      status: 'Delivered',
      date: '2024-03-14',
      paymentMethod: 'Credit Card',
      shippingAddress: 'Mbeya'
    }
  ]);

  const orderStats = [
    {
      title: 'Total Orders',
      value: '1,456',
      icon: ShoppingBag,
      color: 'from-blue-500 to-blue-600',
      trend: { value: 8, isPositive: true },
      subtitle: 'All time'
    },
    {
      title: 'Pending Orders',
      value: '23',
      icon: ShoppingBag,
      color: 'from-orange-500 to-orange-600',
      subtitle: 'Need processing'
    },
    {
      title: 'Completed Orders',
      value: '1,389',
      icon: CheckCircle,
      color: 'from-green-500 to-green-600',
      trend: { value: 12, isPositive: true },
      subtitle: 'Successfully delivered'
    },
    {
      title: 'Revenue',
      value: 'TZS 45.6M',
      icon: ShoppingBag,
      color: 'from-purple-500 to-purple-600',
      trend: { value: 15, isPositive: true },
      subtitle: 'This month'
    }
  ];

  const orderColumns = [
    { key: 'id', title: 'Order ID', sortable: true },
    { key: 'customer', title: 'Customer', sortable: true },
    { key: 'items', title: 'Items', sortable: true },
    { key: 'total', title: 'Total', sortable: true },
    { key: 'paymentMethod', title: 'Payment' },
    { key: 'status', title: 'Status' },
    { key: 'shippingAddress', title: 'Shipping' },
    { key: 'date', title: 'Date', sortable: true }
  ];

  const handleAddOrder = () => {
    navigate('/admin/orders/add');
  };

  const handleEditOrder = (order: any) => {
    navigate(`/admin/orders/edit/${order.id}`);
  };

  const handleDeleteOrder = (order: any) => {
    setOrders(orders.filter(o => o.id !== order.id));
    toast.success('Order deleted successfully');
  };

  const handleViewOrder = (order: any) => {
    navigate(`/admin/orders/view/${order.id}`);
  };

  const handleConfirmOrder = (order: any) => {
    setOrders(orders.map(o => 
      o.id === order.id ? { ...o, status: 'Confirmed' } : o
    ));
    toast.success('Order confirmed successfully');
  };

  return (
    <AdminLayout 
      title="Order Management"
      subtitle="Manage all customer orders and track their status"
    >
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {orderStats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-8">
        <Button onClick={handleAddOrder} className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Create Order</span>
        </Button>
        <Button variant="outline" className="flex items-center space-x-2">
          <Filter className="h-4 w-4" />
          <span>Filter Orders</span>
        </Button>
        <Button variant="outline" className="flex items-center space-x-2">
          <Download className="h-4 w-4" />
          <span>Export Orders</span>
        </Button>
        <Button variant="outline" className="flex items-center space-x-2">
          <CheckCircle className="h-4 w-4" />
          <span>Bulk Actions</span>
        </Button>
      </div>

      {/* Orders Table */}
      <DataTable
        title="All Orders"
        data={orders}
        columns={orderColumns}
        searchPlaceholder="Search orders by ID, customer, or status..."
        onAdd={handleAddOrder}
        onEdit={handleEditOrder}
        onDelete={handleDeleteOrder}
        onView={handleViewOrder}
        onConfirm={handleConfirmOrder}
      />
    </AdminLayout>
  );
};

export default AdminOrders;
