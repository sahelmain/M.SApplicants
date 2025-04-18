"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GlassCard } from '@/components/ui/glass-card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ThemeToggle } from '@/components/theme-toggle';
import { useQuery } from '@tanstack/react-query';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { List, LayoutGrid } from 'lucide-react';
import GeoMap from '@/components/geo-map';

type Applicant = {
  id: string;
  GPA: number;
  GRE_Total: number;
  IELTS_Score: number;
  Country: string;
  Program: string;
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

export default function Home() {
  const { data: applicants, isLoading, error } = useQuery<Applicant[]>({
    queryKey: ['applicants'],
    queryFn: () => fetch('/applicants.json').then(res => res.json()),
  });

  const [stats, setStats] = useState({
    avgGPA: 0,
    avgGRE: 0,
    avgIELTS: 0,
    totalApplicants: 0,
    totalCountries: 0,
  });

  const [countryData, setCountryData] = useState<{ name: string; count: number }[]>([]);
  const [programData, setProgramData] = useState<{ name: string; value: number }[]>([]);

  // Search/filter state for Applicants table
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const filteredApplicants = applicants?.filter(applicant =>
    Object.values(applicant).some(val =>
      String(val).toLowerCase().includes(search.toLowerCase())
    )
  ) ?? [];

  useEffect(() => {
    if (applicants) {
      // Calculate basic stats
      const avgGPA = applicants.reduce((acc, curr) => acc + curr.GPA, 0) / applicants.length;
      const validGRE = applicants.filter(a => a.GRE_Total > 0);
      const avgGRE = validGRE.length ? validGRE.reduce((acc, curr) => acc + curr.GRE_Total, 0) / validGRE.length : 0;
      const validIELTS = applicants.filter(a => a.IELTS_Score > 0);
      const avgIELTS = validIELTS.length ? validIELTS.reduce((acc, curr) => acc + curr.IELTS_Score, 0) / validIELTS.length : 0;

      setStats({
        avgGPA: Number(avgGPA.toFixed(2)),
        avgGRE: Number(avgGRE.toFixed(1)),
        avgIELTS: Number(avgIELTS.toFixed(1)),
        totalApplicants: applicants.length,
        totalCountries: new Set(applicants.map(a => a.Country)).size,
      });

      // Process country distribution
      const countryCount = applicants.reduce((acc, curr) => {
        // Skip empty country names
        if (!curr.Country?.trim()) return acc;
        
        // Normalize country name to match map data
        let countryName = curr.Country.trim();
        
        // Map common country name variations to standard names
        const countryNameMap: Record<string, string> = {
          "USA": "United States",
          "US": "United States",
          "United States of America": "United States",
          "UK": "United Kingdom",
          "Great Britain": "United Kingdom",
          "England": "United Kingdom",
        };
        
        // Apply mapping if needed
        if (countryNameMap[countryName]) {
          countryName = countryNameMap[countryName];
        }
        
        acc[countryName] = (acc[countryName] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      // Process all countries for the map, not just top 10
      const allCountries = Object.entries(countryCount)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count);
        
      // Also keep the top 10 for other visualizations
      const sortedCountries = allCountries.slice(0, 10);

      // Log for debugging
      console.log('All countries data:', allCountries);
      
      setCountryData(allCountries);

      // Process program distribution
      const programCount = applicants.reduce((acc, curr) => {
        acc[curr.Program] = (acc[curr.Program] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const sortedPrograms = Object.entries(programCount)
        .map(([name, value]) => ({ name, value }))
        .filter(entry => entry.name.trim() !== '')
        .sort((a, b) => b.value - a.value);

      setProgramData(sortedPrograms);
    }
  }, [applicants]);

  if (isLoading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  if (error) return <div className="flex items-center justify-center min-h-screen">Error loading data</div>;

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Summary Statistics */}
        <div className="flex justify-around mb-8">
          <div className="text-center">
            <p className="text-5xl font-bold text-white">{stats.totalApplicants}</p>
            <p className="text-base text-slate-300">Total Applicants</p>
          </div>
          <div className="text-center">
            <p className="text-5xl font-bold text-white">{stats.totalCountries}</p>
            <p className="text-base text-slate-300">Countries</p>
          </div>
          <div className="text-center">
            <p className="text-5xl font-bold text-white">{stats.avgGPA}</p>
            <p className="text-base text-slate-300">Average GPA</p>
          </div>
          <div className="text-center">
            <p className="text-5xl font-bold text-white">{stats.avgIELTS}</p>
            <p className="text-base text-slate-300">Average IELTS</p>
          </div>
        </div>
        
        {/* Geographic Distribution Map */}
        <div className="pb-64">
          <GlassCard>
            <CardHeader>
              <CardTitle className="text-white">Geographic Distribution of Applicants</CardTitle>
              <p className="text-slate-300 text-sm">Heat map showing applicant concentration by country</p>
            </CardHeader>
            <CardContent className="h-[600px]">
              <GeoMap data={countryData} />
            </CardContent>
          </GlassCard>
        </div>

        {/* Country Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          <Card className="flex-1 min-w-[220px] bg-white/10 backdrop-blur-xl border-0">
            <CardHeader>
              <CardTitle className="text-white">Top 10 Countries</CardTitle>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={countryData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis dataKey="name" stroke="#fff" angle={-45} textAnchor="end" height={100} />
                  <YAxis stroke="#fff" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1f2937', border: 'none' }}
                    labelStyle={{ color: '#fff' }}
                  />
                  <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Program Distribution */}
          <Card className="flex-1 min-w-[220px] bg-white/10 backdrop-blur-xl border-0">
            <CardHeader>
              <CardTitle className="text-white">Program Distribution</CardTitle>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={programData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={180}
                    label={false}
                  >
                    {programData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend
                    layout="vertical"
                    verticalAlign="middle"
                    align="right"
                    wrapperStyle={{ paddingLeft: '1rem' }}
                    iconSize={8}
                    payload={programData.map((entry, index) => ({
                      id: `legend-${index}`,
                      value: entry.name,
                      type: 'square',
                      color: COLORS[index % COLORS.length],
                    }))}
                  />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1f2937', border: 'none' }}
                    labelStyle={{ color: '#fff' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* GPA Distribution */}
        <Card className="bg-white/10 backdrop-blur-xl border-0 mb-12">
          <CardHeader>
            <CardTitle className="text-white">GPA Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={(() => {
                  if (!applicants) return [];
                  const gpaRanges = applicants.reduce((acc, curr) => {
                    const range = (Math.floor(curr.GPA * 4) / 4).toFixed(2);
                    acc[range] = (acc[range] || 0) + 1;
                    return acc;
                  }, {} as Record<string, number>);

                  return Object.entries(gpaRanges)
                    .map(([gpa, count]) => ({ gpa, count }))
                    .sort((a, b) => Number(a.gpa) - Number(b.gpa));
                })()}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="gpa" stroke="#fff" />
                <YAxis stroke="#fff" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1f2937', border: 'none' }}
                  labelStyle={{ color: '#fff' }}
                />
                <Bar dataKey="count" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Tabs defaultValue="applications" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          <TabsContent value="applications">
            <GlassCard>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Applications List</h3>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => setViewMode('table')} 
                      className={`
                        relative p-3 rounded-xl overflow-hidden border transition-all duration-300 transform
                        flex items-center justify-center
                        ${viewMode === 'table' 
                          ? 'border-blue-500/30 text-white shadow-md before:opacity-100 scale-110' 
                          : 'border-transparent text-slate-400 hover:border-blue-500/20 hover:text-white hover:shadow-lg hover:shadow-blue-500/10 hover:scale-105 before:opacity-0 hover:before:opacity-30'}
                      `}
                    >
                      <span className="relative z-10"><List size={20} /></span>
                      <span className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-purple-600/30 transition-opacity duration-300 -z-10"></span>
                    </button>
                    <button 
                      onClick={() => setViewMode('grid')} 
                      className={`
                        relative p-3 rounded-xl overflow-hidden border transition-all duration-300 transform
                        flex items-center justify-center
                        ${viewMode === 'grid' 
                          ? 'border-blue-500/30 text-white shadow-md before:opacity-100 scale-110' 
                          : 'border-transparent text-slate-400 hover:border-blue-500/20 hover:text-white hover:shadow-lg hover:shadow-blue-500/10 hover:scale-105 before:opacity-0 hover:before:opacity-30'}
                      `}
                    >
                      <span className="relative z-10"><LayoutGrid size={20} /></span>
                      <span className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-purple-600/30 transition-opacity duration-300 -z-10"></span>
                    </button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div>
                  <Input placeholder="Search by any field…" value={search} onChange={e => setSearch(e.target.value)} className="mb-4 w-full" />
                  {viewMode === 'table' ? (
                    <div className="overflow-x-auto">
                      <table className="min-w-full bg-white dark:bg-slate-800 rounded-lg shadow overflow-hidden">
                        <thead className="bg-gray-100 dark:bg-slate-700">
                          <tr>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-200">ID</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-200">GPA</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-200">GRE</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-200">IELTS</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-200">Country</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-200">Program</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredApplicants.map(app => (
                            <tr key={app.id} className="border-t border-gray-200 dark:border-slate-700">
                              <td className="px-4 py-2 text-sm text-gray-900 dark:text-gray-100">{app.id}</td>
                              <td className="px-4 py-2 text-sm text-gray-900 dark:text-gray-100">{app.GPA}</td>
                              <td className="px-4 py-2 text-sm text-gray-900 dark:text-gray-100">{app.GRE_Total}</td>
                              <td className="px-4 py-2 text-sm text-gray-900 dark:text-gray-100">{app.IELTS_Score}</td>
                              <td className="px-4 py-2 text-sm text-gray-900 dark:text-gray-100">{app.Country}</td>
                              <td className="px-4 py-2 text-sm text-gray-900 dark:text-gray-100">{app.Program}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredApplicants.map(app => (
                        <GlassCard key={app.id} className="p-4">
                          <CardHeader>
                            <h4 className="font-semibold">ID: {app.id}</h4>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm">GPA: {app.GPA}</p>
                            <p className="text-sm">GRE: {app.GRE_Total}</p>
                            <p className="text-sm">IELTS: {app.IELTS_Score}</p>
                            <p className="text-sm">Country: {app.Country}</p>
                            <p className="text-sm">Program: {app.Program}</p>
                          </CardContent>
                        </GlassCard>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </GlassCard>
          </TabsContent>
          <TabsContent value="analytics">
            <div className="space-y-6">
              <GlassCard>
                <CardHeader>
                  <CardTitle className="text-white">Program Analytics</CardTitle>
                  <p className="text-slate-300 text-sm">Additional analytics will appear here</p>
                </CardHeader>
                <CardContent className="h-[400px]">
                  <div className="flex items-center justify-center h-full">
                    <p className="text-slate-400">More analytics visualizations coming soon</p>
                  </div>
                </CardContent>
              </GlassCard>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}