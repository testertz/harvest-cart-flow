
import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import DataTable from '@/components/dashboard/DataTable';
import { Button } from '@/components/ui/button';
import { CreditCard, Download, Filter, RefreshCw } from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';

const AdminPayments = () => {
  const [payments] = useState([
    {
      id: 'PAY-001',
      orderId: 'ORD-001',
      customer: 'John Mwangi',
      amount: 45000,
      method: 'Credit Card',
      status: 'Completed',
      date: '2024-03-15',
      transactionId: 'TXN-1234567890'
    },
    {
      id: 'PAY-002',
      orderId: 'ORD-002',
      customer: 'Mary Kilimo',
      amount: 28000,
      method: 'Mobile Money',
      status: 'Pending',
      date: '2024-03-15',
      transactionId: 'TXN-0987654321'
    }
  ]);

  const paymentStats = [
    {
      title: 'Total Revenue',
      value: 'TZS 45.6M',
      icon: CreditCard,
      color: 'from-green-500 to-green-600',
      trend: { value: 15, isPositive: true },
      subtitle: 'This month'
    },
    {
      title: 'Completed Payments',
      value: '1,389',
      icon: CreditCard,
      color: 'from-blue-500 to-blue-600',
      trend: { value: 8, isPositive: true },
      subtitle: 'Successful transactions'
    },
    {
      title: 'Pending Payments',
      value: '23',
      icon: CreditCard,
      color: 'from-orange-500 to-orange-600',
      subtitle: 'Awaiting confirmation'
    },
    {
      title: 'Failed Payments',
      value: '12',
      icon: CreditCard,
      color: 'from-red-500 to-red-600',
      subtitle: 'Need attention'
    }
  ];

  const paymentColumns = [
    { key: 'id', title: 'Payment ID', sortable: true },
    { key: 'orderId', title: 'Order ID', sortable: true },
    { key: 'customer', title: 'Customer', sortable: true },
    { key: 'amount', title: 'Amount', sortable: true },
    { key: 'method', title: 'Payment Method' },
    { key: 'status', title: 'Status' },
    { key: 'transactionId', title: 'Transaction ID' },
    { key: 'date', title: 'Date', sortable: true }
  ];

  const handleRefreshPayments = () => {
    console.log('Refresh payments');
  };

  const handleEditPayment = (payment: any) => {
    console.log('Edit payment:', payment);
  };

  const handleConfirmPayment = (payment: any) => {
    console.log('Confirm payment:', payment);
  };

  return (
    <AdminLayout 
      title="Payment Management"
      subtitle="Monitor all payment transactions and financial activities"
    >
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {paymentStats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-8">
        <Button onClick={handleRefreshPayments} className="flex items-center space-x-2">
          <RefreshCw className="h-4 w-4" />
          <span>Refresh Status</span>
        </Button>
        <Button variant="outline" className="flex items-center space-x-2">
          <Filter className="h-4 w-4" />
          <span>Filter Payments</span>
        </Button>
        <Button variant="outline" className="flex items-center space-x-2">
          <Download className="h-4 w-4" />
          <span>Export Payments</span>
        </Button>
        <Button variant="outline" className="flex items-center space-x-2">
          <CreditCard className="h-4 w-4" />
          <span>Payment Settings</span>
        </Button>
      </div>

      {/* Payments Table */}
      <DataTable
        title="All Payments"
        data={payments}
        columns={paymentColumns}
        searchPlaceholder="Search payments by ID, customer, or transaction..."
        onEdit={handleEditPayment}
        onConfirm={handleConfirmPayment}
      />
    </AdminLayout>
  );
};

export default AdminPayments;
