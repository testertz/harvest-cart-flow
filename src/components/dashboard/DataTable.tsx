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
    }
  };

  const handleEdit = (item: any) => {
    if (onEdit) {
      onEdit(item);
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
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-4 lg:space-y-0">
          <CardTitle className="text-xl font-semibold text-gray-900">{title}</CardTitle>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 w-full lg:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder={searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full sm:w-64"
              />
            </div>
            
            {statusOptions.length > 0 && (
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md bg-white text-sm"
              >
                <option value="all">All Status</option>
                {statusOptions.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            )}
            
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="hidden sm:flex">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm" onClick={handleExport}>
                <Download className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Export</span>
              </Button>
              {onAdd && (
                <Button onClick={handleAdd} size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Add New</span>
                  <span className="sm:hidden">Add</span>
                </Button>
              )}
            </div>
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
                    className={`font-semibold text-gray-700 px-2 lg:px-4 ${
                      column.sortable ? 'cursor-pointer hover:bg-gray-100' : ''
                    }`}
                    onClick={() => column.sortable && handleSort(column.key)}
                  >
                    <div className="flex items-center">
                      <span className="text-xs lg:text-sm">{column.title}</span>
                      {column.sortable && sortColumn === column.key && (
                        <span className="ml-1">
                          {sortDirection === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                  </TableHead>
                ))}
                {(onEdit || onDelete || onVerify || onConfirm || onView) && (
                  <TableHead className="font-semibold text-gray-700 px-2 lg:px-4">
                    <span className="text-xs lg:text-sm">Actions</span>
                  </TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedData.map((item, index) => (
                <TableRow key={index} className="hover:bg-gray-50 transition-colors">
                  {columns.map((column) => (
                    <TableCell key={column.key} className="py-2 lg:py-4 px-2 lg:px-4">
                      <div className="text-xs lg:text-sm">
                        {renderCell ? renderCell(item, column.key) || defaultRenderCell(item, column.key) : defaultRenderCell(item, column.key)}
                      </div>
                    </TableCell>
                  ))}
                  {(onEdit || onDelete || onVerify || onConfirm || onView) && (
                    <TableCell className="py-2 lg:py-4 px-2 lg:px-4">
                      <div className="flex flex-col sm:flex-row space-y-1 sm:space-y-0 sm:space-x-2">
                        {onView && (
                          <Button variant="outline" size="sm" onClick={() => handleView(item)} className="text-blue-600 hover:text-blue-700 text-xs">
                            <Eye className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                            <span className="hidden sm:inline">View</span>
                          </Button>
                        )}
                        {onConfirm && item.status === 'Pending' && (
                          <Button variant="outline" size="sm" onClick={() => handleConfirm(item)} className="text-green-600 hover:text-green-700 text-xs">
                            <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                            <span className="hidden sm:inline">Confirm</span>
                          </Button>
                        )}
                        {onVerify && item.status === 'Pending' && (
                          <Button variant="outline" size="sm" onClick={() => handleVerify(item)} className="text-blue-600 hover:text-blue-700 text-xs">
                            <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                            <span className="hidden sm:inline">Verify</span>
                          </Button>
                        )}
                        {onEdit && (
                          <Button variant="outline" size="sm" onClick={() => handleEdit(item)} className="text-xs">
                            <Edit className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                            <span className="hidden sm:inline">Edit</span>
                          </Button>
                        )}
                        {onDelete && (
                          <Button variant="destructive" size="sm" onClick={() => handleDelete(item)} className="text-xs">
                            <Trash2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                            <span className="hidden sm:inline">Delete</span>
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
