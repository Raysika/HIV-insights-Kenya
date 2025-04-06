// import hivData from '@/data/hiv_dataset.json';

// export interface HIVData {
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

// export const getHIVData = (): HIVData[] => {
//   return hivData;
// };

// export const getCounties = (): string[] => {
//   return [...new Set(hivData
//     .filter(item => item.Level === 'County')
//     .map(item => item.Region)
//   )];
// };

// export const getSubCounties = (): string[] => {
//   return [...new Set(hivData
//     .filter(item => item.Level === 'Subcounty')
//     .map(item => item.Region)
//   )];
// };

// export const getFilteredData = (filters: {
//   searchTerm?: string;
//   county?: string;
//   level?: string;
//   minPrevalence?: number;
//   maxPrevalence?: number;
// }): HIVData[] => {
//   let result = [...hivData];
  
//   if (filters.searchTerm) {
//     result = result.filter(item => 
//       item.Region.toLowerCase().includes(filters.searchTerm!.toLowerCase())
//     );
//   }
  
//   if (filters.county) {
//     result = result.filter(item => 
//       item.Level === 'County' ? item.Region === filters.county : true
//     );
//   }
  
//   if (filters.level) {
//     result = result.filter(item => item.Level === filters.level);
//   }
  
//   if (filters.minPrevalence !== undefined) {
//     result = result.filter(item => 
//       item['HIV Prevelance(All sexes)'] >= filters.minPrevalence!
//     );
//   }
  
//   if (filters.maxPrevalence !== undefined) {
//     result = result.filter(item => 
//       item['HIV Prevelance(All sexes)'] <= filters.maxPrevalence!
//     );
//   }
  
//   return result;
// };