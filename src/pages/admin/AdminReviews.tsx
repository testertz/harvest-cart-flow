
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import DataTable from '@/components/dashboard/DataTable';
import { Button } from '@/components/ui/button';
import { Star, MessageSquare, Download, Filter, Eye, Plus } from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';
import { toast } from 'sonner';

const AdminReviews = () => {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([
    {
      id: 1,
      product: 'Organic Tomatoes',
      customer: 'John Mwangi',
      rating: 4.5,
      comment: 'Fresh and organic, great quality!',
      status: 'Published',
      date: '2024-03-15',
      helpful: 12
    },
    {
      id: 2,
      product: 'Fresh Avocados',
      customer: 'Mary Kilimo',
      rating: 5.0,
      comment: 'Excellent quality avocados, will order again.',
      status: 'Pending',
      date: '2024-03-14',
      helpful: 8
    }
  ]);

  const reviewStats = [
    {
      title: 'Total Reviews',
      value: '2,456',
      icon: MessageSquare,
      color: 'from-blue-500 to-blue-600',
      trend: { value: 15, isPositive: true },
      subtitle: 'All reviews'
    },
    {
      title: 'Average Rating',
      value: '4.6',
      icon: Star,
      color: 'from-yellow-500 to-yellow-600',
      trend: { value: 2, isPositive: true },
      subtitle: 'Overall rating'
    },
    {
      title: 'Pending Reviews',
      value: '34',
      icon: MessageSquare,
      color: 'from-orange-500 to-orange-600',
      subtitle: 'Need moderation'
    },
    {
      title: '5-Star Reviews',
      value: '1,456',
      icon: Star,
      color: 'from-green-500 to-green-600',
      trend: { value: 18, isPositive: true },
      subtitle: 'Excellent ratings'
    }
  ];

  const reviewColumns = [
    { key: 'product', title: 'Product', sortable: true },
    { key: 'customer', title: 'Customer', sortable: true },
    { key: 'rating', title: 'Rating', sortable: true },
    { key: 'comment', title: 'Comment' },
    { key: 'status', title: 'Status' },
    { key: 'helpful', title: 'Helpful', sortable: true },
    { key: 'date', title: 'Date', sortable: true }
  ];

  const handleAddReview = () => {
    navigate('/admin/reviews/add');
  };

  const handleEditReview = (review: any) => {
    navigate(`/admin/reviews/edit/${review.id}`);
  };

  const handleDeleteReview = (review: any) => {
    setReviews(reviews.filter(r => r.id !== review.id));
    toast.success('Review deleted successfully');
  };

  const handleVerifyReview = (review: any) => {
    setReviews(reviews.map(r => 
      r.id === review.id ? { ...r, status: 'Published' } : r
    ));
    toast.success('Review verified and published');
  };

  const handleViewReview = (review: any) => {
    navigate(`/admin/reviews/view/${review.id}`);
  };

  return (
    <AdminLayout 
      title="Review Management"
      subtitle="Manage customer reviews and ratings for products"
    >
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {reviewStats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-8">
        <Button onClick={handleAddReview} className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Add Review</span>
        </Button>
        <Button variant="outline" className="flex items-center space-x-2">
          <Eye className="h-4 w-4" />
          <span>Review Analytics</span>
        </Button>
        <Button variant="outline" className="flex items-center space-x-2">
          <Filter className="h-4 w-4" />
          <span>Filter Reviews</span>
        </Button>
        <Button variant="outline" className="flex items-center space-x-2">
          <Download className="h-4 w-4" />
          <span>Export Reviews</span>
        </Button>
      </div>

      {/* Reviews Table */}
      <DataTable
        title="All Reviews"
        data={reviews}
        columns={reviewColumns}
        searchPlaceholder="Search reviews by product, customer, or content..."
        onAdd={handleAddReview}
        onEdit={handleEditReview}
        onDelete={handleDeleteReview}
        onView={handleViewReview}
        onVerify={handleVerifyReview}
      />
    </AdminLayout>
  );
};

export default AdminReviews;
