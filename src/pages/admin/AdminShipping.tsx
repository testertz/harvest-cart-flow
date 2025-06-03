
import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import DataTable from '@/components/dashboard/DataTable';
import { Button } from '@/components/ui/button';
import { Truck, Package, Download, Filter, MapPin } from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';

const AdminShipping = () => {
  const [shipments] = useState([
    {
      id: 'SHIP-001',
      orderId: 'ORD-001',
      customer: 'John Mwangi',
      destination: 'Dar es Salaam',
      carrier: 'Express Delivery',
      trackingNumber: 'ED123456789',
      status: 'In Transit',
      estimatedDelivery: '2024-03-17',
      shippedDate: '2024-03-15'
    },
    {
      id: 'SHIP-002',
      orderId: 'ORD-002',
      customer: 'Mary Kilimo',
      destination: 'Arusha',
      carrier: 'Standard Post',
      trackingNumber: 'SP987654321',
      status: 'Delivered',
      estimatedDelivery: '2024-03-16',
      shippedDate: '2024-03-14'
    }
  ]);

  const shippingStats = [
    {
      title: 'Total Shipments',
      value: '1,234',
      icon: Truck,
      color: 'from-blue-500 to-blue-600',
      trend: { value: 8, isPositive: true },
      subtitle: 'All time'
    },
    {
      title: 'In Transit',
      value: '89',
      icon: Package,
      color: 'from-orange-500 to-orange-600',
      subtitle: 'Currently shipping'
    },
    {
      title: 'Delivered',
      value: '1,089',
      icon: Package,
      color: 'from-green-500 to-green-600',
      trend: { value: 12, isPositive: true },
      subtitle: 'Successfully delivered'
    },
    {
      title: 'Pending Pickup',
      value: '56',
      icon: MapPin,
      color: 'from-purple-500 to-purple-600',
      subtitle: 'Ready for shipping'
    }
  ];

  const shippingColumns = [
    { key: 'id', title: 'Shipment ID', sortable: true },
    { key: 'orderId', title: 'Order ID', sortable: true },
    { key: 'customer', title: 'Customer', sortable: true },
    { key: 'destination', title: 'Destination' },
    { key: 'carrier', title: 'Carrier' },
    { key: 'trackingNumber', title: 'Tracking Number' },
    { key: 'status', title: 'Status' },
    { key: 'estimatedDelivery', title: 'Est. Delivery', sortable: true },
    { key: 'shippedDate', title: 'Shipped Date', sortable: true }
  ];

  const handleAddShipment = () => {
    console.log('Add new shipment');
  };

  const handleEditShipment = (shipment: any) => {
    console.log('Edit shipment:', shipment);
  };

  const handleTrackShipment = (shipment: any) => {
    console.log('Track shipment:', shipment);
  };

  return (
    <AdminLayout 
      title="Shipping Management"
      subtitle="Manage deliveries, track shipments, and coordinate logistics"
    >
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {shippingStats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-8">
        <Button onClick={handleAddShipment} className="flex items-center space-x-2">
          <Truck className="h-4 w-4" />
          <span>Create Shipment</span>
        </Button>
        <Button variant="outline" className="flex items-center space-x-2">
          <Filter className="h-4 w-4" />
          <span>Filter Shipments</span>
        </Button>
        <Button variant="outline" className="flex items-center space-x-2">
          <Download className="h-4 w-4" />
          <span>Export Shipments</span>
        </Button>
        <Button variant="outline" className="flex items-center space-x-2">
          <MapPin className="h-4 w-4" />
          <span>Track All</span>
        </Button>
      </div>

      {/* Shipments Table */}
      <DataTable
        title="All Shipments"
        data={shipments}
        columns={shippingColumns}
        searchPlaceholder="Search shipments by ID, customer, or tracking number..."
        onAdd={handleAddShipment}
        onEdit={handleEditShipment}
        renderCell={(item, key) => {
          if (key === 'trackingNumber') {
            return (
              <Button variant="link" onClick={() => handleTrackShipment(item)} className="p-0 h-auto">
                {item.trackingNumber}
              </Button>
            );
          }
          return undefined;
        }}
      />
    </AdminLayout>
  );
};

export default AdminShipping;
