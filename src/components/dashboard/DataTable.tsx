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
            return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
          case 'pending': case 'processing':
            return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
          case 'inactive': case 'cancelled': case 'rejected': case 'failed':
            return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
          case 'shipped': case 'in transit':
            return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
          case 'low stock':
            return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
          default:
            return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
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
      <CardHeader className="pb-4">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
          <div>
            <CardTitle className="text-xl font-bold">{title}</CardTitle>
          </div>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 w-full lg:w-auto">
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder={searchPlaceholder}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full sm:w-80"
                />
              </div>
              {statusOptions.length > 0 && (
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border border-input rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring w-full sm:w-32"
                >
                  <option value="all">All Status</option>
                  {statusOptions.map((status) => (
                    <option key={status} value={status.toLowerCase()}>
                      {status}
                    </option>
                  ))}
                </select>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {onAdd && (
                <Button onClick={handleAdd} className="whitespace-nowrap flex-shrink-0">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New
                </Button>
              )}
              <Button variant="outline" onClick={handleExport} className="whitespace-nowrap flex-shrink-0">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((column) => (
                  <TableHead 
                    key={column.key} 
                    className={`${column.sortable ? 'cursor-pointer hover:bg-muted/50' : ''} whitespace-nowrap font-semibold`}
                    onClick={() => column.sortable && handleSort(column.key)}
                  >
                    <div className="flex items-center space-x-1">
                      <span>{column.title}</span>
                      {column.sortable && sortColumn === column.key && (
                        <span className="ml-1">
                          {sortDirection === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                  </TableHead>
                ))}
                <TableHead className="text-right whitespace-nowrap font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={columns.length + 1} className="text-center py-8 text-muted-foreground">
                    No data found
                  </TableCell>
                </TableRow>
              ) : (
                sortedData.map((item, index) => (
                  <TableRow key={item.id || index} className="hover:bg-muted/50">
                    {columns.map((column) => (
                      <TableCell key={column.key} className="whitespace-nowrap">
                        {renderCell ? renderCell(item, column.key) : defaultRenderCell(item, column.key)}
                      </TableCell>
                    ))}
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-1">
                        {onView && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleView(item)}
                            className="h-8 w-8 p-0 hover:bg-muted"
                            title="View"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        )}
                        {onEdit && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(item)}
                            className="h-8 w-8 p-0 hover:bg-muted"
                            title="Edit"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        )}
                        {onVerify && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleVerify(item)}
                            className="h-8 w-8 p-0 hover:bg-muted"
                            title="Verify"
                          >
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          </Button>
                        )}
                        {onConfirm && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleConfirm(item)}
                            className="h-8 w-8 p-0 hover:bg-muted"
                            title="Confirm"
                          >
                            <CheckCircle className="h-4 w-4 text-blue-600" />
                          </Button>
                        )}
                        {onDelete && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(item)}
                            className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default DataTable;
