
import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import DataTable from '@/components/dashboard/DataTable';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { HelpCircle, MessageSquare, Phone, Mail, Download, Filter } from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';

const AdminSupport = () => {
  const [tickets] = useState([
    {
      id: 'TKT-001',
      customer: 'John Mwangi',
      email: 'john@example.com',
      subject: 'Payment Issue',
      category: 'Payment',
      priority: 'High',
      status: 'Open',
      createdDate: '2024-03-15',
      lastUpdate: '2024-03-15'
    },
    {
      id: 'TKT-002',
      customer: 'Mary Kilimo',
      email: 'mary@example.com',
      subject: 'Product Quality Concern',
      category: 'Product',
      priority: 'Medium',
      status: 'In Progress',
      createdDate: '2024-03-14',
      lastUpdate: '2024-03-15'
    },
    {
      id: 'TKT-003',
      customer: 'Peter Shamba',
      email: 'peter@example.com',
      subject: 'Account Access Problem',
      category: 'Account',
      priority: 'Low',
      status: 'Resolved',
      createdDate: '2024-03-13',
      lastUpdate: '2024-03-14'
    }
  ]);

  const supportStats = [
    {
      title: 'Open Tickets',
      value: '34',
      icon: HelpCircle,
      color: 'from-orange-500 to-orange-600',
      subtitle: 'Need attention'
    },
    {
      title: 'Resolved Today',
      value: '18',
      icon: MessageSquare,
      color: 'from-green-500 to-green-600',
      trend: { value: 12, isPositive: true },
      subtitle: 'Tickets closed'
    },
    {
      title: 'Avg Response Time',
      value: '2.5 hrs',
      icon: MessageSquare,
      color: 'from-blue-500 to-blue-600',
      trend: { value: 8, isPositive: false },
      subtitle: 'Response time'
    },
    {
      title: 'Customer Satisfaction',
      value: '4.6/5',
      icon: HelpCircle,
      color: 'from-purple-500 to-purple-600',
      trend: { value: 5, isPositive: true },
      subtitle: 'Average rating'
    }
  ];

  const ticketColumns = [
    { key: 'id', title: 'Ticket ID', sortable: true },
    { key: 'customer', title: 'Customer', sortable: true },
    { key: 'subject', title: 'Subject' },
    { key: 'category', title: 'Category' },
    { key: 'priority', title: 'Priority' },
    { key: 'status', title: 'Status' },
    { key: 'createdDate', title: 'Created', sortable: true },
    { key: 'lastUpdate', title: 'Last Update', sortable: true }
  ];

  const handleAddTicket = () => {
    console.log('Add new ticket');
  };

  const handleEditTicket = (ticket: any) => {
    console.log('Edit ticket:', ticket);
  };

  const handleDeleteTicket = (ticket: any) => {
    console.log('Delete ticket:', ticket);
  };

  const handleResolveTicket = (ticket: any) => {
    console.log('Resolve ticket:', ticket);
  };

  return (
    <AdminLayout 
      title="Support Management"
      subtitle="Manage customer support tickets and help desk operations"
    >
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {supportStats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-8">
        <Button onClick={handleAddTicket} className="flex items-center space-x-2">
          <MessageSquare className="h-4 w-4" />
          <span>Create Ticket</span>
        </Button>
        <Button variant="outline" className="flex items-center space-x-2">
          <Filter className="h-4 w-4" />
          <span>Filter Tickets</span>
        </Button>
        <Button variant="outline" className="flex items-center space-x-2">
          <Download className="h-4 w-4" />
          <span>Export Tickets</span>
        </Button>
        <Button variant="outline" className="flex items-center space-x-2">
          <HelpCircle className="h-4 w-4" />
          <span>Knowledge Base</span>
        </Button>
      </div>

      {/* Support Channels */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Mail className="h-5 w-5 mr-2 text-blue-600" />
              Email Support
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Handle customer inquiries via email</p>
            <Button className="w-full">Manage Email Queue</Button>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="h-5 w-5 mr-2 text-green-600" />
              Live Chat
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Real-time chat support for customers</p>
            <Button className="w-full">Open Chat Console</Button>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Phone className="h-5 w-5 mr-2 text-purple-600" />
              Phone Support
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Telephone support for urgent issues</p>
            <Button className="w-full">Call Management</Button>
          </CardContent>
        </Card>
      </div>

      {/* Support Tickets Table */}
      <DataTable
        title="Support Tickets"
        data={tickets}
        columns={ticketColumns}
        searchPlaceholder="Search tickets by ID, customer, or subject..."
        onAdd={handleAddTicket}
        onEdit={handleEditTicket}
        onDelete={handleDeleteTicket}
        renderCell={(item, key) => {
          if (key === 'priority') {
            const getPriorityColor = (priority: string) => {
              switch (priority.toLowerCase()) {
                case 'high':
                  return 'bg-red-100 text-red-800';
                case 'medium':
                  return 'bg-yellow-100 text-yellow-800';
                case 'low':
                  return 'bg-blue-100 text-blue-800';
                default:
                  return 'bg-gray-100 text-gray-800';
              }
            };
            return <Badge className={getPriorityColor(item.priority)}>{item.priority}</Badge>;
          }
          if (key === 'status' && item.status === 'Open') {
            return (
              <div className="flex items-center space-x-2">
                <Badge className="bg-orange-100 text-orange-800">{item.status}</Badge>
                <Button size="sm" onClick={() => handleResolveTicket(item)}>
                  Resolve
                </Button>
              </div>
            );
          }
          return undefined;
        }}
      />
    </AdminLayout>
  );
};

export default AdminSupport;
