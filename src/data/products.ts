
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
  // Vegetables (10 products)
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
  },
  {
    id: '13',
    name: 'Sweet Potatoes (Viazi Vitamu)',
    price: 1600,
    image: 'https://images.unsplash.com/photo-1590165482129-1b8508137c18?w=400&h=300&fit=crop&auto=format',
    category: 'vegetables',
    seller: 'Kigoma Root Cooperative',
    rating: 4.4,
    reviews: 98,
    description: 'Orange-fleshed sweet potatoes from Kigoma. Rich in vitamins and perfect for roasting or boiling.',
    unit: 'per kg',
    availability: 'in-stock',
    organic: true,
    location: 'Kigoma, Tanzania',
    harvestDate: '2024-01-10',
    specifications: {
      origin: 'Kigoma Root Cooperative, Tanzania',
      variety: 'Orange Sweet Potato',
      shelf_life: '2-3 weeks',
      storage: 'Cool, dark place'
    }
  },
  {
    id: '14',
    name: 'Fresh Onions (Vitunguu)',
    price: 2400,
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&h=300&fit=crop&auto=format',
    category: 'vegetables',
    seller: 'Manyara Onion Growers',
    rating: 4.6,
    reviews: 87,
    description: 'Fresh red onions from Lake Manyara region. Essential ingredient for all Tanzanian cooking.',
    unit: 'per kg',
    availability: 'in-stock',
    organic: false,
    location: 'Manyara, Tanzania',
    harvestDate: '2024-01-09',
    specifications: {
      origin: 'Manyara Onion Growers, Tanzania',
      variety: 'Red Onions',
      shelf_life: '3-4 weeks',
      storage: 'Cool, dry, ventilated area'
    }
  },
  {
    id: '18',
    name: 'Fresh Cabbage (Kabichi)',
    price: 1800,
    image: 'https://images.unsplash.com/photo-1594282486624-e35e44e80d2b?w=400&h=300&fit=crop&auto=format',
    category: 'vegetables',
    seller: 'Njombe Highland Farms',
    rating: 4.5,
    reviews: 76,
    description: 'Fresh green cabbage from Njombe highlands. Crisp and perfect for salads, cooking, or fermentation.',
    unit: 'per head',
    availability: 'in-stock',
    organic: true,
    location: 'Njombe, Tanzania',
    harvestDate: '2024-01-12',
    specifications: {
      origin: 'Njombe Highland Farms, Tanzania',
      variety: 'Green Cabbage',
      shelf_life: '2-3 weeks',
      storage: 'Refrigerate or cool place'
    }
  },
  {
    id: '22',
    name: 'Green Peppers (Pilipili Hoho)',
    price: 3800,
    image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400&h=300&fit=crop&auto=format',
    category: 'vegetables',
    seller: 'Arusha Valley Peppers',
    rating: 4.5,
    reviews: 95,
    description: 'Fresh green bell peppers from Arusha valley. Perfect for cooking rice, stews, and salads.',
    unit: 'per kg',
    availability: 'in-stock',
    organic: false,
    location: 'Arusha, Tanzania',
    harvestDate: '2024-01-13',
    specifications: {
      origin: 'Arusha Valley Peppers, Tanzania',
      variety: 'Green Bell Pepper',
      shelf_life: '1-2 weeks',
      storage: 'Keep in cool place'
    }
  },

  // Fruits (8 products)
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
    id: '12',
    name: 'Green Mangoes (Maembe)',
    price: 2200,
    originalPrice: 2800,
    image: 'https://images.unsplash.com/photo-1553279374-2640994d5fb5?w=400&h=300&fit=crop&auto=format',
    category: 'fruits',
    seller: 'Pwani Mango Farms',
    rating: 4.7,
    reviews: 112,
    description: 'Fresh green mangoes from coastal region. Perfect for making chutneys, pickles, or eating with salt.',
    unit: 'per kg',
    availability: 'in-stock',
    organic: true,
    location: 'Pwani, Tanzania',
    harvestDate: '2024-01-14',
    specifications: {
      origin: 'Pwani Mango Farms, Tanzania',
      variety: 'Kent Mango',
      shelf_life: '1-2 weeks',
      storage: 'Room temperature until ripe'
    }
  },
  {
    id: '16',
    name: 'Fresh Pineapples (Nanasi)',
    price: 3500,
    image: 'https://images.unsplash.com/photo-1544717030-847e8e7f4a6c?w=400&h=300&fit=crop&auto=format',
    category: 'fruits',
    seller: 'Morogoro Tropical Fruits',
    rating: 4.7,
    reviews: 123,
    description: 'Sweet, juicy pineapples from Morogoro. Perfect for fresh eating, juice, or traditional dishes.',
    unit: 'per piece',
    availability: 'in-stock',
    organic: true,
    location: 'Morogoro, Tanzania',
    harvestDate: '2024-01-13',
    specifications: {
      origin: 'Morogoro Tropical Fruits, Tanzania',
      variety: 'Smooth Cayenne',
      shelf_life: '5-7 days',
      storage: 'Room temperature until ripe'
    }
  },
  {
    id: '19',
    name: 'Passion Fruits (Marakuja)',
    price: 4800,
    originalPrice: 5500,
    image: 'https://images.unsplash.com/photo-1564632043262-b66d33b6b755?w=400&h=300&fit=crop&auto=format',
    category: 'fruits',
    seller: 'Tanga Passion Growers',
    rating: 4.9,
    reviews: 142,
    description: 'Aromatic passion fruits from Tanga region. Perfect for juice, desserts, or eating fresh.',
    unit: 'per kg',
    availability: 'low-stock',
    organic: true,
    location: 'Tanga, Tanzania',
    harvestDate: '2024-01-14',
    specifications: {
      origin: 'Tanga Passion Growers, Tanzania',
      variety: 'Purple Passion Fruit',
      shelf_life: '1-2 weeks',
      storage: 'Room temperature until ripe'
    }
  },
  {
    id: '23',
    name: 'Watermelons (Tikiti Maji)',
    price: 2500,
    image: 'https://images.unsplash.com/photo-1571618770639-cb4ebd30e3f8?w=400&h=300&fit=crop&auto=format',
    category: 'fruits',
    seller: 'Shinyanga Melon Farms',
    rating: 4.6,
    reviews: 134,
    description: 'Sweet, juicy watermelons from Shinyanga region. Perfect for hot days and natural hydration.',
    unit: 'per piece',
    availability: 'in-stock',
    organic: true,
    location: 'Shinyanga, Tanzania',
    harvestDate: '2024-01-12',
    specifications: {
      origin: 'Shinyanga Melon Farms, Tanzania',
      variety: 'Sugar Baby Watermelon',
      shelf_life: '7-10 days',
      storage: 'Cool place, avoid direct sunlight'
    }
  },
  {
    id: '24',
    name: 'Avocados (Parachichi)',
    price: 4500,
    originalPrice: 5200,
    image: 'https://images.unsplash.com/photo-1583638150180-0d82b3d2a15f?w=400&h=300&fit=crop&auto=format',
    category: 'fruits',
    seller: 'Kilimanjaro Avocado Growers',
    rating: 4.8,
    reviews: 156,
    description: 'Creamy avocados from Kilimanjaro slopes. Rich in healthy fats and perfect for salads or smoothies.',
    unit: 'per kg',
    availability: 'in-stock',
    organic: true,
    location: 'Kilimanjaro, Tanzania',
    harvestDate: '2024-01-14',
    specifications: {
      origin: 'Kilimanjaro Avocado Growers, Tanzania',
      variety: 'Hass Avocado',
      shelf_life: '5-7 days when ripe',
      storage: 'Room temperature until ripe'
    }
  },
  {
    id: '25',
    name: 'Coconuts (Nazi)',
    price: 1500,
    image: 'https://images.unsplash.com/photo-1556909045-b1fb6a4c5ad8?w=400&h=300&fit=crop&auto=format',
    category: 'fruits',
    seller: 'Coastal Coconut Farms',
    rating: 4.7,
    reviews: 98,
    description: 'Fresh coconuts from Tanzania coast. Perfect for coconut water, milk, or cooking wali wa nazi.',
    unit: 'per piece',
    availability: 'in-stock',
    organic: true,
    location: 'Coastal Region, Tanzania',
    harvestDate: '2024-01-15',
    specifications: {
      origin: 'Coastal Coconut Farms, Tanzania',
      variety: 'East African Tall',
      shelf_life: '2-3 months',
      storage: 'Cool, dry place'
    }
  },
  {
    id: '26',
    name: 'Oranges (Machungwa)',
    price: 3200,
    image: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&h=300&fit=crop&auto=format',
    category: 'fruits',
    seller: 'Tanga Citrus Gardens',
    rating: 4.5,
    reviews: 87,
    description: 'Sweet, juicy oranges from Tanga region. High in vitamin C and perfect for fresh juice.',
    unit: 'per kg',
    availability: 'in-stock',
    organic: false,
    location: 'Tanga, Tanzania',
    harvestDate: '2024-01-10',
    specifications: {
      origin: 'Tanga Citrus Gardens, Tanzania',
      variety: 'Valencia Orange',
      shelf_life: '2-3 weeks',
      storage: 'Cool place or refrigerate'
    }
  },

  // Grains (8 products)
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
    id: '11',
    name: 'White Rice',
    price: 3200,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop&auto=format',
    category: 'grains',
    seller: 'Mwanza Rice Farmers',
    rating: 4.5,
    reviews: 145,
    description: 'High-quality white rice from Mwanza region. Perfect for pilau, wali wa nazi, and everyday meals.',
    unit: 'per kg',
    availability: 'in-stock',
    organic: false,
    location: 'Mwanza, Tanzania',
    harvestDate: '2024-01-08',
    specifications: {
      origin: 'Mwanza Rice Farmers, Tanzania',
      variety: 'Jasmine Rice',
      shelf_life: '24 months',
      storage: 'Dry, airtight container'
    }
  },
  {
    id: '15',
    name: 'Groundnuts (Karanga)',
    price: 5500,
    originalPrice: 6200,
    image: 'https://images.unsplash.com/photo-1599593292715-4490b2c41ce5?w=400&h=300&fit=crop&auto=format',
    category: 'grains',
    seller: 'Tabora Nut Farmers',
    rating: 4.8,
    reviews: 156,
    description: 'Premium groundnuts from Tabora region. Perfect for making groundnut sauce, roasting, or oil production.',
    unit: 'per kg',
    availability: 'in-stock',
    organic: true,
    location: 'Tabora, Tanzania',
    harvestDate: '2024-01-07',
    specifications: {
      origin: 'Tabora Nut Farmers, Tanzania',
      variety: 'Valencia Groundnuts',
      shelf_life: '6 months',
      storage: 'Dry, airtight container'
    }
  },
  {
    id: '17',
    name: 'Black Beans (Maharage Meusi)',
    price: 4200,
    image: 'https://images.unsplash.com/photo-1571197200840-2be2bb8a0c1d?w=400&h=300&fit=crop&auto=format',
    category: 'grains',
    seller: 'Rukwa Bean Cooperative',
    rating: 4.6,
    reviews: 94,
    description: 'High-quality black beans from Rukwa region. Rich in protein and perfect for traditional bean dishes.',
    unit: 'per kg',
    availability: 'in-stock',
    organic: false,
    location: 'Rukwa, Tanzania',
    harvestDate: '2024-01-06',
    specifications: {
      origin: 'Rukwa Bean Cooperative, Tanzania',
      variety: 'Black Turtle Beans',
      shelf_life: '24 months',
      storage: 'Cool, dry place in sealed container'
    }
  },
  {
    id: '20',
    name: 'White Maize (Mahindi Meupe)',
    price: 2200,
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop&auto=format',
    category: 'grains',
    seller: 'Ruvuma Maize Farmers',
    rating: 4.7,
    reviews: 167,
    description: 'Premium white maize from Ruvuma region. Perfect for making ugali flour and traditional porridge.',
    unit: 'per kg',
    availability: 'in-stock',
    organic: false,
    location: 'Ruvuma, Tanzania',
    harvestDate: '2024-01-05',
    specifications: {
      origin: 'Ruvuma Maize Farmers, Tanzania',
      variety: 'White Dent Corn',
      shelf_life: '12 months',
      storage: 'Dry, pest-free storage'
    }
  },
  {
    id: '27',
    name: 'Red Kidney Beans (Maharage Mekundu)',
    price: 4800,
    image: 'https://images.unsplash.com/photo-1545070850-e9c1b405e2a5?w=400&h=300&fit=crop&auto=format',
    category: 'grains',
    seller: 'Kigoma Bean Growers',
    rating: 4.6,
    reviews: 78,
    description: 'Premium red kidney beans from Kigoma. Excellent protein source for traditional stews and curries.',
    unit: 'per kg',
    availability: 'in-stock',
    organic: true,
    location: 'Kigoma, Tanzania',
    harvestDate: '2024-01-04',
    specifications: {
      origin: 'Kigoma Bean Growers, Tanzania',
      variety: 'Red Kidney Beans',
      shelf_life: '24 months',
      storage: 'Cool, dry place in sealed container'
    }
  },

  // Herbs & Spices (5 products)
  {
    id: '21',
    name: 'Fresh Ginger (Tangawizi)',
    price: 6800,
    image: 'https://images.unsplash.com/photo-1615485020890-4c3acf6eef7b?w=400&h=300&fit=crop&auto=format',
    category: 'herbs',
    seller: 'Mwanza Spice Gardens',
    rating: 4.8,
    reviews: 89,
    description: 'Fresh, aromatic ginger from Mwanza. Perfect for cooking, tea, or medicinal purposes.',
    unit: 'per kg',
    availability: 'in-stock',
    organic: true,
    location: 'Mwanza, Tanzania',
    harvestDate: '2024-01-11',
    specifications: {
      origin: 'Mwanza Spice Gardens, Tanzania',
      variety: 'Common Ginger',
      shelf_life: '3-4 weeks',
      storage: 'Cool, dry place'
    }
  },
  {
    id: '28',
    name: 'Fresh Turmeric (Manjano)',
    price: 7200,
    image: 'https://images.unsplash.com/photo-1609501676725-7186f624e432?w=400&h=300&fit=crop&auto=format',
    category: 'herbs',
    seller: 'Zanzibar Spice Farm',
    rating: 4.9,
    reviews: 65,
    description: 'Fresh turmeric roots from Zanzibar. Known for anti-inflammatory properties and rich golden color.',
    unit: 'per kg',
    availability: 'in-stock',
    organic: true,
    location: 'Zanzibar, Tanzania',
    harvestDate: '2024-01-12',
    specifications: {
      origin: 'Zanzibar Spice Farm, Tanzania',
      variety: 'Curcuma Longa',
      shelf_life: '3-4 weeks',
      storage: 'Cool, dry place'
    }
  },
  {
    id: '29',
    name: 'Black Pepper (Pilipili Manga)',
    price: 12000,
    image: 'https://images.unsplash.com/photo-1583725602219-3f9ad3e0c77e?w=400&h=300&fit=crop&auto=format',
    category: 'herbs',
    seller: 'Pemba Spice Traders',
    rating: 4.7,
    reviews: 43,
    description: 'Premium black pepper from Pemba island. Strong aroma and perfect for seasoning all dishes.',
    unit: 'per 500g',
    availability: 'in-stock',
    organic: true,
    location: 'Pemba, Tanzania',
    harvestDate: '2024-01-08',
    specifications: {
      origin: 'Pemba Spice Traders, Tanzania',
      variety: 'Piper Nigrum',
      shelf_life: '24 months',
      storage: 'Airtight container, dry place'
    }
  },
  {
    id: '30',
    name: 'Coriander Seeds (Giligilani)',
    price: 4500,
    image: 'https://images.unsplash.com/photo-1594282486624-e35e44e80d2b?w=400&h=300&fit=crop&auto=format',
    category: 'herbs',
    seller: 'Dodoma Herb Collective',
    rating: 4.5,
    reviews: 67,
    description: 'Aromatic coriander seeds from Dodoma. Essential spice for curry powders and traditional cooking.',
    unit: 'per kg',
    availability: 'in-stock',
    organic: false,
    location: 'Dodoma, Tanzania',
    harvestDate: '2024-01-06',
    specifications: {
      origin: 'Dodoma Herb Collective, Tanzania',
      variety: 'Coriandrum Sativum',
      shelf_life: '18 months',
      storage: 'Cool, dry place in airtight container'
    }
  },
  {
    id: '31',
    name: 'Cardamom (Iliki)',
    price: 18000,
    originalPrice: 20000,
    image: 'https://images.unsplash.com/photo-1578774296842-c45e472b3028?w=400&h=300&fit=crop&auto=format',
    category: 'herbs',
    seller: 'Kilimanjaro Spice Co.',
    rating: 4.8,
    reviews: 34,
    description: 'Premium green cardamom from Kilimanjaro region. Aromatic spice perfect for tea, coffee, and cooking.',
    unit: 'per 250g',
    availability: 'low-stock',
    organic: true,
    location: 'Kilimanjaro, Tanzania',
    harvestDate: '2024-01-09',
    specifications: {
      origin: 'Kilimanjaro Spice Co., Tanzania',
      variety: 'Green Cardamom',
      shelf_life: '24 months',
      storage: 'Airtight container, cool place'
    }
  }
];

export const featuredProducts = products.slice(0, 8);

export const categories = [
  'vegetables',
  'fruits', 
  'grains',
  'herbs'
];
