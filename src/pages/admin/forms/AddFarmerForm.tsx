
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Save } from 'lucide-react';
import { toast } from 'sonner';

const AddFarmerForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    farmName: '',
    ownerName: '',
    email: '',
    phone: '',
    location: '',
    farmSize: '',
    cropTypes: '',
    description: '',
    status: 'Pending'
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (!formData.farmName || !formData.ownerName || !formData.email || !formData.location) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    console.log('Adding farmer:', formData);
    toast.success('Farmer added successfully!');
    navigate('/admin/farmers');
  };

  const handleCancel = () => {
    navigate('/admin/farmers');
  };

  return (
    <AdminLayout
      title="Add New Farmer"
      subtitle="Register a new farmer account"
    >
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-lg border-0">
          <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardTitle className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" onClick={handleCancel} className="text-white hover:bg-green-700 p-1">
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <span>Farmer Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="farmName">Farm Name *</Label>
                <Input
                  id="farmName"
                  value={formData.farmName}
                  onChange={(e) => handleInputChange('farmName', e.target.value)}
                  placeholder="Enter farm name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ownerName">Owner Name *</Label>
                <Input
                  id="ownerName"
                  value={formData.ownerName}
                  onChange={(e) => handleInputChange('ownerName', e.target.value)}
                  placeholder="Enter owner name"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Enter email address"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="Enter phone number"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="Enter location"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="farmSize">Farm Size (Acres)</Label>
                <Input
                  id="farmSize"
                  type="number"
                  value={formData.farmSize}
                  onChange={(e) => handleInputChange('farmSize', e.target.value)}
                  placeholder="Enter farm size"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cropTypes">Primary Crop Types</Label>
              <Input
                id="cropTypes"
                value={formData.cropTypes}
                onChange={(e) => handleInputChange('cropTypes', e.target.value)}
                placeholder="e.g., Tomatoes, Corn, Rice"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Farm Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Describe the farm and farming practices"
                rows={4}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button onClick={handleSave} className="flex-1 sm:flex-none">
                <Save className="h-4 w-4 mr-2" />
                Save Farmer
              </Button>
              <Button variant="outline" onClick={handleCancel} className="flex-1 sm:flex-none">
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AddFarmerForm;
