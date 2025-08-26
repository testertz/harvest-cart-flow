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

const AddReviewForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    product: '',
    customer: '',
    rating: '',
    comment: '',
    status: 'Published',
    helpful: '0'
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // Basic validation
    if (!formData.product || !formData.customer || !formData.rating) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Log the form data (in real app, this would be an API call)
    console.log('Review data:', formData);
    
    toast.success('Review created successfully');
    navigate('/admin/reviews');
  };

  const handleCancel = () => {
    navigate('/admin/reviews');
  };

  return (
    <AdminLayout 
      title="Add Review"
      subtitle="Create a new product review in the system"
    >
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Review Information</CardTitle>
          <CardDescription>
            Enter the review details below
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="product">Product Name *</Label>
              <Input
                id="product"
                value={formData.product}
                onChange={(e) => handleInputChange('product', e.target.value)}
                placeholder="Enter product name"
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
              <Label htmlFor="rating">Rating *</Label>
              <Select onValueChange={(value) => handleInputChange('rating', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Star</SelectItem>
                  <SelectItem value="2">2 Stars</SelectItem>
                  <SelectItem value="3">3 Stars</SelectItem>
                  <SelectItem value="4">4 Stars</SelectItem>
                  <SelectItem value="5">5 Stars</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select 
                onValueChange={(value) => handleInputChange('status', value)}
                defaultValue="Published"
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Published">Published</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Hidden">Hidden</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="helpful">Helpful Count</Label>
              <Input
                id="helpful"
                type="number"
                value={formData.helpful}
                onChange={(e) => handleInputChange('helpful', e.target.value)}
                placeholder="Number of helpful votes"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="comment">Review Comment</Label>
            <Textarea
              id="comment"
              value={formData.comment}
              onChange={(e) => handleInputChange('comment', e.target.value)}
              placeholder="Enter review comment"
              rows={4}
            />
          </div>
          
          <div className="flex justify-end space-x-4 pt-6">
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              Create Review
            </Button>
          </div>
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default AddReviewForm;