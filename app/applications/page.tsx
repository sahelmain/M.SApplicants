"use client";

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { GlassCard } from '@/components/ui/glass-card';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';

type Applicant = {
  id: string;
  GPA: number;
  GRE_Verbal: number;
  GRE_Quant: number;
  GRE_Writing: number;
  GRE_Total: number;
  IELTS_Score: number;
  Country: string;
  Program: string;
};

export default function ApplicationsPage() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  
  const { data: applicants = [], isLoading } = useQuery<Applicant[]>({
    queryKey: ['applicants'],
    queryFn: () => fetch(`${basePath}/data.json`).then(res => res.json()),
  });

  const [filters, setFilters] = useState({
    search: '',
    country: '',
    program: '',
    minGPA: '',
    maxGPA: '',
  });

  // Get unique countries and programs for filters
  const countries = [...new Set(applicants.map(app => app.Country).filter(Boolean))].sort();
  const programs = [...new Set(applicants.map(app => app.Program).filter(Boolean))].sort();

  // Apply filters
  const filteredApplicants = applicants.filter(app => {
    const matchesSearch = !filters.search ||
      app.id.toLowerCase().includes(filters.search.toLowerCase()) ||
      (app.Country && app.Country.toLowerCase().includes(filters.search.toLowerCase())) ||
      (app.Program && app.Program.toLowerCase().includes(filters.search.toLowerCase()));

    const matchesCountry = !filters.country || app.Country === filters.country;
    const matchesProgram = !filters.program || app.Program === filters.program;
    
    const matchesMinGPA = !filters.minGPA || app.GPA >= parseFloat(filters.minGPA);
    const matchesMaxGPA = !filters.maxGPA || app.GPA <= parseFloat(filters.maxGPA);

    return matchesSearch && matchesCountry && matchesProgram && matchesMinGPA && matchesMaxGPA;
  });

  if (isLoading) return <div className="p-8 text-white">Loading applications...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-white">Applications</h1>
        
        {/* Filters */}
        <GlassCard className="mb-8">
          <CardHeader>
            <CardTitle className="text-white">Filter Applications</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Search</label>
              <Input 
                type="text" 
                placeholder="Search by ID or country..." 
                value={filters.search}
                onChange={(e) => setFilters({...filters, search: e.target.value})}
                className="bg-slate-800 text-white border-slate-700"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Country</label>
              <select
                value={filters.country}
                onChange={(e) => setFilters({...filters, country: e.target.value})}
                className="w-full bg-slate-800 text-white border border-slate-700 rounded-md px-3 py-2"
              >
                <option value="">All Countries</option>
                {countries.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Program</label>
              <select
                value={filters.program}
                onChange={(e) => setFilters({...filters, program: e.target.value})}
                className="w-full bg-slate-800 text-white border border-slate-700 rounded-md px-3 py-2"
              >
                <option value="">All Programs</option>
                {programs.map(program => (
                  <option key={program} value={program}>{program}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Min GPA</label>
              <Input 
                type="number" 
                placeholder="Min" 
                value={filters.minGPA}
                onChange={(e) => setFilters({...filters, minGPA: e.target.value})}
                min="0" 
                max="4" 
                step="0.1"
                className="bg-slate-800 text-white border-slate-700"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Max GPA</label>
              <Input 
                type="number" 
                placeholder="Max" 
                value={filters.maxGPA}
                onChange={(e) => setFilters({...filters, maxGPA: e.target.value})}
                min="0" 
                max="4" 
                step="0.1"
                className="bg-slate-800 text-white border-slate-700"
              />
            </div>
          </CardContent>
        </GlassCard>
        
        {/* Applications Table */}
        <GlassCard>
          <CardHeader>
            <CardTitle className="text-white">Applications ({filteredApplicants.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-800">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-200">ID</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-200">GPA</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-200">GRE Verbal</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-200">GRE Quant</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-200">GRE Total</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-200">IELTS</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-200">Country</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-200">Program</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredApplicants.map(app => (
                    <tr key={app.id} className="border-t border-slate-700 hover:bg-slate-700/50">
                      <td className="px-4 py-3 text-sm text-white">{app.id}</td>
                      <td className="px-4 py-3 text-sm text-white">{app.GPA}</td>
                      <td className="px-4 py-3 text-sm text-white">{app.GRE_Verbal}</td>
                      <td className="px-4 py-3 text-sm text-white">{app.GRE_Quant}</td>
                      <td className="px-4 py-3 text-sm text-white">{app.GRE_Total}</td>
                      <td className="px-4 py-3 text-sm text-white">{app.IELTS_Score}</td>
                      <td className="px-4 py-3 text-sm text-white">{app.Country}</td>
                      <td className="px-4 py-3 text-sm text-white">{app.Program}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </GlassCard>
      </div>
    </div>
  );
}
