
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import DataTable from '@/components/dashboard/DataTable';
import { Button } from '@/components/ui/button';
import { Truck, Package, Download, Filter, MapPin, Plus } from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';
import { toast } from 'sonner';

const AdminShipping = () => {
  const navigate = useNavigate();
  const [shipments, setShipments] = useState([
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
    navigate('/admin/shipping/add');
  };

  const handleEditShipment = (shipment: any) => {
    navigate(`/admin/shipping/edit/${shipment.id}`);
  };

  const handleDeleteShipment = (shipment: any) => {
    setShipments(shipments.filter(s => s.id !== shipment.id));
    toast.success('Shipment deleted successfully');
  };

  const handleTrackShipment = (shipment: any) => {
    toast.info(`Tracking shipment ${shipment.trackingNumber}`);
  };

  const handleUpdateStatus = (shipment: any, newStatus: string) => {
    setShipments(shipments.map(s => 
      s.id === shipment.id ? { ...s, status: newStatus } : s
    ));
    toast.success(`Shipment status updated to ${newStatus}`);
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
          <Plus className="h-4 w-4" />
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
        onDelete={handleDeleteShipment}
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
