import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">TZ</span>
              </div>
              <span className="text-xl font-bold">AgriMarket</span>
            </div>
            <p className="text-gray-400 mb-4">
              Connecting Tanzanian farmers with markets across the country. Fresh, quality agricultural products delivered to your doorstep.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-gray-400 hover:text-green-600 cursor-pointer" />
              <Twitter className="h-5 w-5 text-gray-400 hover:text-green-600 cursor-pointer" />
              <Instagram className="h-5 w-5 text-gray-400 hover:text-green-600 cursor-pointer" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-green-600 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/marketplace" className="text-gray-400 hover:text-green-600 transition-colors">
                  Marketplace
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-gray-400 hover:text-green-600 transition-colors">
                  My Cart
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-green-600 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-green-600 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-green-600 transition-colors">
                  Vegetables
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-green-600 transition-colors">
                  Fruits
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-green-600 transition-colors">
                  Grains & Cereals
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-green-600 transition-colors">
                  Herbs & Spices
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-green-600" />
                <span className="text-gray-400">+255 123 456 789</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-green-600" />
                <span className="text-gray-400">info@agrimarket.co.tz</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-green-600" />
                <span className="text-gray-400">Dar es Salaam, Tanzania</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 AgriMarket Tanzania. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
