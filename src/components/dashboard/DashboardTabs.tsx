
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ReactNode } from 'react';

interface TabItem {
  value: string;
  label: string;
  content: ReactNode;
}

interface DashboardTabsProps {
  tabs: TabItem[];
  defaultValue?: string;
}

const DashboardTabs = ({ tabs, defaultValue = "overview" }: DashboardTabsProps) => {
  return (
    <Tabs defaultValue={defaultValue} className="space-y-6">
      <TabsList className="grid w-full grid-cols-6 lg:w-fit bg-white shadow-sm border">
        {tabs.map((tab) => (
          <TabsTrigger 
            key={tab.value} 
            value={tab.value}
            className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default DashboardTabs;
