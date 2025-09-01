import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/data/products';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user' | 'farmer';
  joinDate: string;
  status: 'active' | 'inactive';
}

interface AdminStore {
  products: Product[];
  users: User[];
  initializeProducts: (products: Product[]) => void;
  addProduct: (product: Product) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addUser: (user: Omit<User, 'id' | 'joinDate'>) => void;
  updateUser: (id: string, user: Partial<User>) => void;
  deleteUser: (id: string) => void;
  getProduct: (id: string) => Product | undefined;
  getUser: (id: string) => User | undefined;
}

export const useAdminStore = create<AdminStore>()(
  persist(
    (set, get) => ({
      products: [],
      users: [
        {
          id: '1',
          email: 'admin@agrimarket.co.tz',
          name: 'Admin User',
          role: 'admin',
          joinDate: '2024-01-01',
          status: 'active'
        },
        {
          id: '2',
          email: 'farmer@agrimarket.co.tz',
          name: 'John Mkulima',
          role: 'farmer',
          joinDate: '2024-01-15',
          status: 'active'
        },
        {
          id: '3',
          email: 'user@agrimarket.co.tz',
          name: 'Mary Customer',
          role: 'user',
          joinDate: '2024-01-20',
          status: 'active'
        }
      ],
      initializeProducts: (products) => {
        set({ products });
      },
      addProduct: (product) => {
        set((state) => ({ products: [...state.products, product] }));
      },
      updateProduct: (id, updatedProduct) => {
        set((state) => ({
          products: state.products.map(product =>
            product.id === id ? { ...product, ...updatedProduct } : product
          )
        }));
      },
      deleteProduct: (id) => {
        set((state) => ({
          products: state.products.filter(product => product.id !== id)
        }));
      },
      addUser: (user) => {
        const newUser: User = {
          ...user,
          id: Date.now().toString(),
          joinDate: new Date().toISOString().split('T')[0],
        };
        set((state) => ({ users: [...state.users, newUser] }));
      },
      updateUser: (id, updatedUser) => {
        set((state) => ({
          users: state.users.map(user =>
            user.id === id ? { ...user, ...updatedUser } : user
          )
        }));
      },
      deleteUser: (id) => {
        set((state) => ({
          users: state.users.filter(user => user.id !== id)
        }));
      },
      getProduct: (id) => {
        const { products } = get();
        return products.find(product => product.id === id);
      },
      getUser: (id) => {
        const { users } = get();
        return users.find(user => user.id === id);
      },
    }),
    {
      name: 'admin-storage',
    }
  )
);