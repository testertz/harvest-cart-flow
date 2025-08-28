import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import DashboardLayout from '@/components/DashboardLayout';
import { 
  ArrowLeft, 
  Package, 
  MapPin, 
  CreditCard, 
  Calendar,
  Truck,
  CheckCircle
} from 'lucide-react';
import { toast } from 'sonner';

const OrderDetails = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();
  
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    // Mock order data - in real app, fetch from API
    const mockOrders = [
      {
        id: 'ORD-001',
        date: '2024-03-15',
        items: 3,
        total: 45000,
        status: 'Delivered',
        products: [
          { name: 'Organic Tomatoes', quantity: 2, price: 8000, image: '/placeholder.svg' },
          { name: 'Fresh Carrots', quantity: 1, price: 5000, image: '/placeholder.svg' },
          { name: 'Green Beans', quantity: 3, price: 6000, image: '/placeholder.svg' }
        ],
        shippingAddress: {
          name: 'John Doe',
          address: '123 Uhuru Street, Kinondoni',
          city: 'Dar es Salaam',
          phone: '+255 123 456 789'
        },
        paymentMethod: 'Credit Card (**** 1234)',
        trackingNumber: 'AGM2024031501',
        estimatedDelivery: '2024-03-18',
        actualDelivery: '2024-03-17',
        timeline: [
          { status: 'Order Placed', date: '2024-03-15 10:30', completed: true },
          { status: 'Payment Confirmed', date: '2024-03-15 10:32', completed: true },
          { status: 'Order Processing', date: '2024-03-15 14:00', completed: true },
          { status: 'Shipped', date: '2024-03-16 09:15', completed: true },
          { status: 'Delivered', date: '2024-03-17 11:45', completed: true }
        ]
      },
      {
        id: 'ORD-002',
        date: '2024-03-10',
        items: 2,
        total: 28000,
        status: 'Processing',
        products: [
          { name: 'Sweet Potatoes', quantity: 2, price: 10000, image: '/placeholder.svg' },
          { name: 'Red Onions', quantity: 1, price: 8000, image: '/placeholder.svg' }
        ],
        shippingAddress: {
          name: 'John Doe',
          address: '123 Uhuru Street, Kinondoni',
          city: 'Dar es Salaam',
          phone: '+255 123 456 789'
        },
        paymentMethod: 'Mobile Money (+255 7** *** 789)',
        trackingNumber: 'AGM2024031002',
        estimatedDelivery: '2024-03-13',
        timeline: [
          { status: 'Order Placed', date: '2024-03-10 15:20', completed: true },
          { status: 'Payment Confirmed', date: '2024-03-10 15:22', completed: true },
          { status: 'Order Processing', date: '2024-03-10 16:00', completed: true },
          { status: 'Shipped', date: '', completed: false },
          { status: 'Delivered', date: '', completed: false }
        ]
      }
    ];

    const foundOrder = mockOrders.find(o => o.id === orderId);
    setOrder(foundOrder);
  }, [orderId]);

  const handleReorder = () => {
    toast.success('Items added to cart for reordering');
    navigate('/cart');
  };

  const handleTrackOrder = () => {
    toast.info(`Tracking: ${order.trackingNumber}`);
  };

  if (!order) {
    return (
      <DashboardLayout title="Order Not Found" subtitle="The requested order could not be found">
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">Order {orderId} not found</p>
          <Button onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  const subtotal = order.products.reduce((sum: number, product: any) => sum + (product.price * product.quantity), 0);
  const shipping = 3000;
  const tax = subtotal * 0.18;

  return (
    <DashboardLayout title={`Order ${order.id}`} subtitle={`Placed on ${order.date}`}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button 
            variant="outline" 
            onClick={() => navigate('/dashboard')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Orders
          </Button>

          <div className="flex space-x-2">
            <Button variant="outline" onClick={handleTrackOrder}>
              <Package className="h-4 w-4 mr-2" />
              Track Order
            </Button>
            <Button onClick={handleReorder}>
              Reorder Items
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Order Status Timeline */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Order Status</span>
                  <Badge variant={order.status === 'Delivered' ? 'default' : 'secondary'}>
                    {order.status}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.timeline.map((step: any, index: number) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        step.completed ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                      }`}>
                        {step.completed ? <CheckCircle className="h-4 w-4" /> : <div className="w-3 h-3 rounded-full bg-current" />}
                      </div>
                      <div className="flex-1">
                        <p className={`font-medium ${step.completed ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {step.status}
                        </p>
                        {step.date && (
                          <p className="text-sm text-muted-foreground">{step.date}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Order Items */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle>Order Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.products.map((product: any, index: number) => (
                    <div key={index} className="flex items-center space-x-4 p-4 border rounded-lg">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium">{product.name}</h3>
                        <p className="text-sm text-muted-foreground">Quantity: {product.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">TZS {(product.price * product.quantity).toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground">TZS {product.price.toLocaleString()} each</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            {/* Order Summary */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>TZS {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>TZS {shipping.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (18%)</span>
                  <span>TZS {tax.toLocaleString()}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>TZS {order.total.toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>

            {/* Shipping Information */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  Shipping Address
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="font-medium">{order.shippingAddress.name}</p>
                <p className="text-muted-foreground">{order.shippingAddress.address}</p>
                <p className="text-muted-foreground">{order.shippingAddress.city}</p>
                <p className="text-muted-foreground">{order.shippingAddress.phone}</p>
              </CardContent>
            </Card>

            {/* Payment Information */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{order.paymentMethod}</p>
              </CardContent>
            </Card>

            {/* Delivery Information */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Truck className="h-5 w-5 mr-2" />
                  Delivery Info
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Tracking Number</span>
                  <span className="font-medium">{order.trackingNumber}</span>
                </div>
                {order.estimatedDelivery && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Estimated Delivery</span>
                    <span className="font-medium">{order.estimatedDelivery}</span>
                  </div>
                )}
                {order.actualDelivery && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Delivered On</span>
                    <span className="font-medium text-primary">{order.actualDelivery}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default OrderDetails;