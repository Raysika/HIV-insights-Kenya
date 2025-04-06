// import React, { useState, useEffect } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
// import { ChevronDown, Filter, Search } from 'lucide-react';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
// import hivData from '@/data/hiv_dataset.json';

// interface HIVData {
//   Level: string;
//   Region: string;
//   'PLHIV(All sexes)': number;
//   'HIV Prevelance(All sexes)': number;
//   'Incidence (per 1000)': number;
//   'Deaths(All)': number;
//   'New Infections': number;
//   'PMTCT Need': number;
//   'PMTCT Receiving': number;
// }

// const COLORS = ['#8B5CF6', '#A78BFA', '#C4B5FD', '#DDD6FE', '#EDE9FE'];

// const DataVisualizationPanel = () => {
//   const [filteredData, setFilteredData] = useState<HIVData[]>(hivData);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCounty, setSelectedCounty] = useState<string>('All');
//   const [selectedLevel, setSelectedLevel] = useState<string>('All');
//   const [selectedPrevalenceRange, setSelectedPrevalenceRange] = useState<[number, number]>([0, 25]);

//   // Extract unique counties and levels for filters
//   const counties = ['All', ...new Set(hivData.map(item => {
//     if (item.Level === 'County') return item.Region;
//     return '';
//   }).filter(Boolean))];

//   const levels = ['All', ...new Set(hivData.map(item => item.Level))];

//   // Filter data based on selected filters
//   useEffect(() => {
//     let result = [...hivData];
    
//     if (searchTerm) {
//       result = result.filter(item => 
//         item.Region.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }
    
//     if (selectedCounty !== 'All') {
//       result = result.filter(item => 
//         item.Level === 'County' ? item.Region === selectedCounty : true
//       );
//     }
    
//     if (selectedLevel !== 'All') {
//       result = result.filter(item => item.Level === selectedLevel);
//     }
    
//     result = result.filter(item => 
//       item['HIV Prevelance(All sexes)'] >= selectedPrevalenceRange[0] && 
//       item['HIV Prevelance(All sexes)'] <= selectedPrevalenceRange[1]
//     );
    
//     setFilteredData(result);
//   }, [searchTerm, selectedCounty, selectedLevel, selectedPrevalenceRange]);

//   // Prepare data for charts
//   const countyPrevalenceData = hivData
//     .filter(item => item.Level === 'County')
//     .sort((a, b) => b['HIV Prevelance(All sexes)'] - a['HIV Prevelance(All sexes)'])
//     .slice(0, 10)
//     .map(item => ({
//       name: item.Region,
//       prevalence: item['HIV Prevelance(All sexes)'],
//       newInfections: item['New Infections'],
//     }));

//   const levelDistributionData = levels
//     .filter(level => level !== 'All')
//     .map(level => ({
//       name: level,
//       value: hivData.filter(item => item.Level === level).length,
//     }));

//   return (
//     <div className="space-y-6">
//       {/* Filters Section */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Data Filters</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//             <div className="relative">
//               <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//               <Input
//                 placeholder="Search region..."
//                 className="pl-9"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
            
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button variant="outline" className="w-full justify-between">
//                   {selectedCounty}
//                   <ChevronDown className="ml-2 h-4 w-4" />
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent className="w-[200px] max-h-[300px] overflow-y-auto">
//                 {counties.map((county) => (
//                   <DropdownMenuItem 
//                     key={county} 
//                     onClick={() => setSelectedCounty(county)}
//                   >
//                     {county}
//                   </DropdownMenuItem>
//                 ))}
//               </DropdownMenuContent>
//             </DropdownMenu>
            
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button variant="outline" className="w-full justify-between">
//                   {selectedLevel}
//                   <ChevronDown className="ml-2 h-4 w-4" />
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent className="w-[200px]">
//                 {levels.map((level) => (
//                   <DropdownMenuItem 
//                     key={level} 
//                     onClick={() => setSelectedLevel(level)}
//                   >
//                     {level}
//                   </DropdownMenuItem>
//                 ))}
//               </DropdownMenuContent>
//             </DropdownMenu>
            
//             <div className="flex items-center gap-2">
//               <span className="text-sm text-muted-foreground">
//                 Prevalence: {selectedPrevalenceRange[0]}% - {selectedPrevalenceRange[1]}%
//               </span>
//               <Button 
//                 variant="outline" 
//                 size="icon"
//                 onClick={() => setSelectedPrevalenceRange([0, 25])}
//               >
//                 <Filter className="h-4 w-4" />
//               </Button>
//             </div>
//           </div>
//         </CardContent>
//       </Card>
      
//       {/* Charts Section */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <Card>
//           <CardHeader>
//             <CardTitle>Top 10 Counties by HIV Prevalence</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="h-80">
//               <ResponsiveContainer width="100%" height="100%">
//                 <BarChart
//                   data={countyPrevalenceData}
//                   layout="vertical"
//                   margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//                 >
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis type="number" />
//                   <YAxis dataKey="name" type="category" width={100} />
//                   <Tooltip 
//                     formatter={(value, name) => [`${value}${name === 'prevalence' ? '%' : ''}`, name === 'prevalence' ? 'Prevalence' : 'New Infections']}
//                   />
//                   <Legend />
//                   <Bar dataKey="prevalence" fill="#8B5CF6" name="Prevalence %" />
//                   <Bar dataKey="newInfections" fill="#A78BFA" name="New Infections" />
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>
//           </CardContent>
//         </Card>
        
//         <Card>
//           <CardHeader>
//             <CardTitle>Data Distribution by Level</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="h-80">
//               <ResponsiveContainer width="100%" height="100%">
//                 <PieChart>
//                   <Pie
//                     data={levelDistributionData}
//                     cx="50%"
//                     cy="50%"
//                     labelLine={false}
//                     outerRadius={80}
//                     fill="#8884d8"
//                     dataKey="value"
//                     label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
//                   >
//                     {levelDistributionData.map((entry, index) => (
//                       <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                     ))}
//                   </Pie>
//                   <Tooltip formatter={(value) => [`${value} records`, 'Count']} />
//                   <Legend />
//                 </PieChart>
//               </ResponsiveContainer>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
      
//       {/* Data Table Section */}
//       <Card>
//         <CardHeader>
//           <CardTitle>HIV Dataset</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="rounded-md border">
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Level</TableHead>
//                   <TableHead>Region</TableHead>
//                   <TableHead>PLHIV</TableHead>
//                   <TableHead>Prevalence %</TableHead>
//                   <TableHead>Incidence</TableHead>
//                   <TableHead>Deaths</TableHead>
//                   <TableHead>New Infections</TableHead>
//                   <TableHead>PMTCT Need</TableHead>
//                   <TableHead>PMTCT Receiving</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {filteredData.length > 0 ? (
//                   filteredData.map((item, index) => (
//                     <TableRow key={index}>
//                       <TableCell>{item.Level}</TableCell>
//                       <TableCell className="font-medium">{item.Region}</TableCell>
//                       <TableCell>{item['PLHIV(All sexes)'].toLocaleString()}</TableCell>
//                       <TableCell>{item['HIV Prevelance(All sexes)']}</TableCell>
//                       <TableCell>{item['Incidence (per 1000)']}</TableCell>
//                       <TableCell>{item['Deaths(All)']}</TableCell>
//                       <TableCell>{item['New Infections']}</TableCell>
//                       <TableCell>{item['PMTCT Need']}</TableCell>
//                       <TableCell>{item['PMTCT Receiving']}</TableCell>
//                     </TableRow>
//                   ))
//                 ) : (
//                   <TableRow>
//                     <TableCell colSpan={9} className="h-24 text-center">
//                       No results found
//                     </TableCell>
//                   </TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           </div>
//           {filteredData.length > 0 && (
//             <div className="flex items-center justify-end space-x-2 py-4">
//               <div className="text-sm text-muted-foreground">
//                 Showing {filteredData.length} of {hivData.length} records
//               </div>
//             </div>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default DataVisualizationPanel;