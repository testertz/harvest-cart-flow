
export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  seller: string;
  rating: number;
  reviews: number;
  description: string;
  unit: string;
  availability: 'in-stock' | 'low-stock' | 'out-of-stock';
  organic: boolean;
  location: string;
  harvestDate: string;
  specifications: {
    origin: string;
    variety: string;
    shelf_life: string;
    storage: string;
  };
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Premium Organic Tomatoes',
    price: 4.99,
    originalPrice: 6.99,
    image: 'https://images.unsplash.com/photo-1592841200221-1b26c0d45ec8?w=400&h=300&fit=crop&auto=format',
    category: 'vegetables',
    seller: 'Green Valley Farm',
    rating: 4.8,
    reviews: 124,
    description: 'Fresh, juicy organic tomatoes grown using sustainable farming practices. Perfect for salads, cooking, or eating fresh.',
    unit: 'per lb',
    availability: 'in-stock',
    organic: true,
    location: 'California, USA',
    harvestDate: '2024-01-15',
    specifications: {
      origin: 'Green Valley Farm, California',
      variety: 'Roma Tomatoes',
      shelf_life: '7-10 days',
      storage: 'Room temperature or refrigerate'
    }
  },
  {
    id: '2',
    name: 'Premium Sesame Seeds',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1586985564150-27f5b78ec8b5?w=400&h=300&fit=crop&auto=format',
    category: 'grains',
    seller: 'Heritage Seeds Co.',
    rating: 4.9,
    reviews: 89,
    description: 'High-quality sesame seeds perfect for baking, cooking, and oil production. Rich in nutrients and flavor.',
    unit: 'per lb',
    availability: 'in-stock',
    organic: true,
    location: 'Texas, USA',
    harvestDate: '2024-01-10',
    specifications: {
      origin: 'Heritage Seeds Co., Texas',
      variety: 'White Sesame',
      shelf_life: '12 months',
      storage: 'Cool, dry place'
    }
  },
  {
    id: '3',
    name: 'Fresh Sweet Corn',
    price: 3.49,
    image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=400&h=300&fit=crop&auto=format',
    category: 'vegetables',
    seller: 'Sunny Acres Farm',
    rating: 4.7,
    reviews: 156,
    description: 'Sweet, crispy corn on the cob. Harvested at peak freshness for maximum sweetness and flavor.',
    unit: 'per ear',
    availability: 'in-stock',
    organic: false,
    location: 'Iowa, USA',
    harvestDate: '2024-01-12',
    specifications: {
      origin: 'Sunny Acres Farm, Iowa',
      variety: 'Sweet Corn',
      shelf_life: '3-5 days',
      storage: 'Refrigerate immediately'
    }
  },
  {
    id: '4',
    name: 'Organic Baby Spinach',
    price: 5.99,
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=300&fit=crop&auto=format',
    category: 'vegetables',
    seller: 'Leafy Greens Co.',
    rating: 4.6,
    reviews: 92,
    description: 'Tender, fresh baby spinach leaves. Perfect for salads, smoothies, or cooking. Packed with nutrients.',
    unit: 'per 5oz bag',
    availability: 'in-stock',
    organic: true,
    location: 'Oregon, USA',
    harvestDate: '2024-01-14',
    specifications: {
      origin: 'Leafy Greens Co., Oregon',
      variety: 'Baby Spinach',
      shelf_life: '5-7 days',
      storage: 'Refrigerate in original packaging'
    }
  },
  {
    id: '5',
    name: 'Red Bell Peppers',
    price: 6.49,
    image: 'https://images.unsplash.com/photo-1525607551316-4a8e16d1f9ba?w=400&h=300&fit=crop&auto=format',
    category: 'vegetables',
    seller: 'Rainbow Gardens',
    rating: 4.8,
    reviews: 78,
    description: 'Vibrant red bell peppers with a sweet, crisp taste. Great for cooking, grilling, or eating raw.',
    unit: 'per lb',
    availability: 'low-stock',
    organic: false,
    location: 'Florida, USA',
    harvestDate: '2024-01-13',
    specifications: {
      origin: 'Rainbow Gardens, Florida',
      variety: 'Red Bell Pepper',
      shelf_life: '7-14 days',
      storage: 'Refrigerate'
    }
  },
  {
    id: '6',
    name: 'Organic Carrots',
    price: 3.99,
    image: 'https://images.unsplash.com/photo-1445282768818-728615cc910a?w=400&h=300&fit=crop&auto=format',
    category: 'vegetables',
    seller: 'Root Vegetable Farm',
    rating: 4.7,
    reviews: 134,
    description: 'Fresh, crunchy organic carrots. Sweet and nutritious, perfect for snacking, cooking, or juicing.',
    unit: 'per 2lb bag',
    availability: 'in-stock',
    organic: true,
    location: 'Washington, USA',
    harvestDate: '2024-01-11',
    specifications: {
      origin: 'Root Vegetable Farm, Washington',
      variety: 'Nantes Carrots',
      shelf_life: '3-4 weeks',
      storage: 'Refrigerate in crisper drawer'
    }
  },
  {
    id: '7',
    name: 'Fresh Strawberries',
    price: 7.99,
    image: 'https://images.unsplash.com/photo-1464965326117-96a9047e1ade?w=400&h=300&fit=crop&auto=format',
    category: 'fruits',
    seller: 'Berry Best Farm',
    rating: 4.9,
    reviews: 201,
    description: 'Sweet, juicy strawberries picked at peak ripeness. Perfect for desserts, snacking, or smoothies.',
    unit: 'per pint',
    availability: 'in-stock',
    organic: true,
    location: 'California, USA',
    harvestDate: '2024-01-15',
    specifications: {
      origin: 'Berry Best Farm, California',
      variety: 'Albion Strawberries',
      shelf_life: '3-5 days',
      storage: 'Refrigerate, do not wash until ready to eat'
    }
  },
  {
    id: '8',
    name: 'Quinoa Seeds',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop&auto=format',
    category: 'grains',
    seller: 'Ancient Grains Co.',
    rating: 4.8,
    reviews: 67,
    description: 'Premium quinoa seeds, a complete protein superfood. Perfect for healthy meals and substituting rice.',
    unit: 'per 2lb bag',
    availability: 'in-stock',
    organic: true,
    location: 'Bolivia',
    harvestDate: '2024-01-05',
    specifications: {
      origin: 'Ancient Grains Co., Bolivia',
      variety: 'White Quinoa',
      shelf_life: '2-3 years',
      storage: 'Cool, dry place in airtight container'
    }
  }
];

export const featuredProducts = products.slice(0, 4);

export const categories = [
  'vegetables',
  'fruits', 
  'grains',
  'herbs'
];
