
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
    name: 'Fresh Tomatoes',
    price: 2500,
    originalPrice: 3500,
    image: 'https://images.unsplash.com/photo-1592841200221-1b26c0d45ec8?w=400&h=300&fit=crop&auto=format',
    category: 'vegetables',
    seller: 'Mbeya Farm Cooperative',
    rating: 4.8,
    reviews: 124,
    description: 'Fresh, juicy tomatoes grown in the fertile highlands of Mbeya. Perfect for cooking ugali, pilau, or fresh salads.',
    unit: 'per kg',
    availability: 'in-stock',
    organic: true,
    location: 'Mbeya, Tanzania',
    harvestDate: '2024-01-15',
    specifications: {
      origin: 'Mbeya Farm Cooperative, Tanzania',
      variety: 'Roma Tomatoes',
      shelf_life: '7-10 days',
      storage: 'Room temperature or refrigerate'
    }
  },
  {
    id: '2',
    name: 'Premium Sesame Seeds',
    price: 8500,
    image: 'https://images.unsplash.com/photo-1586985564150-27f5b78ec8b5?w=400&h=300&fit=crop&auto=format',
    category: 'grains',
    seller: 'Dodoma Sesame Farmers',
    rating: 4.9,
    reviews: 89,
    description: 'High-quality sesame seeds from Dodoma region. Excellent for cooking, oil production, and export quality.',
    unit: 'per kg',
    availability: 'in-stock',
    organic: true,
    location: 'Dodoma, Tanzania',
    harvestDate: '2024-01-10',
    specifications: {
      origin: 'Dodoma Sesame Farmers, Tanzania',
      variety: 'White Sesame',
      shelf_life: '12 months',
      storage: 'Cool, dry place'
    }
  },
  {
    id: '3',
    name: 'Sweet Maize',
    price: 1500,
    image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=400&h=300&fit=crop&auto=format',
    category: 'vegetables',
    seller: 'Iringa Valley Farms',
    rating: 4.7,
    reviews: 156,
    description: 'Fresh sweet maize from Iringa highlands. Perfect for roasting, boiling, or making ugali flour.',
    unit: 'per cob',
    availability: 'in-stock',
    organic: false,
    location: 'Iringa, Tanzania',
    harvestDate: '2024-01-12',
    specifications: {
      origin: 'Iringa Valley Farms, Tanzania',
      variety: 'Sweet Maize',
      shelf_life: '3-5 days',
      storage: 'Keep in cool place'
    }
  },
  {
    id: '4',
    name: 'Fresh Spinach (Mchicha)',
    price: 1200,
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=300&fit=crop&auto=format',
    category: 'vegetables',
    seller: 'Arusha Greens',
    rating: 4.6,
    reviews: 92,
    description: 'Fresh mchicha (spinach) grown in Arusha. Rich in iron and perfect for traditional Tanzanian dishes.',
    unit: 'per bunch',
    availability: 'in-stock',
    organic: true,
    location: 'Arusha, Tanzania',
    harvestDate: '2024-01-14',
    specifications: {
      origin: 'Arusha Greens, Tanzania',
      variety: 'African Spinach',
      shelf_life: '3-5 days',
      storage: 'Refrigerate if available'
    }
  },
  {
    id: '5',
    name: 'Red Bell Peppers (Pilipili Hoho)',
    price: 4500,
    image: 'https://images.unsplash.com/photo-1525607551316-4a8e16d1f9ba?w=400&h=300&fit=crop&auto=format',
    category: 'vegetables',
    seller: 'Kilimanjaro Peppers',
    rating: 4.8,
    reviews: 78,
    description: 'Sweet red bell peppers from the slopes of Kilimanjaro. Perfect for cooking rice, meat dishes, or eating fresh.',
    unit: 'per kg',
    availability: 'low-stock',
    organic: false,
    location: 'Kilimanjaro, Tanzania',
    harvestDate: '2024-01-13',
    specifications: {
      origin: 'Kilimanjaro Peppers, Tanzania',
      variety: 'Red Bell Pepper',
      shelf_life: '7-14 days',
      storage: 'Keep in cool place'
    }
  },
  {
    id: '6',
    name: 'Fresh Carrots',
    price: 2800,
    image: 'https://images.unsplash.com/photo-1445282768818-728615cc910a?w=400&h=300&fit=crop&auto=format',
    category: 'vegetables',
    seller: 'Morogoro Root Farms',
    rating: 4.7,
    reviews: 134,
    description: 'Fresh, crunchy carrots from Morogoro region. Sweet and nutritious, perfect for cooking or eating raw.',
    unit: 'per kg',
    availability: 'in-stock',
    organic: true,
    location: 'Morogoro, Tanzania',
    harvestDate: '2024-01-11',
    specifications: {
      origin: 'Morogoro Root Farms, Tanzania',
      variety: 'Orange Carrots',
      shelf_life: '3-4 weeks',
      storage: 'Keep in cool, dry place'
    }
  },
  {
    id: '7',
    name: 'Sweet Bananas (Ndizi)',
    price: 2000,
    image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=300&fit=crop&auto=format',
    category: 'fruits',
    seller: 'Kagera Banana Growers',
    rating: 4.9,
    reviews: 201,
    description: 'Sweet, ripe bananas from Kagera region. Perfect for eating fresh, making juice, or cooking.',
    unit: 'per bunch',
    availability: 'in-stock',
    organic: true,
    location: 'Kagera, Tanzania',
    harvestDate: '2024-01-15',
    specifications: {
      origin: 'Kagera Banana Growers, Tanzania',
      variety: 'Sweet Bananas',
      shelf_life: '5-7 days',
      storage: 'Room temperature, away from sunlight'
    }
  },
  {
    id: '8',
    name: 'Sunflower Seeds',
    price: 6500,
    image: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=400&h=300&fit=crop&auto=format',
    category: 'grains',
    seller: 'Singida Sunflower Co.',
    rating: 4.8,
    reviews: 67,
    description: 'Premium sunflower seeds from Singida region. Excellent for oil production, snacking, or bird feed.',
    unit: 'per kg',
    availability: 'in-stock',
    organic: true,
    location: 'Singida, Tanzania',
    harvestDate: '2024-01-05',
    specifications: {
      origin: 'Singida Sunflower Co., Tanzania',
      variety: 'Black Sunflower Seeds',
      shelf_life: '12 months',
      storage: 'Cool, dry place in airtight container'
    }
  },
  {
    id: '9',
    name: 'Coffee Beans (Kahawa)',
    price: 15000,
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&h=300&fit=crop&auto=format',
    category: 'grains',
    seller: 'Kilimanjaro Coffee Estate',
    rating: 4.9,
    reviews: 156,
    description: 'Premium Arabica coffee beans from Mount Kilimanjaro. Rich flavor and aroma, perfect for export or local consumption.',
    unit: 'per kg',
    availability: 'in-stock',
    organic: true,
    location: 'Kilimanjaro, Tanzania',
    harvestDate: '2024-01-08',
    specifications: {
      origin: 'Kilimanjaro Coffee Estate, Tanzania',
      variety: 'Arabica Coffee',
      shelf_life: '12 months',
      storage: 'Cool, dry place away from light'
    }
  },
  {
    id: '10',
    name: 'Cassava (Mihogo)',
    price: 1800,
    image: 'https://images.unsplash.com/photo-1609501676725-7186f624e432?w=400&h=300&fit=crop&auto=format',
    category: 'vegetables',
    seller: 'Coast Region Farmers',
    rating: 4.6,
    reviews: 89,
    description: 'Fresh cassava roots from coastal Tanzania. Staple food crop, perfect for boiling, frying, or making flour.',
    unit: 'per kg',
    availability: 'in-stock',
    organic: false,
    location: 'Coastal Region, Tanzania',
    harvestDate: '2024-01-12',
    specifications: {
      origin: 'Coast Region Farmers, Tanzania',
      variety: 'Sweet Cassava',
      shelf_life: '1-2 weeks',
      storage: 'Keep in cool, ventilated place'
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
