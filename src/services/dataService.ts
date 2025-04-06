
// Simulated data service for Kenya HIV insights dashboard

export interface CountyData {
  id: string;
  name: string;
  prevalenceRate: number;
  coordinates: [number, number]; // Lat, Lng for county center
  newInfections: number;
  artCoverage: number;
  dropoutRate: number;
  riskLevel: 'low' | 'medium' | 'high' | 'veryHigh';
  ageGroups: {
    label: string;
    prevalence: number;
  }[];
  genderData: {
    gender: string;
    prevalence: number;
  }[];
}

export interface TrendData {
  year: number;
  newInfections: number;
  prevalenceRate: number;
  artCoverage: number;
}

export interface ResourceAllocation {
  category: string;
  allocated: number;
  recommended: number;
}

// Simulated counties data
export const getCountiesData = (): CountyData[] => {
  return [
    {
      id: '001',
      name: 'Nairobi',
      prevalenceRate: 6.1,
      coordinates: [-1.286389, 36.817223],
      newInfections: 5200,
      artCoverage: 78.3,
      dropoutRate: 12.5,
      riskLevel: 'high',
      ageGroups: [
        { label: '15-24', prevalence: 2.8 },
        { label: '25-34', prevalence: 7.2 },
        { label: '35-49', prevalence: 8.5 },
        { label: '50+', prevalence: 5.1 }
      ],
      genderData: [
        { gender: 'Male', prevalence: 5.2 },
        { gender: 'Female', prevalence: 7.0 }
      ]
    },
    {
      id: '002',
      name: 'Kisumu',
      prevalenceRate: 16.3,
      coordinates: [-0.102222, 34.761944],
      newInfections: 4800,
      artCoverage: 81.5,
      dropoutRate: 10.2,
      riskLevel: 'veryHigh',
      ageGroups: [
        { label: '15-24', prevalence: 8.1 },
        { label: '25-34', prevalence: 19.2 },
        { label: '35-49', prevalence: 22.5 },
        { label: '50+', prevalence: 15.1 }
      ],
      genderData: [
        { gender: 'Male', prevalence: 14.8 },
        { gender: 'Female', prevalence: 17.8 }
      ]
    },
    {
      id: '003',
      name: 'Homa Bay',
      prevalenceRate: 20.7,
      coordinates: [-0.527778, 34.456944],
      newInfections: 5500,
      artCoverage: 85.2,
      dropoutRate: 8.5,
      riskLevel: 'veryHigh',
      ageGroups: [
        { label: '15-24', prevalence: 10.2 },
        { label: '25-34', prevalence: 24.5 },
        { label: '35-49', prevalence: 27.8 },
        { label: '50+', prevalence: 19.2 }
      ],
      genderData: [
        { gender: 'Male', prevalence: 18.5 },
        { gender: 'Female', prevalence: 22.9 }
      ]
    },
    {
      id: '004',
      name: 'Siaya',
      prevalenceRate: 15.3,
      coordinates: [0.060278, 34.287778],
      newInfections: 3900,
      artCoverage: 79.8,
      dropoutRate: 11.3,
      riskLevel: 'veryHigh',
      ageGroups: [
        { label: '15-24', prevalence: 7.5 },
        { label: '25-34', prevalence: 18.2 },
        { label: '35-49', prevalence: 20.4 },
        { label: '50+', prevalence: 14.2 }
      ],
      genderData: [
        { gender: 'Male', prevalence: 13.6 },
        { gender: 'Female', prevalence: 17.0 }
      ]
    },
    {
      id: '005',
      name: 'Mombasa',
      prevalenceRate: 4.1,
      coordinates: [-4.043333, 39.658889],
      newInfections: 2800,
      artCoverage: 72.5,
      dropoutRate: 14.7,
      riskLevel: 'medium',
      ageGroups: [
        { label: '15-24', prevalence: 1.9 },
        { label: '25-34', prevalence: 5.2 },
        { label: '35-49', prevalence: 5.8 },
        { label: '50+', prevalence: 3.1 }
      ],
      genderData: [
        { gender: 'Male', prevalence: 3.5 },
        { gender: 'Female', prevalence: 4.7 }
      ]
    },
    {
      id: '006',
      name: 'Nakuru',
      prevalenceRate: 3.2,
      coordinates: [-0.283333, 36.066667],
      newInfections: 1800,
      artCoverage: 69.8,
      dropoutRate: 15.3,
      riskLevel: 'medium',
      ageGroups: [
        { label: '15-24', prevalence: 1.4 },
        { label: '25-34', prevalence: 4.1 },
        { label: '35-49', prevalence: 4.8 },
        { label: '50+', prevalence: 2.5 }
      ],
      genderData: [
        { gender: 'Male', prevalence: 2.8 },
        { gender: 'Female', prevalence: 3.6 }
      ]
    },
    {
      id: '007',
      name: 'Kiambu',
      prevalenceRate: 2.8,
      coordinates: [-1.171389, 36.830278],
      newInfections: 1500,
      artCoverage: 68.2,
      dropoutRate: 16.1,
      riskLevel: 'low',
      ageGroups: [
        { label: '15-24', prevalence: 1.2 },
        { label: '25-34', prevalence: 3.5 },
        { label: '35-49', prevalence: 4.2 },
        { label: '50+', prevalence: 2.1 }
      ],
      genderData: [
        { gender: 'Male', prevalence: 2.4 },
        { gender: 'Female', prevalence: 3.2 }
      ]
    },
    {
      id: '008',
      name: 'Turkana',
      prevalenceRate: 1.9,
      coordinates: [3.116667, 35.6],
      newInfections: 900,
      artCoverage: 58.5,
      dropoutRate: 22.3,
      riskLevel: 'low',
      ageGroups: [
        { label: '15-24', prevalence: 0.8 },
        { label: '25-34', prevalence: 2.3 },
        { label: '35-49', prevalence: 2.9 },
        { label: '50+', prevalence: 1.4 }
      ],
      genderData: [
        { gender: 'Male', prevalence: 1.6 },
        { gender: 'Female', prevalence: 2.2 }
      ]
    }
  ];
};

// Simulated trend data for past years
export const getTrendData = (): TrendData[] => {
  return [
    { year: 2016, newInfections: 46000, prevalenceRate: 5.9, artCoverage: 60.3 },
    { year: 2017, newInfections: 44000, prevalenceRate: 5.6, artCoverage: 64.8 },
    { year: 2018, newInfections: 41500, prevalenceRate: 5.4, artCoverage: 69.5 },
    { year: 2019, newInfections: 38200, prevalenceRate: 5.2, artCoverage: 73.2 },
    { year: 2020, newInfections: 35800, prevalenceRate: 4.9, artCoverage: 76.8 },
    { year: 2021, newInfections: 33400, prevalenceRate: 4.7, artCoverage: 79.5 },
    { year: 2022, newInfections: 31200, prevalenceRate: 4.5, artCoverage: 82.1 }
  ];
};

// Simulated resource allocation recommendations
export const getResourceAllocations = (): ResourceAllocation[] => {
  return [
    { category: 'ARVs', allocated: 45, recommended: 52 },
    { category: 'PrEP', allocated: 20, recommended: 28 },
    { category: 'Testing Kits', allocated: 15, recommended: 18 },
    { category: 'Counseling', allocated: 10, recommended: 14 },
    { category: 'Education', allocated: 8, recommended: 12 },
    { category: 'Research', allocated: 2, recommended: 6 }
  ];
};

// Risk factors data
export const getRiskFactors = () => {
  return [
    { factor: 'Socioeconomic Status', impact: 78 },
    { factor: 'Education Level', impact: 65 },
    { factor: 'Access to Healthcare', impact: 82 },
    { factor: 'Cultural Practices', impact: 56 },
    { factor: 'Urban vs Rural', impact: 72 },
    { factor: 'Age Demographics', impact: 68 }
  ];
};

// Get risk color based on prevalence rate
export const getRiskColor = (prevalence: number): string => {
  if (prevalence >= 15) return '#b91c1c'; // Very high - dark red
  if (prevalence >= 7.5) return '#ef4444'; // High - red
  if (prevalence >= 3) return '#fb923c'; // Medium - orange
  return '#38bdf8'; // Low - blue
};

// Get risk level based on prevalence rate
export const getRiskLevel = (prevalence: number): string => {
  if (prevalence >= 15) return 'Very High';
  if (prevalence >= 7.5) return 'High';
  if (prevalence >= 3) return 'Medium';
  return 'Low';
};
