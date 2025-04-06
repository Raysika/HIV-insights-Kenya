
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Tooltip, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { getCountiesData, getRiskColor, CountyData } from '@/services/dataService';
import CountyDetails from './CountyDetails';

// A component to set the view when selected county changes
const ChangeMapView = ({ center, zoom }: { center: [number, number]; zoom: number }) => {
  const map = useMap();
  map.setView(center, zoom);
  return null;
};

const KenyaMap = () => {
  const [counties, setCounties] = useState<CountyData[]>([]);
  const [selectedCounty, setSelectedCounty] = useState<CountyData | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([0.0236, 37.9062]); // Kenya center
  const [mapZoom, setMapZoom] = useState(6);

  useEffect(() => {
    // Load the simulated counties data
    const data = getCountiesData();
    setCounties(data);
  }, []);

  const handleCountyClick = (county: CountyData) => {
    setSelectedCounty(county);
    setMapCenter(county.coordinates);
    setMapZoom(8);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[calc(100vh-8rem)]">
      <div className="lg:col-span-2 bg-white rounded-lg shadow-md overflow-hidden h-full">
        <div className="h-full relative">
          <MapContainer 
            center={mapCenter} 
            zoom={mapZoom} 
            style={{ height: '100%', width: '100%' }}
            zoomControl={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {counties.map((county) => (
              <CircleMarker
                key={county.id}
                center={county.coordinates}
                radius={Math.max(10, county.prevalenceRate * 0.8)} // Size based on prevalence
                pathOptions={{
                  fillColor: getRiskColor(county.prevalenceRate),
                  color: 'white',
                  weight: 1,
                  fillOpacity: 0.7
                }}
                eventHandlers={{
                  click: () => handleCountyClick(county)
                }}
              >
                <Tooltip>
                  <div className="font-semibold">{county.name}</div>
                  <div>Prevalence: {county.prevalenceRate}%</div>
                </Tooltip>
              </CircleMarker>
            ))}
            <ChangeMapView center={mapCenter} zoom={mapZoom} />
          </MapContainer>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4 overflow-auto h-full">
        {selectedCounty ? (
          <CountyDetails county={selectedCounty} />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Kenya HIV Insights</h3>
            <p className="text-gray-600 mb-4">Click on a county marker to view detailed statistics.</p>
            <div className="grid grid-cols-2 gap-4 w-full max-w-md">
              {[
                { label: 'High Risk', color: '#b91c1c' },
                { label: 'Moderate Risk', color: '#ef4444' },
                { label: 'Medium Risk', color: '#fb923c' },
                { label: 'Low Risk', color: '#38bdf8' }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm text-gray-700">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default KenyaMap;
