import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import KenyaMap from './map/KenyaMap';
import RiskPrediction from './risk/RiskPrediction';
import ResourceAllocation from './resources/ResourceAllocation';
import DataPanel from './data/DataPanel'; // ✅ 1. Import new panel
import { Map, Activity, BarChart, PieChart, Table } from "lucide-react";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('map');

  return (
    <div className="container mx-auto">
      <Tabs defaultValue="map" className="w-full" value={activeTab} onValueChange={setActiveTab}>
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold">Kenya HIV Insights Dashboard</h1>
          <TabsList>
            <TabsTrigger value="map" className="flex items-center gap-2">
              <Map className="h-4 w-4" />
              <span>Interactive Map</span>
            </TabsTrigger>
            <TabsTrigger value="risk" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              <span>Risk Prediction</span>
            </TabsTrigger>
            <TabsTrigger value="resources" className="flex items-center gap-2">
              <BarChart className="h-4 w-4" />
              <span>Resource Allocation</span>
            </TabsTrigger>
            <TabsTrigger value="dataset" className="flex items-center gap-2"> {/* ✅ 2. Add tab */}
              <Table className="h-4 w-4" />
              <span>Full Dataset</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="map" className="mt-0">
          <KenyaMap />
        </TabsContent>
        <TabsContent value="risk" className="mt-0">
          <RiskPrediction />
        </TabsContent>
        <TabsContent value="resources" className="mt-0">
          <ResourceAllocation />
        </TabsContent>
        <TabsContent value="dataset" className="mt-0"> {/* ✅ 3. Add panel content */}
          <DataPanel />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
