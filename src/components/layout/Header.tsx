
import React from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, Map, BarChart, PieChart } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Activity className="h-6 w-6 text-theme-purple" />
          <h1 className="text-lg font-semibold">Kenya HIV Insights</h1>
        </div>
        
        <div className="ml-auto flex items-center gap-4">
          <Tabs defaultValue="dashboard" className="mr-4">
            <TabsList className="grid grid-cols-4 w-[400px]">
              <TabsTrigger value="dashboard" className="flex items-center gap-2">
                <Map className="h-4 w-4" />
                <span className="hidden sm:inline-block">Map</span>
              </TabsTrigger>
              <TabsTrigger value="risk" className="flex items-center gap-2">
                <Activity className="h-4 w-4" />
                <span className="hidden sm:inline-block">Risk</span>
              </TabsTrigger>
              <TabsTrigger value="resources" className="flex items-center gap-2">
                <BarChart className="h-4 w-4" />
                <span className="hidden sm:inline-block">Resources</span>
              </TabsTrigger>
              <TabsTrigger value="statistics" className="flex items-center gap-2">
                <PieChart className="h-4 w-4" />
                <span className="hidden sm:inline-block">Statistics</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <Button variant="outline" size="sm">Download Report</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
