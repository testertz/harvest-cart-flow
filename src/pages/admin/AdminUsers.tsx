
import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import DataTable from '@/components/dashboard/DataTable';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, UserPlus, UserCheck, UserX, Download, Filter } from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';

const AdminUsers = () => {
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
      totalSpent: 340000,
      lastLogin: '2024-03-15'
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
      totalSpent: 250000,
      lastLogin: '2024-03-14'
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
      totalSpent: 89000,
      lastLogin: '2024-03-10'
    }
  ]);

  const userStats = [
    {
      title: 'Total Users',
      value: '1,247',
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      trend: { value: 15, isPositive: true },
      subtitle: 'Registered users'
    },
    {
      title: 'Active Users',
      value: '1,089',
      icon: UserCheck,
      color: 'from-green-500 to-green-600',
      trend: { value: 8, isPositive: true },
      subtitle: 'Last 30 days'
    },
    {
      title: 'New Users',
      value: '156',
      icon: UserPlus,
      color: 'from-purple-500 to-purple-600',
      trend: { value: 22, isPositive: true },
      subtitle: 'This month'
    },
    {
      title: 'Inactive Users',
      value: '158',
      icon: UserX,
      color: 'from-orange-500 to-orange-600',
      subtitle: 'Need attention'
    }
  ];

  const userColumns = [
    { key: 'name', title: 'Name', sortable: true },
    { key: 'email', title: 'Email' },
    { key: 'role', title: 'Role' },
    { key: 'location', title: 'Location' },
    { key: 'orders', title: 'Orders', sortable: true },
    { key: 'totalSpent', title: 'Total Spent', sortable: true },
    { key: 'status', title: 'Status' },
    { key: 'joinDate', title: 'Join Date', sortable: true },
    { key: 'lastLogin', title: 'Last Login', sortable: true }
  ];

  const handleAddUser = () => {
    console.log('Add new user');
  };

  const handleEditUser = (user: any) => {
    console.log('Edit user:', user);
  };

  const handleDeleteUser = (user: any) => {
    console.log('Delete user:', user);
  };

  const handleVerifyUser = (user: any) => {
    console.log('Verify user:', user);
  };

  return (
    <AdminLayout 
      title="User Management"
      subtitle="Manage all platform users, their roles, and activities"
    >
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {userStats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-8">
        <Button onClick={handleAddUser} className="flex items-center space-x-2">
          <UserPlus className="h-4 w-4" />
          <span>Add User</span>
        </Button>
        <Button variant="outline" className="flex items-center space-x-2">
          <Filter className="h-4 w-4" />
          <span>Filter Users</span>
        </Button>
        <Button variant="outline" className="flex items-center space-x-2">
          <Download className="h-4 w-4" />
          <span>Export Users</span>
        </Button>
        <Button variant="outline" className="flex items-center space-x-2">
          <UserCheck className="h-4 w-4" />
          <span>Bulk Actions</span>
        </Button>
      </div>

      {/* Users Table */}
      <DataTable
        title="All Users"
        data={users}
        columns={userColumns}
        searchPlaceholder="Search users by name, email, or location..."
        onAdd={handleAddUser}
        onEdit={handleEditUser}
        onDelete={handleDeleteUser}
        onVerify={handleVerifyUser}
      />
    </AdminLayout>
  );
};

export default AdminUsers;
