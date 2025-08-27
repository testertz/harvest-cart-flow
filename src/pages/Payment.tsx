import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CreditCard, Smartphone, Building2, Banknote, Check, Shield } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';

interface OrderData {
  items: Array<{
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
  }>;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  customerInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    region: string;
  };
}

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [selectedPayment, setSelectedPayment] = useState('mobile_money');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    mobileNumber: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });

  useEffect(() => {
    const data = location.state?.orderData;
    if (!data) {
      navigate('/cart');
      return;
    }
    setOrderData(data);
  }, [location.state, navigate]);

  const formatPrice = (price: number) => {
    return `TZS ${price.toLocaleString()}`;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000));

    setIsProcessing(false);
    setPaymentComplete(true);
    
    toast({
      title: "Payment Successful!",
      description: "Your order has been confirmed and will be processed shortly.",
    });
  };

  if (!orderData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Loading payment...</h1>
        </div>
      </div>
    );
  }

  if (paymentComplete) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md mx-auto p-8"
        >
          <div className="bg-success/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="h-10 w-10 text-success" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-4">Payment Confirmed!</h1>
          <p className="text-muted-foreground mb-8">
            Thank you for supporting local Tanzanian farmers. Your order will be processed 
            and delivered within 2-3 business days.
          </p>
          <div className="space-y-4">
            <Link to="/marketplace">
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                Continue Shopping
              </Button>
            </Link>
            <Link to="/">
              <Button variant="outline" className="w-full">
                Back to Home
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link to="/checkout" className="flex items-center text-primary hover:text-primary/80 mb-4">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Checkout
          </Link>
          <h1 className="text-3xl font-bold text-foreground">Secure Payment</h1>
          <p className="text-muted-foreground">Complete your order payment</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Payment Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <form onSubmit={handlePayment} className="space-y-6">
              {/* Security Badge */}
              <div className="flex items-center justify-center p-4 bg-muted/50 rounded-lg">
                <Shield className="h-5 w-5 text-success mr-2" />
                <span className="text-sm text-muted-foreground">Secured by 256-bit SSL encryption</span>
              </div>

              {/* Payment Methods */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="h-5 w-5 mr-2" />
                    Payment Method
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <RadioGroup
                    value={selectedPayment}
                    onValueChange={setSelectedPayment}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                        <RadioGroupItem value="mobile_money" id="mobile_money" />
                        <Smartphone className="h-5 w-5 text-primary" />
                        <div className="flex-1">
                          <Label htmlFor="mobile_money" className="font-medium">Mobile Money</Label>
                          <p className="text-sm text-muted-foreground">M-Pesa, Tigo Pesa, Airtel Money</p>
                        </div>
                        <Badge variant="secondary">Popular</Badge>
                      </div>

                      <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                        <RadioGroupItem value="credit_card" id="credit_card" />
                        <CreditCard className="h-5 w-5 text-primary" />
                        <div className="flex-1">
                          <Label htmlFor="credit_card" className="font-medium">Credit/Debit Card</Label>
                          <p className="text-sm text-muted-foreground">Visa, Mastercard, Amex</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                        <RadioGroupItem value="bank_transfer" id="bank_transfer" />
                        <Building2 className="h-5 w-5 text-primary" />
                        <div className="flex-1">
                          <Label htmlFor="bank_transfer" className="font-medium">Bank Transfer</Label>
                          <p className="text-sm text-muted-foreground">Direct bank payment</p>
                        </div>
                      </div>
                    </div>
                  </RadioGroup>

                  {/* Payment Details Form */}
                  {selectedPayment === 'mobile_money' && (
                    <div className="space-y-4 mt-6 p-4 bg-accent/30 rounded-lg">
                      <div>
                        <Label htmlFor="mobileNumber">Mobile Money Number</Label>
                        <Input
                          id="mobileNumber"
                          name="mobileNumber"
                          placeholder="+255 xxx xxx xxx"
                          value={paymentDetails.mobileNumber}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                  )}

                  {selectedPayment === 'credit_card' && (
                    <div className="space-y-4 mt-6 p-4 bg-accent/30 rounded-lg">
                      <div>
                        <Label htmlFor="cardName">Cardholder Name</Label>
                        <Input
                          id="cardName"
                          name="cardName"
                          placeholder="John Doe"
                          value={paymentDetails.cardName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input
                          id="cardNumber"
                          name="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={paymentDetails.cardNumber}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiryDate">Expiry Date</Label>
                          <Input
                            id="expiryDate"
                            name="expiryDate"
                            placeholder="MM/YY"
                            value={paymentDetails.expiryDate}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV</Label>
                          <Input
                            id="cvv"
                            name="cvv"
                            placeholder="123"
                            value={paymentDetails.cvv}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedPayment === 'bank_transfer' && (
                    <div className="mt-6 p-4 bg-accent/30 rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        You will receive bank transfer instructions after clicking "Complete Payment".
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-lg"
                disabled={isProcessing}
              >
                {isProcessing ? 'Processing Payment...' : `Pay ${formatPrice(orderData.total)}`}
              </Button>
            </form>
          </motion.div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Customer Info */}
                <div className="p-4 bg-accent/30 rounded-lg">
                  <h4 className="font-medium text-sm mb-2">Delivery Information</h4>
                  <p className="text-sm text-muted-foreground">
                    {orderData.customerInfo.firstName} {orderData.customerInfo.lastName}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {orderData.customerInfo.address}, {orderData.customerInfo.city}
                  </p>
                  <p className="text-sm text-muted-foreground">{orderData.customerInfo.region}</p>
                </div>

                {/* Order Items */}
                <div className="space-y-3">
                  {orderData.items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{item.name}</h4>
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-medium text-sm">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Pricing Breakdown */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{formatPrice(orderData.subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>
                      {orderData.shipping === 0 ? (
                        <span className="text-success font-medium">FREE</span>
                      ) : (
                        formatPrice(orderData.shipping)
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>{formatPrice(orderData.tax)}</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>{formatPrice(orderData.total)}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Payment;