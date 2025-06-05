
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Heart, Star } from 'lucide-react';

interface ActivityProps {
  orders: any[];
  wishlist: any[];
  onViewOrder: (order: any) => void;
  onAddToCart: (item: any) => void;
}

const RecentActivity = ({ orders, wishlist, onViewOrder, onAddToCart }: ActivityProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle className="flex items-center">
            <ShoppingBag className="h-5 w-5 mr-2 text-blue-600" />
            Recent Orders
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {orders.slice(0, 3).map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{order.id}</p>
                  <p className="text-sm text-gray-600 mt-1">{order.products}</p>
                  <p className="text-xs text-gray-500 mt-2">{order.date}</p>
                </div>
                <div className="text-right ml-4">
                  <p className="font-semibold text-green-600">TZS {order.total.toLocaleString()}</p>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${
                    order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                    order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                    order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {order.status}
                  </span>
                  <Button 
                    onClick={() => onViewOrder(order)} 
                    variant="outline" 
                    size="sm" 
                    className="mt-2 w-full"
                  >
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Heart className="h-5 w-5 mr-2 text-red-600" />
            Wishlist Highlights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {wishlist.slice(0, 3).map((item) => (
              <div key={item.id} className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{item.name}</p>
                  <div className="flex items-center mt-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600 ml-1">{item.rating}</span>
                  </div>
                  <p className="font-semibold text-green-600 mt-1">TZS {item.price.toLocaleString()}</p>
                </div>
                <Button onClick={() => onAddToCart(item)} size="sm" className="shrink-0">
                  Add to Cart
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RecentActivity;
