
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
  trend?: { value: number; isPositive: boolean };
  subtitle?: string;
}

const QuickStats = ({ stats }: { stats: StatCardProps[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <Card key={index} className="shadow-lg border-0 overflow-hidden">
          <CardContent className="p-6">
            <div className={`bg-gradient-to-r ${stat.color} rounded-lg p-4 mb-4`}>
              <stat.icon className="h-8 w-8 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-gray-600 text-sm mb-2">{stat.title}</p>
              {stat.trend && (
                <div className={`flex items-center text-sm ${
                  stat.trend.isPositive ? 'text-green-600' : 'text-red-600'
                }`}>
                  <span>{stat.trend.isPositive ? '+' : '-'}{stat.trend.value}%</span>
                  <span className="text-gray-500 ml-2">{stat.subtitle}</span>
                </div>
              )}
              {!stat.trend && stat.subtitle && (
                <p className="text-gray-500 text-sm">{stat.subtitle}</p>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default QuickStats;
