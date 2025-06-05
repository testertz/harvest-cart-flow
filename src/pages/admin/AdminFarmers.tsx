import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import DataTable from '@/components/dashboard/DataTable';
import { Button } from '@/components/ui/button';
import { UserCheck, UserPlus, Download, Filter, CheckCircle } from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';

const AdminFarmers = () => {
  const navigate = useNavigate();
  
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
      joinDate: '2023-08-15',
      email: 'john@johnfarmco.com',
      phone: '+255 123 456 789'
    },
    {
      id: 2,
      name: 'Green Valley',
      owner: 'Mary Kilimo',
      location: 'Mbeya',
      products: 8,
      totalSales: 650000,
      rating: 4.8,
      status: 'Pending',
      joinDate: '2023-09-20',
      email: 'mary@greenvalley.com',
      phone: '+255 987 654 321'
    }
  ]);

  const farmerStats = [
    {
      title: 'Total Farmers',
      value: '189',
      icon: UserCheck,
      color: 'from-blue-500 to-blue-600',
      trend: { value: 12, isPositive: true },
      subtitle: 'Registered farmers'
    },
    {
      title: 'Verified Farmers',
      value: '156',
      icon: CheckCircle,
      color: 'from-green-500 to-green-600',
      trend: { value: 8, isPositive: true },
      subtitle: 'Approved sellers'
    },
    {
      title: 'Pending Verification',
      value: '33',
      icon: UserCheck,
      color: 'from-orange-500 to-orange-600',
      subtitle: 'Awaiting approval'
    },
    {
      title: 'New Applications',
      value: '12',
      icon: UserPlus,
      color: 'from-purple-500 to-purple-600',
      trend: { value: 25, isPositive: true },
      subtitle: 'This month'
    }
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

  const handleAddFarmer = () => {
    navigate('/admin/farmers/add');
  };

  const handleEditFarmer = (farmer: any) => {
    navigate(`/admin/farmers/edit/${farmer.id}`);
  };

  const handleDeleteFarmer = (farmer: any) => {
    console.log('Delete farmer:', farmer);
  };

  const handleVerifyFarmer = (farmer: any) => {
    console.log('Verify farmer:', farmer);
  };

  return (
    <AdminLayout 
      title="Farmer Management"
      subtitle="Manage farmer accounts, verifications, and performance"
    >
      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
        {farmerStats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4 mb-6 lg:mb-8">
        <Button onClick={handleAddFarmer} className="flex items-center justify-center space-x-2 text-sm">
          <UserPlus className="h-4 w-4" />
          <span className="hidden sm:inline">Add Farmer</span>
          <span className="sm:hidden">Add</span>
        </Button>
        <Button variant="outline" className="flex items-center justify-center space-x-2 text-sm">
          <Filter className="h-4 w-4" />
          <span className="hidden sm:inline">Filter Farmers</span>
          <span className="sm:hidden">Filter</span>
        </Button>
        <Button variant="outline" className="flex items-center justify-center space-x-2 text-sm">
          <Download className="h-4 w-4" />
          <span className="hidden sm:inline">Export Farmers</span>
          <span className="sm:hidden">Export</span>
        </Button>
        <Button variant="outline" className="flex items-center justify-center space-x-2 text-sm">
          <CheckCircle className="h-4 w-4" />
          <span className="hidden sm:inline">Bulk Verify</span>
          <span className="sm:hidden">Verify</span>
        </Button>
      </div>

      {/* Farmers Table */}
      <DataTable
        title="All Farmers"
        data={farmers}
        columns={farmerColumns}
        searchPlaceholder="Search farmers by name, owner, or location..."
        onAdd={handleAddFarmer}
        onEdit={handleEditFarmer}
        onDelete={handleDeleteFarmer}
        onVerify={handleVerifyFarmer}
      />
    </AdminLayout>
  );
};

export default AdminFarmers;
