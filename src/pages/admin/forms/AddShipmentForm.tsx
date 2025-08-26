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

const AddShipmentForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    orderId: '',
    customer: '',
    trackingNumber: '',
    status: '',
    carrier: '',
    destination: '',
    estimatedDelivery: '',
    actualDelivery: '',
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
    if (!formData.orderId || !formData.customer || !formData.trackingNumber) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Log the form data (in real app, this would be an API call)
    console.log('Shipment data:', formData);
    
    toast.success('Shipment created successfully');
    navigate('/admin/shipping');
  };

  const handleCancel = () => {
    navigate('/admin/shipping');
  };

  return (
    <AdminLayout 
      title="Add Shipment"
      subtitle="Create a new shipment record in the system"
    >
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Shipment Information</CardTitle>
          <CardDescription>
            Enter the shipment details below
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
              <Label htmlFor="trackingNumber">Tracking Number *</Label>
              <Input
                id="trackingNumber"
                value={formData.trackingNumber}
                onChange={(e) => handleInputChange('trackingNumber', e.target.value)}
                placeholder="Enter tracking number"
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
                  <SelectItem value="in_transit">In Transit</SelectItem>
                  <SelectItem value="out_for_delivery">Out for Delivery</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="returned">Returned</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="carrier">Carrier</Label>
              <Select onValueChange={(value) => handleInputChange('carrier', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select carrier" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dhl">DHL</SelectItem>
                  <SelectItem value="fedex">FedEx</SelectItem>
                  <SelectItem value="ups">UPS</SelectItem>
                  <SelectItem value="postal">Postal Service</SelectItem>
                  <SelectItem value="local">Local Courier</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="destination">Destination</Label>
              <Input
                id="destination"
                value={formData.destination}
                onChange={(e) => handleInputChange('destination', e.target.value)}
                placeholder="Enter destination address"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="estimatedDelivery">Estimated Delivery</Label>
              <Input
                id="estimatedDelivery"
                type="date"
                value={formData.estimatedDelivery}
                onChange={(e) => handleInputChange('estimatedDelivery', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="actualDelivery">Actual Delivery</Label>
              <Input
                id="actualDelivery"
                type="date"
                value={formData.actualDelivery}
                onChange={(e) => handleInputChange('actualDelivery', e.target.value)}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              placeholder="Additional shipping notes"
              rows={3}
            />
          </div>
          
          <div className="flex justify-end space-x-4 pt-6">
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              Create Shipment
            </Button>
          </div>
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default AddShipmentForm;