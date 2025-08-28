import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import DashboardLayout from '@/components/DashboardLayout';
import DataTable from '@/components/dashboard/DataTable';
import { ArrowLeft, CreditCard, Download, Receipt } from 'lucide-react';
import { toast } from 'sonner';

const PaymentHistory = () => {
  const navigate = useNavigate();

  const [payments] = useState([
    {
      id: 'PAY-001',
      orderId: 'ORD-001',
      date: '2024-03-15',
      amount: 45000,
      method: 'Credit Card',
      status: 'Completed',
      transactionId: 'TXN-789123456',
      description: 'Organic Tomatoes, Fresh Carrots, Green Beans'
    },
    {
      id: 'PAY-002',
      orderId: 'ORD-002',
      date: '2024-03-10',
      amount: 28000,
      method: 'Mobile Money',
      status: 'Completed',
      transactionId: 'TXN-789123457',
      description: 'Sweet Potatoes, Red Onions'
    },
    {
      id: 'PAY-003',
      orderId: 'ORD-003',
      date: '2024-03-05',
      amount: 67000,
      method: 'Credit Card',
      status: 'Completed',
      transactionId: 'TXN-789123458',
      description: 'Mixed Vegetables Bundle'
    },
    {
      id: 'PAY-004',
      orderId: 'ORD-004',
      date: '2024-02-28',
      amount: 35000,
      method: 'Mobile Money',
      status: 'Completed',
      transactionId: 'TXN-789123459',
      description: 'Fresh Avocados, Bananas'
    },
    {
      id: 'PAY-005',
      orderId: 'ORD-005',
      date: '2024-02-20',
      amount: 52000,
      method: 'Credit Card',
      status: 'Completed',
      transactionId: 'TXN-789123460',
      description: 'Organic Spinach, Kale, Lettuce, Cucumber'
    }
  ]);

  const paymentColumns = [
    { key: 'id', title: 'Payment ID', sortable: true },
    { key: 'orderId', title: 'Order ID', sortable: true },
    { key: 'date', title: 'Date', sortable: true },
    { key: 'description', title: 'Description' },
    { key: 'method', title: 'Method' },
    { key: 'amount', title: 'Amount', sortable: true },
    { key: 'status', title: 'Status' },
    { key: 'actions', title: 'Actions' }
  ];

  const handleDownloadReceipt = (payment: any) => {
    toast.success(`Receipt for ${payment.id} downloaded`);
    console.log('Download receipt:', payment);
  };

  const handleViewTransaction = (payment: any) => {
    toast.info(`Transaction ID: ${payment.transactionId}`);
    console.log('View transaction:', payment);
  };

  const totalPaid = payments.reduce((sum, payment) => sum + payment.amount, 0);

  return (
    <DashboardLayout title="Payment History" subtitle="View all your payment transactions and download receipts">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button 
            variant="outline" 
            onClick={() => navigate('/dashboard')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="shadow-lg border-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Paid</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                TZS {totalPaid.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground mt-1">All time payments</p>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                {payments.length}
              </div>
              <p className="text-xs text-muted-foreground mt-1">Completed payments</p>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Recent Payment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                TZS {payments[0]?.amount.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground mt-1">{payments[0]?.date}</p>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center">
              <CreditCard className="h-5 w-5 mr-2" />
              Payment Transactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable
              title="Payment History"
              data={payments}
              columns={paymentColumns}
              searchPlaceholder="Search payments..."
              onView={handleViewTransaction}
              renderCell={(payment, key) => {
                if (key === 'amount') {
                  return <span className="font-medium">TZS {payment.amount.toLocaleString()}</span>;
                }
                if (key === 'status') {
                  return (
                    <Badge variant={payment.status === 'Completed' ? 'default' : 'secondary'}>
                      {payment.status}
                    </Badge>
                  );
                }
                if (key === 'method') {
                  return (
                    <div className="flex items-center">
                      <CreditCard className="h-4 w-4 mr-2 text-muted-foreground" />
                      {payment.method}
                    </div>
                  );
                }
                if (key === 'actions') {
                  return (
                    <div className="flex space-x-2">
                      <Button
                        onClick={() => handleDownloadReceipt(payment)}
                        size="sm"
                        variant="outline"
                        className="h-8"
                      >
                        <Download className="h-3 w-3 mr-1" />
                        Receipt
                      </Button>
                      <Button
                        onClick={() => handleViewTransaction(payment)}
                        size="sm"
                        variant="outline"
                        className="h-8"
                      >
                        <Receipt className="h-3 w-3 mr-1" />
                        Details
                      </Button>
                    </div>
                  );
                }
                return undefined;
              }}
            />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default PaymentHistory;