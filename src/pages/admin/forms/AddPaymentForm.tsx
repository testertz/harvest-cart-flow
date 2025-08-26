import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import AdminLayout from '@/components/admin/AdminLayout';

const AddPaymentForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    orderId: '',
    customer: '',
    amount: '',
    method: '',
    status: '',
    transactionId: '',
    reference: '',
    description: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // Basic validation
    if (!formData.orderId || !formData.customer || !formData.amount) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Log the form data (in real app, this would be an API call)
    console.log('Payment data:', formData);
    
    toast.success('Payment record created successfully');
    navigate('/admin/payments');
  };

  const handleCancel = () => {
    navigate('/admin/payments');
  };

  return (
    <AdminLayout 
      title="Add Payment"
      subtitle="Create a new payment record in the system"
    >
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Payment Information</CardTitle>
          <CardDescription>
            Enter the payment details below
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="orderId">Order ID *</Label>
              <Input
                id="orderId"
                value={formData.orderId}
                onChange={(e) => handleInputChange('orderId', e.target.value)}
                placeholder="Enter order ID"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="customer">Customer Name *</Label>
              <Input
                id="customer"
                value={formData.customer}
                onChange={(e) => handleInputChange('customer', e.target.value)}
                placeholder="Enter customer name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="amount">Amount (TZS) *</Label>
              <Input
                id="amount"
                type="number"
                value={formData.amount}
                onChange={(e) => handleInputChange('amount', e.target.value)}
                placeholder="Enter payment amount"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="method">Payment Method</Label>
              <Select onValueChange={(value) => handleInputChange('method', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="credit_card">Credit Card</SelectItem>
                  <SelectItem value="mobile_money">Mobile Money</SelectItem>
                  <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                  <SelectItem value="cash">Cash</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select onValueChange={(value) => handleInputChange('status', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                  <SelectItem value="refunded">Refunded</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="transactionId">Transaction ID</Label>
              <Input
                id="transactionId"
                value={formData.transactionId}
                onChange={(e) => handleInputChange('transactionId', e.target.value)}
                placeholder="Enter transaction ID"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="reference">Reference</Label>
              <Input
                id="reference"
                value={formData.reference}
                onChange={(e) => handleInputChange('reference', e.target.value)}
                placeholder="Enter payment reference"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Payment description or notes"
              rows={3}
            />
          </div>
          
          <div className="flex justify-end space-x-4 pt-6">
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              Create Payment
            </Button>
          </div>
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default AddPaymentForm;