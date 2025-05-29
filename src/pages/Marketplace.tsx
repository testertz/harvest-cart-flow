
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import ProductCard from '@/components/ProductCard';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { products, categories } from '@/data/products';
import { Product } from '@/data/products';

const Marketplace = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [availability, setAvailability] = useState<string[]>([]);
  const [organicOnly, setOrganicOnly] = useState(false);
  const [sortBy, setSortBy] = useState('name');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    let filtered = products.filter((product) => {
      // Enhanced search filter - search in name, description, seller, location, and category
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = searchTerm === '' || 
                           product.name.toLowerCase().includes(searchLower) ||
                           product.description.toLowerCase().includes(searchLower) ||
                           product.seller.toLowerCase().includes(searchLower) ||
                           product.location.toLowerCase().includes(searchLower) ||
                           product.category.toLowerCase().includes(searchLower);

      // Category filter
      const matchesCategory = selectedCategories.length === 0 || 
                             selectedCategories.includes(product.category);

      // Price filter - convert to thousands for easier filtering
      const priceInThousands = product.price / 1000;
      const matchesPrice = priceInThousands >= priceRange[0] && priceInThousands <= priceRange[1];

      // Availability filter
      const matchesAvailability = availability.length === 0 || 
                                 availability.includes(product.availability);

      // Organic filter
      const matchesOrganic = !organicOnly || product.organic;

      return matchesSearch && matchesCategory && matchesPrice && matchesAvailability && matchesOrganic;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [searchTerm, selectedCategories, priceRange, availability, organicOnly, sortBy]);

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category]);
    } else {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    }
  };

  const handleAvailabilityChange = (avail: string, checked: boolean) => {
    if (checked) {
      setAvailability([...availability, avail]);
    } else {
      setAvailability(availability.filter(a => a !== avail));
    }
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 100]);
    setAvailability([]);
    setOrganicOnly(false);
    setSearchTerm('');
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
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Marketplace</h1>
          
          {/* Search and Sort */}
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search products, farmers, locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={() => setFiltersOpen(!filtersOpen)}
                className="lg:hidden"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <ArrowUpDown className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name A-Z</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Active Filters */}
          {(selectedCategories.length > 0 || availability.length > 0 || organicOnly || searchTerm) && (
            <div className="flex flex-wrap items-center gap-2 mt-4">
              <span className="text-sm font-medium text-gray-700">Active filters:</span>
              {searchTerm && (
                <Badge variant="secondary">
                  Search: "{searchTerm}"
                  <button
                    onClick={() => setSearchTerm('')}
                    className="ml-2 text-gray-500 hover:text-gray-700"
                  >
                    ×
                  </button>
                </Badge>
              )}
              {selectedCategories.map((category) => (
                <Badge key={category} variant="secondary" className="capitalize">
                  {category}
                  <button
                    onClick={() => handleCategoryChange(category, false)}
                    className="ml-2 text-gray-500 hover:text-gray-700"
                  >
                    ×
                  </button>
                </Badge>
              ))}
              {availability.map((avail) => (
                <Badge key={avail} variant="secondary" className="capitalize">
                  {avail.replace('-', ' ')}
                  <button
                    onClick={() => handleAvailabilityChange(avail, false)}
                    className="ml-2 text-gray-500 hover:text-gray-700"
                  >
                    ×
                  </button>
                </Badge>
              ))}
              {organicOnly && (
                <Badge variant="secondary">
                  Organic Only
                  <button
                    onClick={() => setOrganicOnly(false)}
                    className="ml-2 text-gray-500 hover:text-gray-700"
                  >
                    ×
                  </button>
                </Badge>
              )}
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Clear all
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <Collapsible open={filtersOpen} onOpenChange={setFiltersOpen}>
            <div className={`lg:w-64 ${filtersOpen ? 'block' : 'hidden lg:block'}`}>
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <SlidersHorizontal className="h-5 w-5 mr-2" />
                    Filters
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Categories */}
                  <div>
                    <h3 className="font-medium mb-3">Categories</h3>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <div key={category} className="flex items-center space-x-2">
                          <Checkbox
                            id={category}
                            checked={selectedCategories.includes(category)}
                            onCheckedChange={(checked) => 
                              handleCategoryChange(category, checked === true)
                            }
                          />
                          <label 
                            htmlFor={category} 
                            className="text-sm capitalize cursor-pointer"
                          >
                            {category}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Availability */}
                  <div>
                    <h3 className="font-medium mb-3">Availability</h3>
                    <div className="space-y-2">
                      {['in-stock', 'low-stock'].map((avail) => (
                        <div key={avail} className="flex items-center space-x-2">
                          <Checkbox
                            id={avail}
                            checked={availability.includes(avail)}
                            onCheckedChange={(checked) => 
                              handleAvailabilityChange(avail, checked === true)
                            }
                          />
                          <label 
                            htmlFor={avail} 
                            className="text-sm capitalize cursor-pointer"
                          >
                            {avail.replace('-', ' ')}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Organic Only */}
                  <div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="organic"
                        checked={organicOnly}
                        onCheckedChange={(checked) => setOrganicOnly(checked === true)}
                      />
                      <label htmlFor="organic" className="text-sm cursor-pointer">
                        Organic Only
                      </label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </Collapsible>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                Showing {filteredProducts.length} of {products.length} products
                {searchTerm && (
                  <span className="text-green-600 font-medium">
                    {" "}for "{searchTerm}"
                  </span>
                )}
              </p>
            </div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {filteredProducts.map((product) => (
                <motion.div key={product.id} variants={staggerItem}>
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg mb-2">
                  {searchTerm 
                    ? `No products found for "${searchTerm}"`
                    : "No products found matching your criteria."
                  }
                </p>
                <p className="text-gray-400 mb-4">
                  Try adjusting your search terms or filters
                </p>
                <Button variant="outline" onClick={clearFilters} className="mt-4">
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Marketplace;
