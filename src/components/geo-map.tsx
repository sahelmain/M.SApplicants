"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { 
  ComposableMap, 
  Geographies, 
  Geography, 
  ZoomableGroup
} from 'react-simple-maps';
import { scaleLinear } from 'd3-scale';
import { feature } from 'topojson-client';

// Use a simplified world geometry
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// Define types
type CountryData = {
  name: string;
  count: number;
};

type GeoMapProps = {
  data: CountryData[];
};

const GeoMap: React.FC<GeoMapProps> = ({ data }) => {
  // Position map higher by shifting center coordinates northward
  const [position, setPosition] = useState({ coordinates: [0, -20], zoom: 1 });
  const [features, setFeatures] = useState<any[]>([]);

  // Memoize the color scale for performance
  const colorScale = useMemo(() => {
    const counts = data.map(d => d.count);
    const maxCount = Math.max(...(counts.length ? counts : [0]));
    
    return scaleLinear<string>()
      .domain([0, maxCount])
      .range(['#e0f7fa', '#0288d1']);
  }, [data]);

  // Debug data availability
  useEffect(() => {
    console.log('GeoMap data:', data);
  }, [data]);

  // Get top countries by applicant count
  const topCountries = useMemo(() => {
    return [...data]
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }, [data]);

  // Fetch and convert TopoJSON to GeoJSON features
  useEffect(() => {
    fetch(geoUrl)
      .then(res => res.json())
      .then(topo => {
        const geojson = feature(topo as any, (topo as any).objects.countries) as any;
        setFeatures(geojson.features);
      })
      .catch(err => console.error('Failed to load topology', err));
  }, []);

  // Find the count for a given country with more flexible matching
  const getCount = (geo: any) => {
    if (!geo?.properties) return 0;

    // Get country name from the map data
    const geoName = geo.properties.name || '';
    
    // Try to find an exact match first
    let found = data.find(d => d.name === geoName);
    
    // If no exact match, try case-insensitive match
    if (!found) {
      found = data.find(d => 
        d.name.toLowerCase() === geoName.toLowerCase()
      );
    }
    
    // If still no match, try to see if the country name is contained in the data name
    if (!found) {
      found = data.find(d => 
        d.name.toLowerCase().includes(geoName.toLowerCase()) || 
        geoName.toLowerCase().includes(d.name.toLowerCase())
      );
    }
    
    return found ? found.count : 0;
  };

  // Handle zoom
  const handleZoomIn = () => {
    if (position.zoom >= 4) return;
    setPosition(pos => ({ ...pos, zoom: pos.zoom * 1.5 }));
  };

  const handleZoomOut = () => {
    if (position.zoom <= 1) return;
    setPosition(pos => ({ ...pos, zoom: pos.zoom / 1.5 }));
  };

  const handleMoveEnd = (position: any) => {
    setPosition(position);
  };

  return (
    <div className="relative h-full w-full">
      <div className="relative">
        <div className="absolute top-4 right-4 flex flex-col space-y-2 z-10">
        <button 
          onClick={handleZoomIn}
          className="p-2 rounded-md bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20"
        >
          +
        </button>
        <button 
          onClick={handleZoomOut}
          className="p-2 rounded-md bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20"
        >
          -
        </button>
      </div>
      
      <ComposableMap 
        width={900} 
        height={500} 
        projectionConfig={{ scale: 140, center: [0, -15] }}
        style={{ width: "100%", height: "100%" }}
      >
        <ZoomableGroup
          zoom={position.zoom}
          center={position.coordinates as [number, number]}
          onMoveEnd={handleMoveEnd}
        >
          <Geographies geography={{ type: 'FeatureCollection', features }}>
            {({ geographies }) => {
              // Debug geographies
              if (geographies.length === 0) {
                console.error('No geographies loaded');
              } else if (!geographies[0].properties) {
                console.error('Geography properties missing', geographies[0]);
              }
              
              return geographies.map((geo: any) => {
                const count = getCount(geo);
                return (
                  <Geography
                    key={geo.rsmKey || geo.properties.name || Math.random()}
                    geography={geo}
                    fill={count ? colorScale(count) : "#D3D3D3"}
                    stroke="#FFFFFF"
                    strokeWidth={0.5}
                    style={{
                      default: { outline: "none" },
                      hover: { 
                        outline: "none", 
                        fill: count ? "#4FC3F7" : "#D3D3D3",
                        stroke: "#FFFFFF",
                        strokeWidth: 1 
                      },
                      pressed: { outline: "none" }
                    }}
                  />
                );
              });
            }}
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
      
      {/* Moved legend from left to right and adjusted padding/spacing */}
      <div className="absolute bottom-4 right-4 w-64 bg-white/10 backdrop-blur-md p-4 rounded-md border border-white/20">
        <div className="flex items-center">
          <div className="w-full h-2 bg-gradient-to-r from-[#e0f7fa] to-[#0288d1] rounded"></div>
        </div>
      </div>
        
        {/* Top Countries Panel - Positioned on empty area of the map */}
        <div className="absolute top-[55%] left-[15%] w-36 bg-white/5 backdrop-blur-sm p-3 rounded-lg shadow-sm z-10">
          <h3 className="text-white text-xs font-medium mb-2">Top Countries</h3>
          <ul className="space-y-2">
            {topCountries.map((country, i) => (
              <li key={country.name} className="flex justify-between items-center">
                <span className="text-white text-[10px]">{i+1}. {country.name}</span>
                <span className="text-white text-[10px] font-bold">{country.count}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default GeoMap;
