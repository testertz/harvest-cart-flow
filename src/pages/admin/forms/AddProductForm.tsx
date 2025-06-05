
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Save, Upload } from 'lucide-react';
import { toast } from 'sonner';

const AddProductForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    description: '',
    farmer: '',
    status: 'Active'
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (!formData.name || !formData.category || !formData.price || !formData.stock) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    console.log('Adding product:', formData);
    toast.success('Product added successfully!');
    navigate('/admin/products');
  };

  const handleCancel = () => {
    navigate('/admin/products');
  };

  return (
    <AdminLayout
      title="Add New Product"
      subtitle="Create a new product listing"
    >
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-lg border-0">
          <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardTitle className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" onClick={handleCancel} className="text-white hover:bg-green-700 p-1">
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <span>Product Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter product name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Vegetables">Vegetables</SelectItem>
                    <SelectItem value="Fruits">Fruits</SelectItem>
                    <SelectItem value="Grains">Grains</SelectItem>
                    <SelectItem value="Dairy">Dairy</SelectItem>
                    <SelectItem value="Meat">Meat</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price (TZS) *</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                  placeholder="Enter price"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stock">Stock Quantity *</Label>
                <Input
                  id="stock"
                  type="number"
                  value={formData.stock}
                  onChange={(e) => handleInputChange('stock', e.target.value)}
                  placeholder="Enter stock quantity"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="farmer">Farmer/Supplier</Label>
              <Select value={formData.farmer} onValueChange={(value) => handleInputChange('farmer', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select farmer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="John Farm Co.">John Farm Co.</SelectItem>
                  <SelectItem value="Green Valley">Green Valley</SelectItem>
                  <SelectItem value="Farm Fresh Ltd">Farm Fresh Ltd</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Enter product description"
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label>Product Images</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-400">PNG, JPG up to 10MB</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button onClick={handleSave} className="flex-1 sm:flex-none">
                <Save className="h-4 w-4 mr-2" />
                Save Product
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

export default AddProductForm;
