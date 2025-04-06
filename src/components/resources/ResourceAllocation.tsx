
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getResourceAllocations } from '@/services/dataService';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const ResourceAllocation = () => {
  const resourceAllocations = getResourceAllocations();
  
  // Colors for the pie chart
  const COLORS = ['#8B5CF6', '#A78BFA', '#C4B5FD', '#DDD6FE', '#EDE9FE', '#F5F3FF'];
  
  // Calculate total allocated and recommended
  const totalAllocated = resourceAllocations.reduce((sum, item) => sum + item.allocated, 0);
  const totalRecommended = resourceAllocations.reduce((sum, item) => sum + item.recommended, 0);
  
  // Format for pie chart
  const pieData = resourceAllocations.map(item => ({
    name: item.category,
    value: item.recommended
  }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Current Budget</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">$52.4M</p>
            <p className="text-sm text-muted-foreground">Annual allocation</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Recommended</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">$68.9M</p>
            <p className="text-sm text-muted-foreground">Based on predictions</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Funding Gap</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-amber-500">$16.5M</p>
            <p className="text-sm text-muted-foreground">Additional needed</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Efficiency Score</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-theme-indigo">76%</p>
            <p className="text-sm text-muted-foreground">Current allocation</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Resource Allocation Comparison</CardTitle>
            <CardDescription>Current vs Recommended allocation (%)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={resourceAllocations}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value}%`, '']} />
                  <Legend />
                  <Bar dataKey="allocated" name="Current Allocation" fill="#A78BFA" />
                  <Bar dataKey="recommended" name="Recommended" fill="#8B5CF6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recommended Resource Distribution</CardTitle>
            <CardDescription>Optimal allocation by program area</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    outerRadius={110}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'Recommended Allocation']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Resource Allocation Recommendations</CardTitle>
          <CardDescription>Key suggestions based on risk prediction model</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <h4 className="font-semibold text-amber-800 mb-2">High Priority Counties</h4>
              <p className="text-amber-700">Increase ARV distribution to Homa Bay, Kisumu, and Siaya counties by 25% to address the very high prevalence rates.</p>
            </div>
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">PrEP Distribution</h4>
              <p className="text-blue-700">Expand PrEP availability in high-risk urban areas, targeting a 40% increase in coverage for vulnerable populations.</p>
            </div>
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
              <h4 className="font-semibold text-emerald-800 mb-2">Education Programs</h4>
              <p className="text-emerald-700">Allocate additional resources to prevention education in the 15-24 age group, which shows rising infection rates in several counties.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResourceAllocation;
