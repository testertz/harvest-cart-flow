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

const AddOrderForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    customer: '',
    email: '',
    phone: '',
    items: '',
    total: '',
    status: '',
    paymentMethod: '',
    shippingAddress: '',
    notes: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // Basic validation
    if (!formData.customer || !formData.email || !formData.total) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Log the form data (in real app, this would be an API call)
    console.log('Order data:', formData);
    
    toast.success('Order created successfully');
    navigate('/admin/orders');
  };

  const handleCancel = () => {
    navigate('/admin/orders');
  };

  return (
    <AdminLayout 
      title="Add Order"
      subtitle="Create a new order in the system"
    >
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Order Information</CardTitle>
          <CardDescription>
            Enter the order details below
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Enter email address"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="Enter phone number"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="items">Number of Items</Label>
              <Input
                id="items"
                type="number"
                value={formData.items}
                onChange={(e) => handleInputChange('items', e.target.value)}
                placeholder="Enter number of items"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="total">Total Amount (TZS) *</Label>
              <Input
                id="total"
                type="number"
                value={formData.total}
                onChange={(e) => handleInputChange('total', e.target.value)}
                placeholder="Enter total amount"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select onValueChange={(value) => handleInputChange('status', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="paymentMethod">Payment Method</Label>
              <Select onValueChange={(value) => handleInputChange('paymentMethod', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="credit_card">Credit Card</SelectItem>
                  <SelectItem value="mobile_money">Mobile Money</SelectItem>
                  <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                  <SelectItem value="cash">Cash on Delivery</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="shippingAddress">Shipping Address</Label>
            <Textarea
              id="shippingAddress"
              value={formData.shippingAddress}
              onChange={(e) => handleInputChange('shippingAddress', e.target.value)}
              placeholder="Enter shipping address"
              rows={3}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              placeholder="Additional notes"
              rows={3}
            />
          </div>
          
          <div className="flex justify-end space-x-4 pt-6">
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              Create Order
            </Button>
          </div>
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default AddOrderForm;