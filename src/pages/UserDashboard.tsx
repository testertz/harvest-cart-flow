
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuthStore } from '@/store/authStore';
import { useCartStore } from '@/store/cartStore';
import DashboardLayout from '@/components/DashboardLayout';
import StatCard from '@/components/dashboard/StatCard';
import DataTable from '@/components/dashboard/DataTable';
import { 
  ShoppingBag, 
  Heart, 
  User, 
  Package, 
  TrendingUp, 
  Star,
  CreditCard,
  MapPin,
  Phone,
  Mail,
  Settings,
  Bell,
  Shield
} from 'lucide-react';

const UserDashboard = () => {
  const { user } = useAuthStore();
  const { items } = useCartStore();

  const [orders] = useState([
    {
      id: 'ORD-001',
      date: '2024-03-15',
      items: 3,
      total: 45000,
      status: 'Delivered',
      products: 'Organic Tomatoes, Fresh Carrots, Green Beans'
    },
    {
      id: 'ORD-002',
      date: '2024-03-10',
      items: 2,
      total: 28000,
      status: 'Processing',
      products: 'Sweet Potatoes, Red Onions'
    },
    {
      id: 'ORD-003',
      date: '2024-03-05',
      items: 5,
      total: 67000,
      status: 'Shipped',
      products: 'Mixed Vegetables Bundle'
    },
    {
      id: 'ORD-004',
      date: '2024-02-28',
      items: 2,
      total: 35000,
      status: 'Delivered',
      products: 'Fresh Avocados, Bananas'
    },
    {
      id: 'ORD-005',
      date: '2024-02-20',
      items: 4,
      total: 52000,
      status: 'Delivered',
      products: 'Organic Spinach, Kale, Lettuce, Cucumber'
    }
  ]);

  const [wishlist] = useState([
    { id: 1, name: 'Organic Tomatoes', price: 8000, image: '/placeholder.svg', rating: 4.5 },
    { id: 2, name: 'Fresh Avocados', price: 12000, image: '/placeholder.svg', rating: 4.8 },
    { id: 3, name: 'Sweet Potatoes', price: 5000, image: '/placeholder.svg', rating: 4.3 },
    { id: 4, name: 'Red Bell Peppers', price: 6000, image: '/placeholder.svg', rating: 4.6 },
    { id: 5, name: 'Fresh Mangoes', price: 15000, image: '/placeholder.svg', rating: 4.9 }
  ]);

  const [addresses] = useState([
    {
      id: 1,
      type: 'Home',
      address: '123 Uhuru Street, Kinondoni',
      city: 'Dar es Salaam',
      isDefault: true
    },
    {
      id: 2,
      type: 'Work',
      address: '456 Sokoine Drive, Ilala',
      city: 'Dar es Salaam',
      isDefault: false
    }
  ]);

  const [paymentMethods] = useState([
    {
      id: 1,
      type: 'Credit Card',
      details: '**** **** **** 1234',
      isDefault: true
    },
    {
      id: 2,
      type: 'Mobile Money',
      details: '+255 7** *** 789',
      isDefault: false
    }
  ]);

  const orderColumns = [
    { key: 'id', title: 'Order ID', sortable: true },
    { key: 'date', title: 'Date', sortable: true },
    { key: 'products', title: 'Products' },
    { key: 'items', title: 'Items', sortable: true },
    { key: 'total', title: 'Total', sortable: true },
    { key: 'status', title: 'Status' }
  ];

  const stats = [
    {
      title: 'Total Orders',
      value: orders.length,
      icon: ShoppingBag,
      color: 'from-blue-500 to-blue-600',
      trend: { value: 12, isPositive: true },
      subtitle: 'Last 30 days'
    },
    {
      title: 'Wishlist Items',
      value: wishlist.length,
      icon: Heart,
      color: 'from-red-500 to-red-600',
      trend: { value: 5, isPositive: true },
      subtitle: 'Saved products'
    },
    {
      title: 'Cart Items',
      value: items.length,
      icon: Package,
      color: 'from-green-500 to-green-600',
      subtitle: 'Ready to checkout'
    },
    {
      title: 'Total Spent',
      value: `TZS ${orders.reduce((sum, order) => sum + order.total, 0).toLocaleString()}`,
      icon: TrendingUp,
      color: 'from-purple-500 to-purple-600',
      trend: { value: 8, isPositive: true },
      subtitle: 'All time'
    }
  ];

  return (
    <DashboardLayout 
      title={`Welcome back, ${user?.name}!`}
      subtitle="Manage your orders, wishlist, and account settings"
    >
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6 lg:w-fit">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
          <TabsTrigger value="addresses">Addresses</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ShoppingBag className="h-5 w-5 mr-2 text-blue-600" />
                  Recent Orders
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orders.slice(0, 3).map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{order.id}</p>
                        <p className="text-sm text-gray-600">{order.products}</p>
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
                  <Heart className="h-5 w-5 mr-2 text-red-600" />
                  Wishlist Highlights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {wishlist.slice(0, 3).map((item) => (
                    <div key={item.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-600 ml-1">{item.rating}</span>
                        </div>
                      </div>
                      <p className="font-semibold text-green-600">TZS {item.price.toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="orders">
          <DataTable
            title="Order History"
            data={orders}
            columns={orderColumns}
            searchPlaceholder="Search orders..."
            onEdit={(order) => console.log('Edit order:', order)}
          />
        </TabsContent>

        <TabsContent value="wishlist">
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle>My Wishlist</CardTitle>
              <CardDescription>Products you've saved for later</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlist.map((item) => (
                  <div key={item.id} className="border rounded-xl p-4 hover:shadow-lg transition-shadow bg-white">
                    <img src={item.image} alt={item.name} className="w-full h-40 object-cover rounded-lg mb-4" />
                    <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
                    <div className="flex items-center mb-2">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600 ml-1">{item.rating}</span>
                    </div>
                    <p className="text-green-600 font-bold text-lg mb-4">TZS {item.price.toLocaleString()}</p>
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">Add to Cart</Button>
                      <Button variant="outline" size="sm">Remove</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="addresses">
          <Card className="shadow-lg border-0">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Delivery Addresses</CardTitle>
                  <CardDescription>Manage your delivery locations</CardDescription>
                </div>
                <Button>Add New Address</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {addresses.map((address) => (
                  <div key={address.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{address.type}</h3>
                      {address.isDefault && (
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Default</span>
                      )}
                    </div>
                    <p className="text-gray-600">{address.address}</p>
                    <p className="text-gray-600">{address.city}</p>
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="outline" size="sm">Delete</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments">
          <Card className="shadow-lg border-0">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Payment Methods</CardTitle>
                  <CardDescription>Manage your payment options</CardDescription>
                </div>
                <Button>Add Payment Method</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {paymentMethods.map((method) => (
                  <div key={method.id} className="border rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <CreditCard className="h-8 w-8 text-gray-400" />
                      <div>
                        <p className="font-medium">{method.type}</p>
                        <p className="text-gray-600">{method.details}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {method.isDefault && (
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Default</span>
                      )}
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="outline" size="sm">Remove</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profile">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <User className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-600">Full Name</p>
                      <p className="font-medium">{user?.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-medium">{user?.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-600">Phone</p>
                      <p className="font-medium">+255 123 456 789</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-600">Location</p>
                      <p className="font-medium">Dar es Salaam, Tanzania</p>
                    </div>
                  </div>
                </div>
                <Button className="w-full">Edit Profile</Button>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  Account Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Bell className="h-5 w-5 text-gray-500" />
                    <span>Email Notifications</span>
                  </div>
                  <Button variant="outline" size="sm">Configure</Button>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Shield className="h-5 w-5 text-gray-500" />
                    <span>Privacy Settings</span>
                  </div>
                  <Button variant="outline" size="sm">Manage</Button>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <CreditCard className="h-5 w-5 text-gray-500" />
                    <span>Billing Information</span>
                  </div>
                  <Button variant="outline" size="sm">Update</Button>
                </div>
                <Button variant="destructive" className="w-full">Delete Account</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default UserDashboard;
