
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, ShoppingCart, User, Sprout, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCartStore } from '@/store/cartStore';
import ProductCard from '@/components/ProductCard';
import { featuredProducts } from '@/data/products';

const Index = () => {
  const { items } = useCartStore();
  const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const heroVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const staggerItem = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-green-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <Sprout className="h-8 w-8 text-green-600" />
              <span className="text-2xl font-bold text-green-800">AgriMarket</span>
            </Link>

            {/* XP Progress Bar */}
            <div className="hidden md:flex items-center space-x-3 bg-green-100 rounded-full px-4 py-2">
              <Award className="h-5 w-5 text-green-600" />
              <div className="flex flex-col">
                <span className="text-xs text-green-700 font-medium">Level 3 Farmer</span>
                <div className="w-24 h-2 bg-green-200 rounded-full">
                  <div className="w-16 h-2 bg-green-500 rounded-full animate-pulse"></div>
                </div>
              </div>
              <span className="text-xs text-green-600 font-bold">1,250 XP</span>
            </div>

            <nav className="flex items-center space-x-6">
              <Link to="/marketplace" className="text-gray-700 hover:text-green-600 transition-colors">
                Marketplace
              </Link>
              <div className="flex items-center space-x-4">
                <Link to="/cart" className="relative">
                  <Button variant="outline" size="sm" className="relative">
                    <ShoppingCart className="h-4 w-4" />
                    {cartItemCount > 0 && (
                      <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center">
                        {cartItemCount}
                      </Badge>
                    )}
                  </Button>
                </Link>
                <Button variant="ghost" size="sm">
                  <User className="h-4 w-4" />
                </Button>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 to-yellow-500/10"></div>
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial="hidden"
            animate="visible"
            variants={heroVariants}
          >
            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6">
              Farm Fresh
              <span className="text-green-600 block">Delivered Daily</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Connect directly with local farmers and get the freshest agricultural products delivered to your doorstep. Quality guaranteed, prices unbeatable.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input 
                  placeholder="Search for tomatoes, sesame, etc..." 
                  className="pl-10 py-3 text-lg border-2 border-green-200 focus:border-green-400"
                />
              </div>
              <Link to="/marketplace">
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg">
                  Browse Products
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <Card className="text-center p-6 bg-white/80 backdrop-blur-sm border-green-200">
                <CardContent className="pt-4">
                  <div className="text-3xl font-bold text-green-600 mb-2">500+</div>
                  <div className="text-gray-600">Fresh Products</div>
                </CardContent>
              </Card>
              <Card className="text-center p-6 bg-white/80 backdrop-blur-sm border-green-200">
                <CardContent className="pt-4">
                  <div className="text-3xl font-bold text-green-600 mb-2">200+</div>
                  <div className="text-gray-600">Local Farmers</div>
                </CardContent>
              </Card>
              <Card className="text-center p-6 bg-white/80 backdrop-blur-sm border-green-200">
                <CardContent className="pt-4">
                  <div className="text-3xl font-bold text-green-600 mb-2">24hr</div>
                  <div className="text-gray-600">Fresh Delivery</div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={staggerItem} className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Products</h2>
              <p className="text-xl text-gray-600">Handpicked fresh produce from our partner farms</p>
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              variants={staggerContainer}
            >
              {featuredProducts.map((product) => (
                <motion.div key={product.id} variants={staggerItem}>
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={staggerItem} className="text-center mt-12">
              <Link to="/marketplace">
                <Button size="lg" variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                  View All Products
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={staggerItem} className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Shop by Category</h2>
              <p className="text-xl text-gray-600">Find exactly what you're looking for</p>
            </motion.div>

            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-6"
              variants={staggerContainer}
            >
              {[
                { name: 'Vegetables', emoji: '🥕', count: '120+' },
                { name: 'Fruits', emoji: '🍎', count: '80+' },
                { name: 'Grains', emoji: '🌾', count: '45+' },
                { name: 'Herbs', emoji: '🌿', count: '30+' }
              ].map((category) => (
                <motion.div key={category.name} variants={staggerItem}>
                  <Link to="/marketplace">
                    <Card className="text-center p-6 hover:shadow-lg transition-all duration-300 cursor-pointer bg-white border-green-200 hover:border-green-400">
                      <CardContent className="pt-4">
                        <div className="text-4xl mb-3">{category.emoji}</div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{category.name}</h3>
                        <p className="text-sm text-gray-600">{category.count} products</p>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Sprout className="h-6 w-6" />
                <span className="text-xl font-bold">AgriMarket</span>
              </div>
              <p className="text-green-200">Connecting farmers and consumers for a sustainable future.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-green-200">
                <li><Link to="/marketplace" className="hover:text-white transition-colors">Marketplace</Link></li>
                <li><Link to="/cart" className="hover:text-white transition-colors">Cart</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Categories</h4>
              <ul className="space-y-2 text-green-200">
                <li><a href="#" className="hover:text-white transition-colors">Vegetables</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Fruits</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Grains</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-green-200">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-green-800 mt-8 pt-8 text-center text-green-200">
            <p>&copy; 2024 AgriMarket. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
