import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import DashboardLayout from '@/components/DashboardLayout';
import { ArrowLeft, MapPin, Home, Building } from 'lucide-react';
import { toast } from 'sonner';

const EditAddress = () => {
  const navigate = useNavigate();
  const { addressId } = useParams();
  const isNew = addressId === 'new';

  const [formData, setFormData] = useState({
    type: 'Home',
    fullName: '',
    phoneNumber: '',
    addressLine1: '',
    addressLine2: '',
    city: 'Dar es Salaam',
    region: 'Dar es Salaam',
    postalCode: '',
    isDefault: false,
    deliveryInstructions: ''
  });

  useEffect(() => {
    if (!isNew) {
      // Mock address data - in real app, fetch from API
      const mockAddresses = [
        {
          id: 1,
          type: 'Home',
          fullName: 'John Doe',
          phoneNumber: '+255 123 456 789',
          addressLine1: '123 Uhuru Street',
          addressLine2: 'Kinondoni',
          city: 'Dar es Salaam',
          region: 'Dar es Salaam',
          postalCode: '12345',
          isDefault: true,
          deliveryInstructions: 'Ring the bell twice'
        },
        {
          id: 2,
          type: 'Work',
          fullName: 'John Doe',
          phoneNumber: '+255 123 456 789',
          addressLine1: '456 Sokoine Drive',
          addressLine2: 'Ilala',
          city: 'Dar es Salaam',
          region: 'Dar es Salaam',
          postalCode: '54321',
          isDefault: false,
          deliveryInstructions: 'Leave with security'
        }
      ];

      const address = mockAddresses.find(a => a.id === parseInt(addressId || ''));
      if (address) {
        setFormData(address);
      }
    }
  }, [addressId, isNew]);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isNew) {
      toast.success('New address added successfully');
    } else {
      toast.success('Address updated successfully');
    }
    
    navigate('/dashboard');
  };

  const regions = [
    'Arusha', 'Dar es Salaam', 'Dodoma', 'Geita', 'Iringa', 'Kagera',
    'Katavi', 'Kigoma', 'Kilimanjaro', 'Lindi', 'Manyara', 'Mara',
    'Mbeya', 'Morogoro', 'Mtwara', 'Mwanza', 'Njombe', 'Pemba North',
    'Pemba South', 'Pwani', 'Rukwa', 'Ruvuma', 'Shinyanga', 'Simiyu',
    'Singida', 'Songwe', 'Tabora', 'Tanga', 'Unguja North', 'Unguja South'
  ];

  return (
    <DashboardLayout 
      title={isNew ? "Add New Address" : "Edit Address"} 
      subtitle="Manage your delivery address information"
    >
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Button 
            variant="outline" 
            onClick={() => navigate('/dashboard')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>

        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="h-5 w-5 mr-2" />
              {isNew ? 'New Delivery Address' : 'Edit Delivery Address'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Address Type */}
              <div className="space-y-2">
                <Label>Address Type</Label>
                <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select address type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Home">
                      <div className="flex items-center">
                        <Home className="h-4 w-4 mr-2" />
                        Home
                      </div>
                    </SelectItem>
                    <SelectItem value="Work">
                      <div className="flex items-center">
                        <Building className="h-4 w-4 mr-2" />
                        Work
                      </div>
                    </SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    placeholder="Enter full name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone Number *</Label>
                  <Input
                    id="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                    placeholder="+255 xxx xxx xxx"
                    required
                  />
                </div>
              </div>

              {/* Address Information */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="addressLine1">Street Address *</Label>
                  <Input
                    id="addressLine1"
                    value={formData.addressLine1}
                    onChange={(e) => handleInputChange('addressLine1', e.target.value)}
                    placeholder="House number and street name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="addressLine2">Area/District</Label>
                  <Input
                    id="addressLine2"
                    value={formData.addressLine2}
                    onChange={(e) => handleInputChange('addressLine2', e.target.value)}
                    placeholder="Area or district name"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      placeholder="City name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Region *</Label>
                    <Select value={formData.region} onValueChange={(value) => handleInputChange('region', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select region" />
                      </SelectTrigger>
                      <SelectContent>
                        {regions.map((region) => (
                          <SelectItem key={region} value={region}>
                            {region}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="postalCode">Postal Code</Label>
                  <Input
                    id="postalCode"
                    value={formData.postalCode}
                    onChange={(e) => handleInputChange('postalCode', e.target.value)}
                    placeholder="Enter postal code (optional)"
                  />
                </div>
              </div>

              {/* Delivery Instructions */}
              <div className="space-y-2">
                <Label htmlFor="deliveryInstructions">Delivery Instructions</Label>
                <Textarea
                  id="deliveryInstructions"
                  value={formData.deliveryInstructions}
                  onChange={(e) => handleInputChange('deliveryInstructions', e.target.value)}
                  placeholder="Any special instructions for delivery (e.g., gate code, landmark)"
                  rows={3}
                />
              </div>

              {/* Default Address Switch */}
              <div className="flex items-center space-x-2">
                <Switch
                  id="isDefault"
                  checked={formData.isDefault}
                  onCheckedChange={(checked) => handleInputChange('isDefault', checked)}
                />
                <Label htmlFor="isDefault">Set as default address</Label>
              </div>

              {/* Form Actions */}
              <div className="flex gap-4">
                <Button type="submit" className="flex-1">
                  {isNew ? 'Add Address' : 'Save Changes'}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate('/dashboard')}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default EditAddress;