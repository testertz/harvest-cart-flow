
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Download, Plus, CheckCircle, XCircle, Edit, Trash2 } from 'lucide-react';

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
  renderCell
}: DataTableProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const filteredData = data.filter(item =>
    Object.values(item).some(value =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

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
  };

  const defaultRenderCell = (item: any, key: string) => {
    const value = item[key];
    
    if (key === 'status') {
      const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
          case 'active': case 'delivered': case 'approved': case 'verified':
            return 'bg-green-100 text-green-800';
          case 'pending': case 'processing':
            return 'bg-yellow-100 text-yellow-800';
          case 'inactive': case 'cancelled': case 'rejected':
            return 'bg-red-100 text-red-800';
          case 'shipped':
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
    
    if (key.includes('price') || key.includes('total') || key.includes('amount') || key.includes('Sales')) {
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
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            {onAdd && (
              <Button onClick={onAdd} size="sm">
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
                {(onEdit || onDelete || onVerify || onConfirm) && (
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
                  {(onEdit || onDelete || onVerify || onConfirm) && (
                    <TableCell className="py-4">
                      <div className="flex space-x-2">
                        {onConfirm && item.status === 'Pending' && (
                          <Button variant="outline" size="sm" onClick={() => onConfirm(item)} className="text-green-600 hover:text-green-700">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Confirm
                          </Button>
                        )}
                        {onVerify && item.status === 'Pending' && (
                          <Button variant="outline" size="sm" onClick={() => onVerify(item)} className="text-blue-600 hover:text-blue-700">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Verify
                          </Button>
                        )}
                        {onEdit && (
                          <Button variant="outline" size="sm" onClick={() => onEdit(item)}>
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                        )}
                        {onDelete && (
                          <Button variant="destructive" size="sm" onClick={() => onDelete(item)}>
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
