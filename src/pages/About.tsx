
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Target, Award, Globe } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Target,
      title: 'Our Mission',
      description: 'To connect Tanzanian farmers directly with consumers, ensuring fair prices and fresh produce while supporting local agriculture.'
    },
    {
      icon: Users,
      title: 'Community First',
      description: 'We believe in building strong relationships between farmers and consumers, creating a sustainable agricultural ecosystem.'
    },
    {
      icon: Award,
      title: 'Quality Assurance',
      description: 'Every product on our platform goes through rigorous quality checks to ensure only the best reaches your table.'
    },
    {
      icon: Globe,
      title: 'Sustainability',
      description: 'Promoting environmentally friendly farming practices and reducing the carbon footprint of food distribution.'
    }
  ];

  const team = [
    {
      name: 'John Mwanga',
      role: 'CEO & Founder',
      image: '/placeholder.svg',
      description: 'Former agricultural extension officer with 15 years of experience in Tanzania\'s farming sector.'
    },
    {
      name: 'Mary Kilimo',
      role: 'Head of Operations',
      image: '/placeholder.svg',
      description: 'Expert in supply chain management and farmer relations with deep understanding of local markets.'
    },
    {
      name: 'Peter Shamba',
      role: 'Technology Director',
      image: '/placeholder.svg',
      description: 'Software engineer passionate about using technology to solve agricultural challenges in East Africa.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">About AgriMarket Tanzania</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Bridging the gap between Tanzanian farmers and consumers through innovative technology,
            fair trade practices, and sustainable agriculture.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Founded in 2020, AgriMarket Tanzania emerged from a simple observation: 
                farmers were struggling to get fair prices for their produce while consumers 
                were paying high prices for fresh, quality food.
              </p>
              <p className="text-gray-600 mb-4">
                Our platform eliminates unnecessary middlemen, connecting farmers directly 
                with consumers and businesses. This creates a win-win situation where farmers 
                earn more and consumers pay less for fresher produce.
              </p>
              <p className="text-gray-600">
                Today, we serve over 1,000 farmers across Tanzania and deliver fresh produce 
                to thousands of satisfied customers every month.
              </p>
            </div>
            <div className="relative">
              <img
                src="/placeholder.svg"
                alt="Tanzanian farmers"
                className="rounded-lg shadow-lg w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These core values guide everything we do, from farmer partnerships to customer service.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Passionate individuals working together to revolutionize agriculture in Tanzania.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-green-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-green-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">1000+</div>
              <div className="text-green-100">Registered Farmers</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50,000+</div>
              <div className="text-green-100">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">25</div>
              <div className="text-green-100">Cities Served</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500K+</div>
              <div className="text-green-100">Orders Delivered</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
