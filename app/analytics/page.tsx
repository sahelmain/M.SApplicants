"use client";

import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { GlassCard } from '@/components/ui/glass-card';
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  LineChart,
  Line,
  ComposedChart
} from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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

type ScoreDistribution = {
  range: string;
  gpa: number;
  gre: number;
  ielts: number;
};

// Define a typed map for score ranges to allow indexing by string keys
type RangeType = { label: string; min: number; max: number; count: number };
type RangeMap = Record<string, RangeType>;

interface CorrelationDataPoint {
  gpa: number;
  ielts: number;
  country: string;
  program: string;
  id: string;
  [key: string]: string | number; // Add index signature
}

export default function AnalyticsPage() {
  const { data: applicants = [], isLoading } = useQuery<Applicant[]>({
    queryKey: ['applicants'],
    queryFn: () => fetch('/applicants.json').then(res => res.json()),
  });

  const [selectedMetric, setSelectedMetric] = useState('gpa-ielts');

  // Data transformations
  const correlationData: CorrelationDataPoint[] = useMemo(() => {
    return applicants.map(app => ({
      // Only track GPA and IELTS, remove GRE fields entirely
      gpa: app.GPA,
      ielts: app.IELTS_Score,
      country: app.Country || 'Unknown',
      program: app.Program || 'Unknown',
      id: app.id
    }));
  }, [applicants]);

  // Dynamically filter data based on selected metrics
  const [xKey, yKey] = selectedMetric.split('-');
  const dataToPlot = useMemo(() => 
    correlationData.filter(item => item[xKey] != null && item[yKey] != null), 
    [correlationData, selectedMetric, xKey, yKey]
  );

  // Compute regression parameters for trend line
  const regressionParams = useMemo(() => {
    const xs = dataToPlot.map(d => d[xKey] as number);
    const ys = dataToPlot.map(d => d[yKey] as number);
    const n = xs.length;
    const meanX = xs.reduce((sum, v) => sum + v, 0) / n;
    const meanY = ys.reduce((sum, v) => sum + v, 0) / n;
    const cov = xs.reduce((sum, x, i) => sum + (x - meanX) * (ys[i] - meanY), 0);
    const varX = xs.reduce((sum, x) => sum + (x - meanX) ** 2, 0);
    const slope = varX !== 0 ? cov / varX : 0;
    const intercept = meanY - slope * meanX;
    return { slope, intercept };
  }, [dataToPlot, xKey, yKey]);

  // Prepare trend line data points
  const trendData = useMemo(() => {
    const { slope, intercept } = regressionParams;
    return dataToPlot.map(d => ({
      ...d,
      predicted: intercept + slope * (d[xKey] as number),
    }));
  }, [dataToPlot, regressionParams, xKey]);

  // Program performance metrics
  const programPerformance = useMemo(() => {
    const performanceMap: Record<string, { count: number; sumGPA: number }> = {};
    applicants.forEach(app => {
      const name = app.Program || 'Unknown';
      if (!performanceMap[name]) performanceMap[name] = { count: 0, sumGPA: 0 };
      performanceMap[name].count++;
      performanceMap[name].sumGPA += app.GPA;
    });
    return Object.entries(performanceMap).map(([name, { count, sumGPA }]) => ({
      name,
      count,
      avgGPA: sumGPA / count
    }));
  }, [applicants]);

  // Compute Pareto data for Program Performance
  const paretoData = useMemo(() => {
    const sorted = [...programPerformance].sort((a, b) => b.count - a.count);
    const total = sorted.reduce((sum, d) => sum + d.count, 0);
    let cumulative = 0;
    return sorted.map(d => {
      cumulative += d.count;
      return { name: d.name, count: d.count, cumulativePercentage: (cumulative / total) * 100 };
    });
  }, [programPerformance]);

  // Score distribution
  const scoreDistribution = useMemo(() => {
    // Define ranges for each score type
    const gpaRanges: RangeMap = {
      'Range 1': { label: '2.0-2.5', min: 2.0, max: 2.5, count: 0 },
      'Range 2': { label: '2.6-3.0', min: 2.6, max: 3.0, count: 0 },
      'Range 3': { label: '3.1-3.5', min: 3.1, max: 3.5, count: 0 },
      'Range 4': { label: '3.6-4.0', min: 3.6, max: 4.0, count: 0 }
    };
    
    const greRanges: RangeMap = {
      'Range 1': { label: '280-300', min: 280, max: 300, count: 0 },
      'Range 2': { label: '301-320', min: 301, max: 320, count: 0 },
      'Range 3': { label: '321-340', min: 321, max: 340, count: 0 },
      'Range 4': { label: '341-360', min: 341, max: 360, count: 0 }
    };
    
    const ieltsRanges: RangeMap = {
      'Range 1': { label: '5.0-6.0', min: 5.0, max: 6.0, count: 0 },
      'Range 2': { label: '6.1-7.0', min: 6.1, max: 7.0, count: 0 },
      'Range 3': { label: '7.1-8.0', min: 7.1, max: 8.0, count: 0 },
      'Range 4': { label: '8.1-9.0', min: 8.1, max: 9.0, count: 0 }
    };
    
    // Count occurrences in each range
    applicants.forEach(app => {
      if (app.GPA) {
        for (const [key, values] of Object.entries(gpaRanges)) {
          if (app.GPA >= values.min && app.GPA <= values.max) {
            values.count++;
            break;
          }
        }
      }
      
      if (app.GRE_Total) {
        for (const [key, values] of Object.entries(greRanges)) {
          if (app.GRE_Total >= values.min && app.GRE_Total <= values.max) {
            values.count++;
            break;
          }
        }
      }
      
      if (app.IELTS_Score) {
        for (const [key, values] of Object.entries(ieltsRanges)) {
          if (app.IELTS_Score >= values.min && app.IELTS_Score <= values.max) {
            values.count++;
            break;
          }
        }
      }
    });
    
    // Convert to chart format using consistent range keys
    return Object.keys(gpaRanges).map(rangeKey => {
      const g = gpaRanges[rangeKey];
      const gr = greRanges[rangeKey];
      const i = ieltsRanges[rangeKey];
      return {
        range: g.label,
        gpa: g.count,
        gre: gr.count,
        ielts: i.count,
      };
    });
  }, [applicants]);

  if (isLoading) return <div className="p-8 text-white">Loading analytics...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-white">Advanced Analytics</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Correlation Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={selectedMetric} onValueChange={setSelectedMetric}>
              <SelectTrigger>
                <SelectValue placeholder="Select metrics to compare" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gpa-ielts">GPA vs IELTS</SelectItem>
                <SelectItem value="gpa-program">GPA by Program</SelectItem>
                <SelectItem value="ielts-country">IELTS by Country</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
        
        {/* Score Correlations */}
        <GlassCard className="mb-8">
          <CardHeader>
            <CardTitle className="text-white">Score Correlations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <p className="text-white">
                This scatter plot displays each applicant's GPA on the x-axis and their IELTS score on the y-axis. The orange regression line summarizes the overall correlation: a positive slope indicates that stronger academic performance tends to coincide with higher English proficiency. Because our curriculum is delivered entirely in English, identifying candidates who excel in both dimensions helps ensure they are well-prepared to succeed in the program.
              </p>
            </div>
            
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart
                  margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis 
                    type="number" 
                    dataKey={selectedMetric.split('-')[0]} 
                    name={selectedMetric.split('-')[0] === 'gpa' ? 'GPA' : 
                          selectedMetric.split('-')[0] === 'gre' ? 'GRE Total' : 
                          selectedMetric.split('-')[0] === 'greVerbal' ? 'GRE Verbal' : 
                          selectedMetric.split('-')[0] === 'ielts' ? 'IELTS' : 'GRE Quant'} 
                    stroke="#fff"
                    domain={selectedMetric.split('-')[0] === 'gpa' ? [2, 4] : 
                            selectedMetric.split('-')[0] === 'ielts' ? [5, 9] : 
                            selectedMetric.split('-')[0] === 'gre' ? [280, 360] : 
                            [130, 170]}
                  />
                  <YAxis 
                    type="number" 
                    dataKey={selectedMetric.split('-')[1]} 
                    name={selectedMetric.split('-')[1] === 'gpa' ? 'GPA' : 
                          selectedMetric.split('-')[1] === 'gre' ? 'GRE Total' : 
                          selectedMetric.split('-')[1] === 'greVerbal' ? 'GRE Verbal' : 
                          selectedMetric.split('-')[1] === 'ielts' ? 'IELTS' : 'GRE Quant'} 
                    stroke="#fff"
                    domain={selectedMetric.split('-')[1] === 'gpa' ? [2, 4] : 
                            selectedMetric.split('-')[1] === 'ielts' ? [5, 9] : 
                            selectedMetric.split('-')[1] === 'gre' ? [280, 360] : 
                            [130, 170]}
                  />
                  <ZAxis type="category" dataKey="country" name="Country" />
                  <Tooltip 
                    cursor={{ strokeDasharray: '3 3' }}
                    contentStyle={{ backgroundColor: '#1f2937', border: 'none' }}
                    labelStyle={{ color: '#fff' }}
                    formatter={(value, name) => [value, name === 'Applicants' ? selectedMetric.includes(name) ? name : selectedMetric.split('-')[1].toUpperCase() : name]}
                  />
                  <Legend />
                  <Scatter name="Applicants" data={dataToPlot} fill="#8884d8" />
                  {/* Trend line showing overall relationship */}
                  <Line data={trendData} type="linear" dataKey="predicted" stroke="#ff7300" dot={false} name="Trend Line" />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </GlassCard>
        
        {/* Program Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <GlassCard>
            <CardHeader>
              <CardTitle className="text-white">Program Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white mb-4">
                Bars show each program's application count (high to low). The orange line shows cumulative %, highlighting which programs attract most interest.
              </p>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart
                    data={paretoData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis dataKey="name" stroke="#fff" angle={-45} textAnchor="end" height={80} />
                    <YAxis yAxisId="left" stroke="#fff" />
                    <YAxis
                      yAxisId="right"
                      orientation="right"
                      stroke="#fff"
                      domain={[0, 100]}
                      tickFormatter={val => `${val.toFixed(0)}%`}
                    />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#1f2937', border: 'none' }}
                      labelStyle={{ color: '#fff' }}
                      formatter={(value, name) =>
                        name === 'cumulativePercentage'
                          ? [`${(value as number).toFixed(1)}%`, 'Cumulative %']
                          : [value, 'Applicants']
                      }
                    />
                    <Bar yAxisId="left" dataKey="count" fill="#82ca9d" name="Applicant Count" />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="cumulativePercentage"
                      stroke="#ff7300"
                      dot={false}
                      name="Cumulative %"
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </GlassCard>
          
          <GlassCard>
            <CardHeader>
              <CardTitle className="text-white">Score Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white mb-4">
                Shows how applicants are spread across GPA (purple) and IELTS (yellow) ranges. Peaks reveal the most common score brackets, highlighting where most candidates stand.
              </p>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={scoreDistribution}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis dataKey="range" stroke="#fff" />
                    <YAxis stroke="#fff" />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#1f2937', border: 'none' }}
                      labelStyle={{ color: '#fff' }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="gpa" stroke="#8884d8" name="GPA" />
                    <Line type="monotone" dataKey="ielts" stroke="#ffc658" name="IELTS" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
