
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getRiskFactors, getTrendData } from '@/services/dataService';
import { AlertCircle, TrendingDown, TrendingUp } from 'lucide-react';
import { BarChart, LineChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const RiskPrediction = () => {
  const riskFactors = getRiskFactors();
  const trendData = getTrendData();
  
  // Calculate the percent changes
  const latestYearIndex = trendData.length - 1;
  const previousYearIndex = latestYearIndex - 1;
  
  const newInfectionsChange = (
    (trendData[latestYearIndex].newInfections - trendData[previousYearIndex].newInfections) / 
    trendData[previousYearIndex].newInfections
  ) * 100;
  
  const prevalenceChange = (
    (trendData[latestYearIndex].prevalenceRate - trendData[previousYearIndex].prevalenceRate) / 
    trendData[previousYearIndex].prevalenceRate
  ) * 100;
  
  const artCoverageChange = (
    (trendData[latestYearIndex].artCoverage - trendData[previousYearIndex].artCoverage) / 
    trendData[previousYearIndex].artCoverage
  ) * 100;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">New Infections</CardTitle>
            <CardDescription>Annual new HIV cases</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <p className="text-2xl font-bold">{trendData[latestYearIndex].newInfections.toLocaleString()}</p>
              <div className={`flex items-center ${newInfectionsChange < 0 ? 'text-green-500' : 'text-red-500'}`}>
                {newInfectionsChange < 0 ? (
                  <TrendingDown className="h-4 w-4 mr-1" />
                ) : (
                  <TrendingUp className="h-4 w-4 mr-1" />
                )}
                <span>{Math.abs(newInfectionsChange).toFixed(1)}%</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Prevalence Rate</CardTitle>
            <CardDescription>National HIV prevalence</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <p className="text-2xl font-bold">{trendData[latestYearIndex].prevalenceRate}%</p>
              <div className={`flex items-center ${prevalenceChange < 0 ? 'text-green-500' : 'text-red-500'}`}>
                {prevalenceChange < 0 ? (
                  <TrendingDown className="h-4 w-4 mr-1" />
                ) : (
                  <TrendingUp className="h-4 w-4 mr-1" />
                )}
                <span>{Math.abs(prevalenceChange).toFixed(1)}%</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">ART Coverage</CardTitle>
            <CardDescription>Antiretroviral therapy</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <p className="text-2xl font-bold">{trendData[latestYearIndex].artCoverage}%</p>
              <div className={`flex items-center ${artCoverageChange > 0 ? 'text-green-500' : 'text-red-500'}`}>
                {artCoverageChange > 0 ? (
                  <TrendingUp className="h-4 w-4 mr-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 mr-1" />
                )}
                <span>{Math.abs(artCoverageChange).toFixed(1)}%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Prediction Alert</AlertTitle>
        <AlertDescription>
          Based on current trends, we predict a 12% decrease in new infections over the next year if current intervention programs are maintained.
        </AlertDescription>
      </Alert>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Key Risk Factors</CardTitle>
            <CardDescription>Factors influencing HIV prevalence</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={riskFactors}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 100]} />
                  <YAxis dataKey="factor" type="category" width={120} />
                  <Tooltip formatter={(value) => [`${value}%`, 'Impact Score']} />
                  <Bar dataKey="impact" fill="#8B5CF6" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>HIV Trends (2016-2022)</CardTitle>
            <CardDescription>Historical data on key metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={trendData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis yAxisId="left" orientation="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="newInfections" name="New Infections" stroke="#ef4444" activeDot={{ r: 8 }} />
                  <Line yAxisId="right" type="monotone" dataKey="prevalenceRate" name="Prevalence Rate %" stroke="#8B5CF6" />
                  <Line yAxisId="right" type="monotone" dataKey="artCoverage" name="ART Coverage %" stroke="#10b981" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RiskPrediction;
