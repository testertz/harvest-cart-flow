
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuthStore } from '@/store/authStore';
import DashboardLayout from '@/components/DashboardLayout';
import StatCard from '@/components/dashboard/StatCard';
import DataTable from '@/components/dashboard/DataTable';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { 
  Package, 
  DollarSign, 
  TrendingUp, 
  Users, 
  Star,
  Truck,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

const FarmerDashboard = () => {
  const { user } = useAuthStore();

  const [stats] = useState({
    totalProducts: 24,
    totalSales: 890000,
    totalOrders: 156,
    avgRating: 4.6,
    pendingOrders: 8,
    activeProducts: 20,
    monthlyRevenue: 125000,
    totalCustomers: 89
  });

  const [salesData] = useState([
    { month: 'Jan', sales: 95000, orders: 18 },
    { month: 'Feb', sales: 78000, orders: 15 },
    { month: 'Mar', sales: 125000, orders: 24 },
    { month: 'Apr', sales: 110000, orders: 21 },
    { month: 'May', sales: 145000, orders: 28 },
    { month: 'Jun', sales: 125000, orders: 25 }
  ]);

  const [products] = useState([
    {
      id: 1,
      name: 'Organic Tomatoes',
      category: 'Vegetables',
      price: 8000,
      stock: 150,
      sold: 89,
      rating: 4.5,
      status: 'Active',
      lastUpdated: '2024-03-15'
    },
    {
      id: 2,
      name: 'Fresh Avocados',
      category: 'Fruits',
      price: 12000,
      stock: 75,
      sold: 156,
      rating: 4.8,
      status: 'Active',
      lastUpdated: '2024-03-14'
    },
    {
      id: 3,
      name: 'Sweet Potatoes',
      category: 'Vegetables',
      price: 5000,
      stock: 200,
      sold: 234,
      rating: 4.3,
      status: 'Low Stock',
      lastUpdated: '2024-03-13'
    }
  ]);

  const [orders] = useState([
    {
      id: 'ORD-001',
      customer: 'John Mwangi',
      products: 'Organic Tomatoes x5',
      total: 40000,
      status: 'Pending',
      date: '2024-03-15',
      paymentStatus: 'Paid'
    },
    {
      id: 'ORD-002',
      customer: 'Mary Kilimo',
      products: 'Fresh Avocados x3',
      total: 36000,
      status: 'Processing',
      date: '2024-03-15',
      paymentStatus: 'Paid'
    },
    {
      id: 'ORD-003',
      customer: 'Peter Shamba',
      products: 'Sweet Potatoes x10',
      total: 50000,
      status: 'Shipped',
      date: '2024-03-14',
      paymentStatus: 'Paid'
    }
  ]);

  const productColumns = [
    { key: 'name', title: 'Product', sortable: true },
    { key: 'category', title: 'Category' },
    { key: 'price', title: 'Price', sortable: true },
    { key: 'stock', title: 'Stock', sortable: true },
    { key: 'sold', title: 'Sold', sortable: true },
    { key: 'rating', title: 'Rating', sortable: true },
    { key: 'status', title: 'Status' },
    { key: 'lastUpdated', title: 'Last Updated', sortable: true }
  ];

  const orderColumns = [
    { key: 'id', title: 'Order ID', sortable: true },
    { key: 'customer', title: 'Customer', sortable: true },
    { key: 'products', title: 'Products' },
    { key: 'total', title: 'Total', sortable: true },
    { key: 'paymentStatus', title: 'Payment' },
    { key: 'status', title: 'Status' },
    { key: 'date', title: 'Date', sortable: true }
  ];

  const dashboardStats = [
    {
      title: 'Total Products',
      value: stats.totalProducts,
      icon: Package,
      color: 'from-blue-500 to-blue-600',
      trend: { value: 5, isPositive: true },
      subtitle: 'Active listings'
    },
    {
      title: 'Total Sales',
      value: `TZS ${(stats.totalSales / 1000).toFixed(0)}K`,
      icon: DollarSign,
      color: 'from-green-500 to-green-600',
      trend: { value: 18, isPositive: true },
      subtitle: 'This month'
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders,
      icon: Truck,
      color: 'from-yellow-500 to-yellow-600',
      trend: { value: 12, isPositive: true },
      subtitle: 'All time'
    },
    {
      title: 'Average Rating',
      value: stats.avgRating,
      icon: Star,
      color: 'from-purple-500 to-purple-600',
      trend: { value: 2, isPositive: true },
      subtitle: 'Customer reviews'
    },
    {
      title: 'Pending Orders',
      value: stats.pendingOrders,
      icon: AlertTriangle,
      color: 'from-orange-500 to-orange-600',
      subtitle: 'Need attention'
    },
    {
      title: 'Active Products',
      value: stats.activeProducts,
      icon: CheckCircle,
      color: 'from-teal-500 to-teal-600',
      trend: { value: 8, isPositive: true },
      subtitle: 'Currently selling'
    },
    {
      title: 'Monthly Revenue',
      value: `TZS ${(stats.monthlyRevenue / 1000).toFixed(0)}K`,
      icon: TrendingUp,
      color: 'from-indigo-500 to-indigo-600',
      trend: { value: 15, isPositive: true },
      subtitle: 'This month'
    },
    {
      title: 'Total Customers',
      value: stats.totalCustomers,
      icon: Users,
      color: 'from-pink-500 to-pink-600',
      trend: { value: 10, isPositive: true },
      subtitle: 'Unique buyers'
    }
  ];

  const handleAddProduct = () => {
    console.log('Add new product');
    // Implement add product functionality
  };

  const handleEditProduct = (product: any) => {
    console.log('Edit product:', product);
    // Implement edit product functionality
  };

  const handleDeleteProduct = (product: any) => {
    console.log('Delete product:', product);
    // Implement delete product functionality
  };

  const handleConfirmOrder = (order: any) => {
    console.log('Confirm order:', order);
    // Implement order confirmation functionality
  };

  const handleEditOrder = (order: any) => {
    console.log('Edit order:', order);
    // Implement edit order functionality
  };

  return (
    <DashboardLayout 
      title="Farmer Dashboard"
      subtitle={`Welcome back, ${user?.name}! Manage your farm operations and sales.`}
    >
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {dashboardStats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle>Sales Performance</CardTitle>
            <CardDescription>Monthly sales and orders trend</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip formatter={(value, name) => {
                  if (name === 'sales') return [`TZS ${Number(value).toLocaleString()}`, 'Sales'];
                  return [value, name];
                }} />
                <Bar yAxisId="left" dataKey="sales" fill="#10B981" name="sales" />
                <Line yAxisId="right" type="monotone" dataKey="orders" stroke="#3B82F6" strokeWidth={2} name="orders" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage your farm operations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={handleAddProduct} className="w-full">
              <Package className="h-4 w-4 mr-2" />
              Add New Product
            </Button>
            <Button variant="outline" className="w-full">
              <Truck className="h-4 w-4 mr-2" />
              Update Inventory
            </Button>
            <Button variant="outline" className="w-full">
              <Star className="h-4 w-4 mr-2" />
              View Reviews
            </Button>
            <Button variant="outline" className="w-full">
              <TrendingUp className="h-4 w-4 mr-2" />
              Analytics Report
            </Button>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-fit">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orders.slice(0, 5).map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{order.id}</p>
                        <p className="text-sm text-gray-600">{order.customer}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-green-600">TZS {order.total.toLocaleString()}</p>
                        <p className="text-sm text-gray-500">{order.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle>Low Stock Alert</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {products.filter(p => p.status === 'Low Stock' || p.stock < 100).map((product) => (
                    <div key={product.id} className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-gray-600">Stock: {product.stock}</p>
                      </div>
                      <Button size="sm" variant="outline">
                        Restock
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="products">
          <DataTable
            title="Product Management"
            data={products}
            columns={productColumns}
            searchPlaceholder="Search products..."
            onAdd={handleAddProduct}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
          />
        </TabsContent>

        <TabsContent value="orders">
          <DataTable
            title="Order Management"
            data={orders}
            columns={orderColumns}
            searchPlaceholder="Search orders..."
            onEdit={handleEditOrder}
            renderCell={(item, key) => {
              if (key === 'status' && item.status === 'Pending') {
                return (
                  <div className="flex items-center space-x-2">
                    <span className="text-orange-600">Pending</span>
                    <Button size="sm" onClick={() => handleConfirmOrder(item)}>
                      Confirm
                    </Button>
                  </div>
                );
              }
              return undefined;
            }}
          />
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid grid-cols-1 gap-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
                <CardDescription>Detailed analytics for your farm</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">{stats.avgRating}</p>
                    <p className="text-sm text-gray-600">Average Rating</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">{((stats.totalSales / stats.totalOrders) / 1000).toFixed(1)}K</p>
                    <p className="text-sm text-gray-600">Avg Order Value</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-purple-600">{Math.round((stats.activeProducts / stats.totalProducts) * 100)}%</p>
                    <p className="text-sm text-gray-600">Product Activity</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default FarmerDashboard;
