
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Download, Plus, CheckCircle, XCircle, Edit, Trash2, Eye } from 'lucide-react';
import { toast } from 'sonner';

interface Column {
  key: string;
  title: string;
  sortable?: boolean;
}

interface DataTableProps {
  title: string;
  data: any[];
  columns: Column[];
  searchPlaceholder?: string;
  onAdd?: () => void;
  onEdit?: (item: any) => void;
  onDelete?: (item: any) => void;
  onVerify?: (item: any) => void;
  onConfirm?: (item: any) => void;
  onView?: (item: any) => void;
  renderCell?: (item: any, key: string) => React.ReactNode;
}

const DataTable = ({ 
  title, 
  data, 
  columns, 
  searchPlaceholder = "Search...",
  onAdd,
  onEdit,
  onDelete,
  onVerify,
  onConfirm,
  onView,
  renderCell
}: DataTableProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredData = data.filter(item => {
    const matchesSearch = Object.values(item).some(value =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    );
    const matchesFilter = filterStatus === 'all' || item.status?.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const sortedData = sortColumn
    ? [...filteredData].sort((a, b) => {
        const aVal = a[sortColumn];
        const bVal = b[sortColumn];
        const direction = sortDirection === 'asc' ? 1 : -1;
        return aVal < bVal ? -direction : aVal > bVal ? direction : 0;
      })
    : filteredData;

  const handleSort = (columnKey: string) => {
    if (sortColumn === columnKey) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(columnKey);
      setSortDirection('asc');
    }
  };

  const handleExport = () => {
    const csvContent = [
      columns.map(col => col.title).join(','),
      ...sortedData.map(item => 
        columns.map(col => item[col.key]).join(',')
      )
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.toLowerCase().replace(/\s+/g, '_')}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success('Data exported successfully!');
  };

  const handleAdd = () => {
    if (onAdd) {
      onAdd();
      toast.success('Opening add form...');
    }
  };

  const handleEdit = (item: any) => {
    if (onEdit) {
      onEdit(item);
      toast.success(`Editing ${item.name || item.id}...`);
    }
  };

  const handleDelete = (item: any) => {
    if (onDelete) {
      if (window.confirm('Are you sure you want to delete this item?')) {
        onDelete(item);
        toast.success(`${item.name || item.id} deleted successfully!`);
      }
    }
  };

  const handleVerify = (item: any) => {
    if (onVerify) {
      onVerify(item);
      toast.success(`${item.name || item.id} verified successfully!`);
    }
  };

  const handleConfirm = (item: any) => {
    if (onConfirm) {
      onConfirm(item);
      toast.success(`${item.name || item.id} confirmed successfully!`);
    }
  };

  const handleView = (item: any) => {
    if (onView) {
      onView(item);
      toast.info(`Viewing ${item.name || item.id}...`);
    }
  };

  const defaultRenderCell = (item: any, key: string) => {
    const value = item[key];
    
    if (key === 'status') {
      const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
          case 'active': case 'delivered': case 'approved': case 'verified': case 'completed': case 'published':
            return 'bg-green-100 text-green-800';
          case 'pending': case 'processing':
            return 'bg-yellow-100 text-yellow-800';
          case 'inactive': case 'cancelled': case 'rejected': case 'failed':
            return 'bg-red-100 text-red-800';
          case 'shipped': case 'in transit':
            return 'bg-blue-100 text-blue-800';
          case 'low stock':
            return 'bg-orange-100 text-orange-800';
          default:
            return 'bg-gray-100 text-gray-800';
        }
      };
      
      return <Badge className={getStatusColor(value)}>{value}</Badge>;
    }
    
    if (key.includes('date') || key.includes('Date')) {
      return new Date(value).toLocaleDateString();
    }
    
    if (key.includes('price') || key.includes('total') || key.includes('amount') || key.includes('Sales') || key.includes('spent')) {
      return `TZS ${Number(value).toLocaleString()}`;
    }
    
    if (key === 'rating') {
      return (
        <div className="flex items-center">
          <span className="text-yellow-500">★</span>
          <span className="ml-1">{value}</span>
        </div>
      );
    }
    
    return value;
  };

  const statusOptions = [...new Set(data.map(item => item.status).filter(Boolean))];

  return (
    <Card className="shadow-lg border-0">
      <CardHeader className="bg-white border-b border-gray-100">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold text-gray-900">{title}</CardTitle>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder={searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            
            {statusOptions.length > 0 && (
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md bg-white"
              >
                <option value="all">All Status</option>
                {statusOptions.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            )}
            
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            {onAdd && (
              <Button onClick={handleAdd} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add New
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                {columns.map((column) => (
                  <TableHead 
                    key={column.key}
                    className={`font-semibold text-gray-700 ${
                      column.sortable ? 'cursor-pointer hover:bg-gray-100' : ''
                    }`}
                    onClick={() => column.sortable && handleSort(column.key)}
                  >
                    <div className="flex items-center">
                      {column.title}
                      {column.sortable && sortColumn === column.key && (
                        <span className="ml-1">
                          {sortDirection === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                  </TableHead>
                ))}
                {(onEdit || onDelete || onVerify || onConfirm || onView) && (
                  <TableHead className="font-semibold text-gray-700">Actions</TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedData.map((item, index) => (
                <TableRow key={index} className="hover:bg-gray-50 transition-colors">
                  {columns.map((column) => (
                    <TableCell key={column.key} className="py-4">
                      {renderCell ? renderCell(item, column.key) || defaultRenderCell(item, column.key) : defaultRenderCell(item, column.key)}
                    </TableCell>
                  ))}
                  {(onEdit || onDelete || onVerify || onConfirm || onView) && (
                    <TableCell className="py-4">
                      <div className="flex space-x-2">
                        {onView && (
                          <Button variant="outline" size="sm" onClick={() => handleView(item)} className="text-blue-600 hover:text-blue-700">
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                        )}
                        {onConfirm && item.status === 'Pending' && (
                          <Button variant="outline" size="sm" onClick={() => handleConfirm(item)} className="text-green-600 hover:text-green-700">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Confirm
                          </Button>
                        )}
                        {onVerify && item.status === 'Pending' && (
                          <Button variant="outline" size="sm" onClick={() => handleVerify(item)} className="text-blue-600 hover:text-blue-700">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Verify
                          </Button>
                        )}
                        {onEdit && (
                          <Button variant="outline" size="sm" onClick={() => handleEdit(item)}>
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                        )}
                        {onDelete && (
                          <Button variant="destructive" size="sm" onClick={() => handleDelete(item)}>
                            <Trash2 className="h-4 w-4 mr-1" />
                            Delete
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {sortedData.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No data found</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DataTable;
