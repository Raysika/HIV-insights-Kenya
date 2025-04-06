import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import hivData from '@/components/data/hiv_dataset.json'; // Make sure the path is correct

const colors = ['#6366F1', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

const DataPanel = () => {
  const [search, setSearch] = useState('');
  const [level, setLevel] = useState('');
  const [region, setRegion] = useState('');
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    setData(hivData); // Load static data
  }, []);

  useEffect(() => {
    const filtered = data.filter((item) => {
      return (
        (!search || item.Region?.toLowerCase().includes(search.toLowerCase())) &&
        (!level || item.Level === level) &&
        (!region || item.Region === region)
      );
    });
    setFilteredData(filtered);
  }, [search, level, region, data]);

  // Derive unique values for level and region dropdowns
  const levels = Array.from(new Set(data.map((item) => item.Level).filter(Boolean)));
  const regions = Array.from(new Set(data.map((item) => item.Region).filter(Boolean)));

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Filter Dataset</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Input
            placeholder="Search region..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <Select value={level} onValueChange={setLevel}>
            <SelectTrigger>
              <SelectValue placeholder="Select Level" />
            </SelectTrigger>
            <SelectContent>
              {levels.map((lvl, i) => (
                <SelectItem key={i} value={lvl}>{lvl}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={region} onValueChange={setRegion}>
            <SelectTrigger>
              <SelectValue placeholder="Select Region" />
            </SelectTrigger>
            <SelectContent>
              {regions.map((r, i) => (
                <SelectItem key={i} value={r}>{r}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Dataset Table</CardTitle>
        </CardHeader>
        <CardContent className="overflow-auto max-h-[400px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Level</TableHead>
                <TableHead>Region</TableHead>
                <TableHead>Prevalence (%)</TableHead>
                <TableHead>Incidence/1000</TableHead>
                <TableHead>Deaths</TableHead>
                <TableHead>New Infections</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((row, i) => (
                <TableRow key={i}>
                  <TableCell>{row.Level}</TableCell>
                  <TableCell>{row.Region}</TableCell>
                  <TableCell>{row['HIV Prevelance(All sexes)']}</TableCell>
                  <TableCell>{row['Incidence (per 1000)']}</TableCell>
                  <TableCell>{row['Deaths(All)']}</TableCell>
                  <TableCell>{row['New Infections']}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>New Infections by Region</CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={filteredData.slice(0, 10)}>
                <XAxis dataKey="Region" hide />
                <YAxis />
                <Tooltip />
                <Bar dataKey="New Infections" fill="#6366F1" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>HIV Prevalence Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={filteredData.slice(0, 5)}
                  dataKey="HIV Prevelance(All sexes)"
                  nameKey="Region"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {filteredData.slice(0, 5).map((_, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DataPanel;
