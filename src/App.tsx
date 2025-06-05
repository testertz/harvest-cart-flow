
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';

// Pages
import Index from '@/pages/Index';
import Marketplace from '@/pages/Marketplace';
import ProductDetail from '@/pages/ProductDetail';
import Cart from '@/pages/Cart';
import Checkout from '@/pages/Checkout';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import UserDashboard from '@/pages/UserDashboard';
import AdminDashboard from '@/pages/AdminDashboard';
import FarmerDashboard from '@/pages/FarmerDashboard';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import NotFound from '@/pages/NotFound';
import Notifications from '@/pages/Notifications';

// Admin Pages
import AdminUsers from '@/pages/admin/AdminUsers';
import AdminProducts from '@/pages/admin/AdminProducts';
import AdminOrders from '@/pages/admin/AdminOrders';
import AdminFarmers from '@/pages/admin/AdminFarmers';
import AdminPayments from '@/pages/admin/AdminPayments';
import AdminShipping from '@/pages/admin/AdminShipping';
import AdminReviews from '@/pages/admin/AdminReviews';
import AdminReports from '@/pages/admin/AdminReports';
import AdminAnalytics from '@/pages/admin/AdminAnalytics';
import AdminSettings from '@/pages/admin/AdminSettings';
import AdminSupport from '@/pages/admin/AdminSupport';

// Add new form imports
import AddUserForm from '@/pages/admin/forms/AddUserForm';
import AddProductForm from '@/pages/admin/forms/AddProductForm';
import AddFarmerForm from '@/pages/admin/forms/AddFarmerForm';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/farmers" element={<AdminFarmers />} />
          <Route path="/admin/payments" element={<AdminPayments />} />
          <Route path="/admin/shipping" element={<AdminShipping />} />
          <Route path="/admin/reviews" element={<AdminReviews />} />
          <Route path="/admin/reports" element={<AdminReports />} />
          <Route path="/admin/analytics" element={<AdminAnalytics />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
          <Route path="/admin/support" element={<AdminSupport />} />
          <Route path="/farmer/dashboard" element={<FarmerDashboard />} />
          
          {/* Admin Form Routes */}
          <Route path="/admin/users/add" element={<AddUserForm />} />
          <Route path="/admin/users/edit/:id" element={<AddUserForm />} />
          <Route path="/admin/products/add" element={<AddProductForm />} />
          <Route path="/admin/products/edit/:id" element={<AddProductForm />} />
          <Route path="/admin/farmers/add" element={<AddFarmerForm />} />
          <Route path="/admin/farmers/edit/:id" element={<AddFarmerForm />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
