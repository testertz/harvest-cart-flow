
import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart3, TrendingUp, Download, Filter } from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const AdminAnalytics = () => {
  const [analyticsData] = useState([
    { month: 'Jan', users: 120, sales: 2400000, orders: 180 },
    { month: 'Feb', users: 98, sales: 1800000, orders: 145 },
    { month: 'Mar', users: 156, sales: 3200000, orders: 220 },
    { month: 'Apr', users: 134, sales: 2800000, orders: 195 },
    { month: 'May', users: 178, sales: 3600000, orders: 245 },
    { month: 'Jun', users: 201, sales: 4200000, orders: 280 }
  ]);

  const categoryData = [
    { name: 'Vegetables', value: 35, color: '#10B981' },
    { name: 'Fruits', value: 28, color: '#F59E0B' },
    { name: 'Grains', value: 22, color: '#3B82F6' },
    { name: 'Herbs', value: 15, color: '#8B5CF6' }
  ];

  const analyticsStats = [
    {
      title: 'Page Views',
      value: '1.2M',
      icon: BarChart3,
      color: 'from-blue-500 to-blue-600',
      trend: { value: 12, isPositive: true },
      subtitle: 'This month'
    },
    {
      title: 'Conversion Rate',
      value: '3.2%',
      icon: TrendingUp,
      color: 'from-green-500 to-green-600',
      trend: { value: 8, isPositive: true },
      subtitle: 'Sales conversion'
    },
    {
      title: 'Bounce Rate',
      value: '24%',
      icon: BarChart3,
      color: 'from-orange-500 to-orange-600',
      trend: { value: 5, isPositive: false },
      subtitle: 'User engagement'
    },
    {
      title: 'Avg. Session',
      value: '4m 32s',
      icon: BarChart3,
      color: 'from-purple-500 to-purple-600',
      trend: { value: 15, isPositive: true },
      subtitle: 'Session duration'
    }
  ];

  return (
    <AdminLayout 
      title="Analytics Dashboard"
      subtitle="Advanced analytics and business intelligence insights"
    >
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {analyticsStats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-8">
        <Button className="flex items-center space-x-2">
          <BarChart3 className="h-4 w-4" />
          <span>Custom Report</span>
        </Button>
        <Button variant="outline" className="flex items-center space-x-2">
          <Filter className="h-4 w-4" />
          <span>Filter Data</span>
        </Button>
        <Button variant="outline" className="flex items-center space-x-2">
          <Download className="h-4 w-4" />
          <span>Export Analytics</span>
        </Button>
        <Button variant="outline" className="flex items-center space-x-2">
          <TrendingUp className="h-4 w-4" />
          <span>Trend Analysis</span>
        </Button>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle>User Growth & Revenue</CardTitle>
            <CardDescription>Monthly user acquisition and revenue trends</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={analyticsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Bar yAxisId="left" dataKey="sales" fill="#10B981" name="Revenue (TZS)" />
                <Line yAxisId="right" type="monotone" dataKey="users" stroke="#3B82F6" strokeWidth={2} name="New Users" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle>Product Category Distribution</CardTitle>
            <CardDescription>Sales breakdown by product category</CardDescription>
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
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
              Traffic Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Organic Search</span>
                <span className="font-semibold">45%</span>
              </div>
              <div className="flex justify-between">
                <span>Direct Traffic</span>
                <span className="font-semibold">28%</span>
              </div>
              <div className="flex justify-between">
                <span>Social Media</span>
                <span className="font-semibold">18%</span>
              </div>
              <div className="flex justify-between">
                <span>Referrals</span>
                <span className="font-semibold">9%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
              Performance Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Site Speed</span>
                <span className="font-semibold text-green-600">1.2s</span>
              </div>
              <div className="flex justify-between">
                <span>Uptime</span>
                <span className="font-semibold text-green-600">99.9%</span>
              </div>
              <div className="flex justify-between">
                <span>Error Rate</span>
                <span className="font-semibold text-orange-600">0.1%</span>
              </div>
              <div className="flex justify-between">
                <span>API Response</span>
                <span className="font-semibold text-green-600">145ms</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-purple-600" />
              User Behavior
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Avg. Pages/Session</span>
                <span className="font-semibold">3.2</span>
              </div>
              <div className="flex justify-between">
                <span>Return Visitors</span>
                <span className="font-semibold">42%</span>
              </div>
              <div className="flex justify-between">
                <span>Mobile Users</span>
                <span className="font-semibold">68%</span>
              </div>
              <div className="flex justify-between">
                <span>Goal Conversions</span>
                <span className="font-semibold">156</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminAnalytics;
