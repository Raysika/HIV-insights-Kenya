
import React from 'react';
import { CountyData, getRiskLevel } from '@/services/dataService';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, LineChart, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface CountyDetailsProps {
  county: CountyData;
}

const CountyDetails = ({ county }: CountyDetailsProps) => {
  // Color based on risk level
  const getRiskColorClass = (riskLevel: string) => {
    switch (riskLevel.toLowerCase()) {
      case 'veryhigh': return 'bg-risk-veryHigh';
      case 'high': return 'bg-risk-high';
      case 'medium': return 'bg-risk-medium';
      case 'low': return 'bg-risk-low';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{county.name} County</h2>
        <div className={`${getRiskColorClass(county.riskLevel)} text-white px-3 py-1 rounded-full text-sm font-medium`}>
          {getRiskLevel(county.prevalenceRate)}
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-base">Prevalence Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{county.prevalenceRate}%</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-base">ART Coverage</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{county.artCoverage}%</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-base">New Infections</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{county.newInfections.toLocaleString()}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-base">Dropout Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{county.dropoutRate}%</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>HIV Prevalence by Age Group</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={county.ageGroups}
                margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="label" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value}%`, 'Prevalence']} />
                <Bar dataKey="prevalence" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>HIV Prevalence by Gender</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={county.genderData}
                margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="gender" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value}%`, 'Prevalence']} />
                <Bar dataKey="prevalence" fill="#6366F1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CountyDetails;
