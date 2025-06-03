
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuthStore } from '@/store/authStore';
import DashboardLayout from '@/components/DashboardLayout';
import StatCard from '@/components/dashboard/StatCard';
import DataTable from '@/components/dashboard/DataTable';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { 
  Users, 
  ShoppingBag, 
  TrendingUp, 
  DollarSign, 
  Package, 
  UserCheck, 
  AlertTriangle,
  Store,
  Star,
  MessageSquare,
  Truck,
  CreditCard
} from 'lucide-react';

const AdminDashboard = () => {
  const { user } = useAuthStore();

  const [stats] = useState({
    totalUsers: 1247,
    totalOrders: 856,
    totalRevenue: 15600000,
    activeProducts: 125,
    pendingOrders: 23,
    totalFarmers: 89,
    totalSales: 2450,
    avgOrderValue: 18200
  });

  const [salesData] = useState([
    { month: 'Jan', sales: 2400000, orders: 180, users: 120 },
    { month: 'Feb', sales: 1800000, orders: 145, users: 98 },
    { month: 'Mar', sales: 3200000, orders: 220, users: 156 },
    { month: 'Apr', sales: 2800000, orders: 195, users: 134 },
    { month: 'May', sales: 3600000, orders: 245, users: 178 },
    { month: 'Jun', sales: 4200000, orders: 280, users: 201 }
  ]);

  const [categoryData] = useState([
    { name: 'Vegetables', value: 35, color: '#10B981', sales: 5400000 },
    { name: 'Fruits', value: 28, color: '#F59E0B', sales: 4200000 },
    { name: 'Grains', value: 22, color: '#3B82F6', sales: 3100000 },
    { name: 'Herbs', value: 15, color: '#8B5CF6', sales: 2900000 }
  ]);

  const [recentOrders] = useState([
    {
      id: 'ORD-001',
      customer: 'John Mwangi',
      email: 'john@example.com',
      items: 3,
      total: 45000,
      status: 'Processing',
      date: '2024-03-15',
      paymentMethod: 'Credit Card'
    },
    {
      id: 'ORD-002',
      customer: 'Mary Kilimo',
      email: 'mary@example.com',
      items: 2,
      total: 28000,
      status: 'Shipped',
      date: '2024-03-15',
      paymentMethod: 'Mobile Money'
    },
    {
      id: 'ORD-003',
      customer: 'Peter Shamba',
      email: 'peter@example.com',
      items: 5,
      total: 67000,
      status: 'Delivered',
      date: '2024-03-14',
      paymentMethod: 'Credit Card'
    }
  ]);

  const [users] = useState([
    {
      id: 1,
      name: 'John Mwangi',
      email: 'john@example.com',
      role: 'User',
      location: 'Dar es Salaam',
      joinDate: '2024-01-15',
      status: 'Active',
      orders: 12,
      totalSpent: 340000
    },
    {
      id: 2,
      name: 'Mary Kilimo',
      email: 'mary@example.com',
      role: 'Farmer',
      location: 'Arusha',
      joinDate: '2024-02-10',
      status: 'Active',
      orders: 8,
      totalSpent: 250000
    },
    {
      id: 3,
      name: 'Peter Shamba',
      email: 'peter@example.com',
      role: 'User',
      location: 'Mbeya',
      joinDate: '2024-03-01',
      status: 'Inactive',
      orders: 3,
      totalSpent: 89000
    }
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
      farmer: 'John Farm Co.'
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
      farmer: 'Green Valley'
    },
    {
      id: 3,
      name: 'Sweet Potatoes',
      category: 'Vegetables',
      price: 5000,
      stock: 200,
      sold: 234,
      rating: 4.3,
      status: 'Active',
      farmer: 'Farm Fresh Ltd'
    }
  ]);

  const [farmers] = useState([
    {
      id: 1,
      name: 'John Farm Co.',
      owner: 'John Mwangi',
      location: 'Arusha',
      products: 12,
      totalSales: 890000,
      rating: 4.6,
      status: 'Verified',
      joinDate: '2023-08-15'
    },
    {
      id: 2,
      name: 'Green Valley',
      owner: 'Mary Kilimo',
      location: 'Mbeya',
      products: 8,
      totalSales: 650000,
      rating: 4.8,
      status: 'Verified',
      joinDate: '2023-09-20'
    }
  ]);

  const orderColumns = [
    { key: 'id', title: 'Order ID', sortable: true },
    { key: 'customer', title: 'Customer', sortable: true },
    { key: 'items', title: 'Items', sortable: true },
    { key: 'total', title: 'Total', sortable: true },
    { key: 'paymentMethod', title: 'Payment' },
    { key: 'status', title: 'Status' },
    { key: 'date', title: 'Date', sortable: true }
  ];

  const userColumns = [
    { key: 'name', title: 'Name', sortable: true },
    { key: 'email', title: 'Email' },
    { key: 'role', title: 'Role' },
    { key: 'location', title: 'Location' },
    { key: 'orders', title: 'Orders', sortable: true },
    { key: 'totalSpent', title: 'Total Spent', sortable: true },
    { key: 'status', title: 'Status' },
    { key: 'joinDate', title: 'Join Date', sortable: true }
  ];

  const productColumns = [
    { key: 'name', title: 'Product', sortable: true },
    { key: 'category', title: 'Category' },
    { key: 'price', title: 'Price', sortable: true },
    { key: 'stock', title: 'Stock', sortable: true },
    { key: 'sold', title: 'Sold', sortable: true },
    { key: 'rating', title: 'Rating', sortable: true },
    { key: 'farmer', title: 'Farmer' },
    { key: 'status', title: 'Status' }
  ];

  const farmerColumns = [
    { key: 'name', title: 'Farm Name', sortable: true },
    { key: 'owner', title: 'Owner' },
    { key: 'location', title: 'Location' },
    { key: 'products', title: 'Products', sortable: true },
    { key: 'totalSales', title: 'Total Sales', sortable: true },
    { key: 'rating', title: 'Rating', sortable: true },
    { key: 'status', title: 'Status' },
    { key: 'joinDate', title: 'Join Date', sortable: true }
  ];

  const dashboardStats = [
    {
      title: 'Total Users',
      value: stats.totalUsers.toLocaleString(),
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      trend: { value: 15, isPositive: true },
      subtitle: 'Active users'
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders.toLocaleString(),
      icon: ShoppingBag,
      color: 'from-green-500 to-green-600',
      trend: { value: 8, isPositive: true },
      subtitle: 'This month'
    },
    {
      title: 'Revenue',
      value: `TZS ${(stats.totalRevenue / 1000000).toFixed(1)}M`,
      icon: DollarSign,
      color: 'from-yellow-500 to-yellow-600',
      trend: { value: 22, isPositive: true },
      subtitle: 'Monthly revenue'
    },
    {
      title: 'Products',
      value: stats.activeProducts,
      icon: Package,
      color: 'from-purple-500 to-purple-600',
      trend: { value: 5, isPositive: true },
      subtitle: 'Active products'
    },
    {
      title: 'Pending Orders',
      value: stats.pendingOrders,
      icon: AlertTriangle,
      color: 'from-orange-500 to-orange-600',
      subtitle: 'Need attention'
    },
    {
      title: 'Farmers',
      value: stats.totalFarmers,
      icon: UserCheck,
      color: 'from-indigo-500 to-indigo-600',
      trend: { value: 12, isPositive: true },
      subtitle: 'Verified farmers'
    },
    {
      title: 'Avg Order Value',
      value: `TZS ${stats.avgOrderValue.toLocaleString()}`,
      icon: TrendingUp,
      color: 'from-teal-500 to-teal-600',
      trend: { value: 6, isPositive: true },
      subtitle: 'Per order'
    },
    {
      title: 'Total Sales',
      value: stats.totalSales.toLocaleString(),
      icon: Store,
      color: 'from-pink-500 to-pink-600',
      trend: { value: 18, isPositive: true },
      subtitle: 'All time'
    }
  ];

  return (
    <DashboardLayout 
      title="Admin Dashboard"
      subtitle={`Welcome back, ${user?.name}! Here's your platform overview.`}
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
            <CardTitle>Sales & Performance Trend</CardTitle>
            <CardDescription>Monthly sales, orders, and user growth</CardDescription>
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
                <Line yAxisId="right" type="monotone" dataKey="users" stroke="#8B5CF6" strokeWidth={2} name="users" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle>Product Categories</CardTitle>
            <CardDescription>Sales distribution by category</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name) => [`${value}%`, name]} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6 lg:w-fit">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="farmers">Farmers</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ShoppingBag className="h-5 w-5 mr-2 text-green-600" />
                  Recent Orders
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.slice(0, 5).map((order) => (
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
                <CardTitle className="flex items-center">
                  <Package className="h-5 w-5 mr-2 text-blue-600" />
                  Top Products
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {products.slice(0, 5).map((product) => (
                    <div key={product.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-green-600">TZS {product.price.toLocaleString()}</p>
                        <p className="text-sm text-gray-500">{product.sold} sold</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <UserCheck className="h-5 w-5 mr-2 text-purple-600" />
                  Top Farmers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {farmers.slice(0, 5).map((farmer) => (
                    <div key={farmer.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{farmer.name}</p>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-600 ml-1">{farmer.rating}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-green-600">TZS {farmer.totalSales.toLocaleString()}</p>
                        <p className="text-sm text-gray-500">{farmer.products} products</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="orders">
          <DataTable
            title="Order Management"
            data={recentOrders}
            columns={orderColumns}
            searchPlaceholder="Search orders..."
            onAdd={() => console.log('Add new order')}
            onEdit={(order) => console.log('Edit order:', order)}
            onDelete={(order) => console.log('Delete order:', order)}
          />
        </TabsContent>

        <TabsContent value="users">
          <DataTable
            title="User Management"
            data={users}
            columns={userColumns}
            searchPlaceholder="Search users..."
            onAdd={() => console.log('Add new user')}
            onEdit={(user) => console.log('Edit user:', user)}
            onDelete={(user) => console.log('Delete user:', user)}
          />
        </TabsContent>

        <TabsContent value="products">
          <DataTable
            title="Product Management"
            data={products}
            columns={productColumns}
            searchPlaceholder="Search products..."
            onAdd={() => console.log('Add new product')}
            onEdit={(product) => console.log('Edit product:', product)}
            onDelete={(product) => console.log('Delete product:', product)}
          />
        </TabsContent>

        <TabsContent value="farmers">
          <DataTable
            title="Farmer Management"
            data={farmers}
            columns={farmerColumns}
            searchPlaceholder="Search farmers..."
            onAdd={() => console.log('Add new farmer')}
            onEdit={(farmer) => console.log('Edit farmer:', farmer)}
            onDelete={(farmer) => console.log('Delete farmer:', farmer)}
          />
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle>Category Performance</CardTitle>
                <CardDescription>Sales breakdown by product category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {categoryData.map((category) => (
                    <div key={category.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-4 h-4 rounded-full" 
                          style={{ backgroundColor: category.color }}
                        />
                        <span className="font-medium">{category.name}</span>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">TZS {category.sales.toLocaleString()}</p>
                        <p className="text-sm text-gray-500">{category.value}% of total</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle>System Health</CardTitle>
                <CardDescription>Platform performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full" />
                      <span>Server Status</span>
                    </div>
                    <span className="text-green-600 font-medium">Online</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-blue-500 rounded-full" />
                      <span>Database</span>
                    </div>
                    <span className="text-blue-600 font-medium">Healthy</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                      <span>Payment Gateway</span>
                    </div>
                    <span className="text-yellow-600 font-medium">Monitoring</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-purple-500 rounded-full" />
                      <span>API Response</span>
                    </div>
                    <span className="text-purple-600 font-medium">145ms</span>
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

export default AdminDashboard;
