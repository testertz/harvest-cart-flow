
import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Download, Calendar, TrendingUp } from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const AdminReports = () => {
  const [salesData] = useState([
    { month: 'Jan', sales: 2400000, orders: 180 },
    { month: 'Feb', sales: 1800000, orders: 145 },
    { month: 'Mar', sales: 3200000, orders: 220 },
    { month: 'Apr', sales: 2800000, orders: 195 },
    { month: 'May', sales: 3600000, orders: 245 },
    { month: 'Jun', sales: 4200000, orders: 280 }
  ]);

  const reportStats = [
    {
      title: 'Total Reports',
      value: '156',
      icon: FileText,
      color: 'from-blue-500 to-blue-600',
      subtitle: 'Generated reports'
    },
    {
      title: 'Monthly Growth',
      value: '+15%',
      icon: TrendingUp,
      color: 'from-green-500 to-green-600',
      trend: { value: 15, isPositive: true },
      subtitle: 'Revenue growth'
    },
    {
      title: 'Active Reports',
      value: '23',
      icon: FileText,
      color: 'from-purple-500 to-purple-600',
      subtitle: 'Scheduled reports'
    },
    {
      title: 'Downloads',
      value: '1,234',
      icon: Download,
      color: 'from-orange-500 to-orange-600',
      trend: { value: 8, isPositive: true },
      subtitle: 'Report downloads'
    }
  ];

  const handleGenerateReport = () => {
    console.log('Generate new report');
  };

  const handleScheduleReport = () => {
    console.log('Schedule report');
  };

  const handleDownloadReport = () => {
    console.log('Download report');
  };

  return (
    <AdminLayout 
      title="Reports & Analytics"
      subtitle="Generate and manage business reports and analytics"
    >
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {reportStats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-8">
        <Button onClick={handleGenerateReport} className="flex items-center space-x-2">
          <FileText className="h-4 w-4" />
          <span>Generate Report</span>
        </Button>
        <Button variant="outline" onClick={handleScheduleReport} className="flex items-center space-x-2">
          <Calendar className="h-4 w-4" />
          <span>Schedule Report</span>
        </Button>
        <Button variant="outline" onClick={handleDownloadReport} className="flex items-center space-x-2">
          <Download className="h-4 w-4" />
          <span>Download Reports</span>
        </Button>
        <Button variant="outline" className="flex items-center space-x-2">
          <TrendingUp className="h-4 w-4" />
          <span>View Analytics</span>
        </Button>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle>Sales Performance</CardTitle>
            <CardDescription>Monthly sales trends</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`TZS ${Number(value).toLocaleString()}`, 'Sales']} />
                <Bar dataKey="sales" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle>Order Trends</CardTitle>
            <CardDescription>Monthly order volume</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="orders" stroke="#3B82F6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Report Types */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="h-5 w-5 mr-2 text-blue-600" />
              Sales Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Comprehensive sales analysis and performance metrics</p>
            <Button className="w-full">Generate Sales Report</Button>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="h-5 w-5 mr-2 text-green-600" />
              User Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">User activity, registration, and engagement metrics</p>
            <Button className="w-full">Generate User Report</Button>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="h-5 w-5 mr-2 text-purple-600" />
              Financial Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Revenue, payments, and financial performance analysis</p>
            <Button className="w-full">Generate Financial Report</Button>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminReports;
