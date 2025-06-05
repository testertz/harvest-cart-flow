import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import DataTable from '@/components/dashboard/DataTable';
import { Button } from '@/components/ui/button';
import { Package, PackagePlus, Eye, Download, Filter } from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';

const AdminProducts = () => {
  const navigate = useNavigate();
  
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
      farmer: 'John Farm Co.',
      dateAdded: '2024-01-15'
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
      farmer: 'Green Valley',
      dateAdded: '2024-02-10'
    },
    {
      id: 3,
      name: 'Sweet Potatoes',
      category: 'Vegetables',
      price: 5000,
      stock: 5,
      sold: 234,
      rating: 4.3,
      status: 'Low Stock',
      farmer: 'Farm Fresh Ltd',
      dateAdded: '2024-03-01'
    }
  ]);

  const productStats = [
    {
      title: 'Total Products',
      value: '345',
      icon: Package,
      color: 'from-blue-500 to-blue-600',
      trend: { value: 12, isPositive: true },
      subtitle: 'Active products'
    },
    {
      title: 'Low Stock',
      value: '23',
      icon: Package,
      color: 'from-orange-500 to-orange-600',
      subtitle: 'Need restocking'
    },
    {
      title: 'Out of Stock',
      value: '8',
      icon: Package,
      color: 'from-red-500 to-red-600',
      subtitle: 'Unavailable'
    },
    {
      title: 'New Products',
      value: '45',
      icon: PackagePlus,
      color: 'from-green-500 to-green-600',
      trend: { value: 18, isPositive: true },
      subtitle: 'This month'
    }
  ];

  const productColumns = [
    { key: 'name', title: 'Product', sortable: true },
    { key: 'category', title: 'Category' },
    { key: 'price', title: 'Price', sortable: true },
    { key: 'stock', title: 'Stock', sortable: true },
    { key: 'sold', title: 'Sold', sortable: true },
    { key: 'rating', title: 'Rating', sortable: true },
    { key: 'farmer', title: 'Farmer' },
    { key: 'status', title: 'Status' },
    { key: 'dateAdded', title: 'Date Added', sortable: true }
  ];

  const handleAddProduct = () => {
    navigate('/admin/products/add');
  };

  const handleEditProduct = (product: any) => {
    navigate(`/admin/products/edit/${product.id}`);
  };

  const handleDeleteProduct = (product: any) => {
    console.log('Delete product:', product);
  };

  const handleViewProduct = (product: any) => {
    console.log('View product:', product);
  };

  return (
    <AdminLayout 
      title="Product Management"
      subtitle="Manage all products, inventory, and pricing"
    >
      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
        {productStats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4 mb-6 lg:mb-8">
        <Button onClick={handleAddProduct} className="flex items-center justify-center space-x-2 text-sm">
          <PackagePlus className="h-4 w-4" />
          <span className="hidden sm:inline">Add Product</span>
          <span className="sm:hidden">Add</span>
        </Button>
        <Button variant="outline" className="flex items-center justify-center space-x-2 text-sm">
          <Filter className="h-4 w-4" />
          <span className="hidden sm:inline">Filter Products</span>
          <span className="sm:hidden">Filter</span>
        </Button>
        <Button variant="outline" className="flex items-center justify-center space-x-2 text-sm">
          <Download className="h-4 w-4" />
          <span className="hidden sm:inline">Export Products</span>
          <span className="sm:hidden">Export</span>
        </Button>
        <Button variant="outline" className="flex items-center justify-center space-x-2 text-sm">
          <Eye className="h-4 w-4" />
          <span className="hidden sm:inline">View Analytics</span>
          <span className="sm:hidden">Analytics</span>
        </Button>
      </div>

      {/* Products Table */}
      <DataTable
        title="All Products"
        data={products}
        columns={productColumns}
        searchPlaceholder="Search products by name, category, or farmer..."
        onAdd={handleAddProduct}
        onEdit={handleEditProduct}
        onDelete={handleDeleteProduct}
        renderCell={(item, key) => {
          if (key === 'stock' && item.stock < 10) {
            return <span className="text-red-600 font-semibold">{item.stock}</span>;
          }
          return undefined;
        }}
      />
    </AdminLayout>
  );
};

export default AdminProducts;
