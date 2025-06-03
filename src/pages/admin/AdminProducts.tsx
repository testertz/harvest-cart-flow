
import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import DataTable from '@/components/dashboard/DataTable';
import { Button } from '@/components/ui/button';
import { Package, PackagePlus, Eye, Download, Filter } from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';

const AdminProducts = () => {
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
    console.log('Add new product');
  };

  const handleEditProduct = (product: any) => {
    console.log('Edit product:', product);
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {productStats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-8">
        <Button onClick={handleAddProduct} className="flex items-center space-x-2">
          <PackagePlus className="h-4 w-4" />
          <span>Add Product</span>
        </Button>
        <Button variant="outline" className="flex items-center space-x-2">
          <Filter className="h-4 w-4" />
          <span>Filter Products</span>
        </Button>
        <Button variant="outline" className="flex items-center space-x-2">
          <Download className="h-4 w-4" />
          <span>Export Products</span>
        </Button>
        <Button variant="outline" className="flex items-center space-x-2">
          <Eye className="h-4 w-4" />
          <span>View Analytics</span>
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
