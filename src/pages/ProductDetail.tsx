import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingCart, Star, Leaf, MapPin, Calendar, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useCartStore } from '@/store/cartStore';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { toast } from '@/hooks/use-toast';

const ProductDetail = () => {
  const { id } = useParams();
  const { addItem } = useCartStore();
  const [quantity, setQuantity] = useState(1);

  const product = products.find(p => p.id === id);
  const relatedProducts = products
    .filter(p => p.id !== id && p.category === product?.category)
    .slice(0, 4);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h1>
          <Link to="/marketplace">
            <Button>Back to Marketplace</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        seller: product.seller,
        unit: product.unit
      });
    }
    
    toast({
      title: "Added to cart!",
      description: `${quantity} ${product.name} added to your cart.`,
    });
  };

  const formatPrice = (price: number) => {
    return `TZS ${price.toLocaleString()}`;
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'in-stock': return 'bg-green-500';
      case 'low-stock': return 'bg-yellow-500';
      case 'out-of-stock': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getAvailabilityText = (availability: string) => {
    switch (availability) {
      case 'in-stock': return 'In Stock';
      case 'low-stock': return 'Low Stock';
      case 'out-of-stock': return 'Out of Stock';
      default: return 'Unknown';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <motion.div 
          className="flex items-center space-x-2 text-sm text-gray-600 mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Link to="/marketplace" className="hover:text-green-600 flex items-center">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Marketplace
          </Link>
          <span>/</span>
          <span className="capitalize">{product.category}</span>
          <span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="relative overflow-hidden rounded-lg bg-white shadow-lg">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-96 lg:h-[500px] object-cover"
              />
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.organic && (
                  <Badge className="bg-green-600 text-white flex items-center gap-1">
                    <Leaf className="h-3 w-3" />
                    Organic
                  </Badge>
                )}
                {product.originalPrice && (
                  <Badge variant="destructive">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </Badge>
                )}
              </div>
              <div className="absolute top-4 right-4">
                <Badge className={`${getAvailabilityColor(product.availability)} text-white`}>
                  {getAvailabilityText(product.availability)}
                </Badge>
              </div>
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              <p className="text-lg text-gray-600 mb-4">{product.seller}</p>
              
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-lg font-medium">{product.rating}</span>
                  <span className="ml-1 text-gray-500">({product.reviews} reviews)</span>
                </div>
              </div>

              <div className="flex items-baseline space-x-3 mb-6">
                <span className="text-3xl font-bold text-green-600">{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">{formatPrice(product.originalPrice)}</span>
                )}
                <span className="text-lg text-gray-500">{product.unit}</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-gray-400" />
                <span className="text-gray-600">{product.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-gray-400" />
                <span className="text-gray-600">Harvested: {new Date(product.harvestDate).toLocaleDateString()}</span>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            <Separator />

            {/* Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <label htmlFor="quantity" className="text-sm font-medium">Quantity:</label>
                <select
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="border border-gray-300 rounded-md px-3 py-2"
                  disabled={product.availability === 'out-of-stock'}
                >
                  {[...Array(10)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                  ))}
                </select>
              </div>

              <Button
                onClick={handleAddToCart}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-6 text-lg"
                disabled={product.availability === 'out-of-stock'}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                {product.availability === 'out-of-stock' ? 'Out of Stock' : `Add ${quantity} to Cart`}
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Product Specifications */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-16"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Info className="h-5 w-5 mr-2" />
                Product Specifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Origin</h4>
                  <p className="text-gray-600">{product.specifications.origin}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Variety</h4>
                  <p className="text-gray-600">{product.specifications.variety}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Shelf Life</h4>
                  <p className="text-gray-600">{product.specifications.shelf_life}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Storage</h4>
                  <p className="text-gray-600">{product.specifications.storage}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </motion.div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
