"use client";

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { GlassCard } from '@/components/ui/glass-card';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';

// Define settings type for dashboard configuration
type Settings = {
  darkMode: boolean;
  showGeoMap: boolean;
  showTopCountries: boolean;
  showProgramDistribution: boolean;
  cardOpacity: number;
  animationsEnabled: boolean;
  dataRefreshRate: number;
  defaultTab: string;
  allowDataExport: boolean;
};

export default function SettingsPage() {
  // Dashboard appearance settings
  const [settings, setSettings] = useState<Settings>({
    darkMode: true,
    showGeoMap: true,
    showTopCountries: true,
    showProgramDistribution: true,
    cardOpacity: 10,
    animationsEnabled: true,
    dataRefreshRate: 30, // minutes
    defaultTab: 'overview',
    allowDataExport: true,
  });

  // Handle settings changes
  const handleToggle = (setting: keyof Settings) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  const handleChange = (setting: keyof Settings, value: any) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value,
    }));
  };

  // Export data function (simulated)
  const handleExportData = () => {
    alert('Data export functionality would be implemented here.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-white">Dashboard Settings</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Appearance Settings */}
          <GlassCard>
            <CardHeader>
              <CardTitle className="text-white">Appearance</CardTitle>
              <CardDescription className="text-slate-300">Customize how the dashboard looks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-white">Dark Mode</label>
                <Switch
                  checked={settings.darkMode}
                  onCheckedChange={() => handleToggle('darkMode')}
                  className="bg-slate-700 data-[state=checked]:bg-blue-500"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <label className="text-white">Enable Animations</label>
                <Switch
                  checked={settings.animationsEnabled}
                  onCheckedChange={() => handleToggle('animationsEnabled')}
                  className="bg-slate-700 data-[state=checked]:bg-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-white mb-2">Card Opacity (%)</label>
                <div className="flex items-center gap-2">
                  <Input
                    type="range"
                    min="5"
                    max="20"
                    value={settings.cardOpacity}
                    onChange={(e) => handleChange('cardOpacity', parseInt(e.target.value))}
                    className="w-full"
                  />
                  <span className="text-white min-w-[2rem] text-right">{settings.cardOpacity}</span>
                </div>
              </div>
            </CardContent>
          </GlassCard>
          
          {/* Component Settings */}
          <GlassCard>
            <CardHeader>
              <CardTitle className="text-white">Components</CardTitle>
              <CardDescription className="text-slate-300">Choose which components to show</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-white">Geographic Map</label>
                <Switch
                  checked={settings.showGeoMap}
                  onCheckedChange={() => handleToggle('showGeoMap')}
                  className="bg-slate-700 data-[state=checked]:bg-blue-500"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <label className="text-white">Top Countries Chart</label>
                <Switch
                  checked={settings.showTopCountries}
                  onCheckedChange={() => handleToggle('showTopCountries')}
                  className="bg-slate-700 data-[state=checked]:bg-blue-500"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <label className="text-white">Program Distribution Chart</label>
                <Switch
                  checked={settings.showProgramDistribution}
                  onCheckedChange={() => handleToggle('showProgramDistribution')}
                  className="bg-slate-700 data-[state=checked]:bg-blue-500"
                />
              </div>
            </CardContent>
          </GlassCard>
          
          {/* Data Settings */}
          <GlassCard>
            <CardHeader>
              <CardTitle className="text-white">Data</CardTitle>
              <CardDescription className="text-slate-300">Configure data handling</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-white mb-2">Data Refresh Rate (minutes)</label>
                <Input
                  type="number"
                  value={settings.dataRefreshRate}
                  onChange={(e) => handleChange('dataRefreshRate', parseInt(e.target.value))}
                  min="5"
                  max="60"
                  className="bg-slate-800 text-white border-slate-700"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <label className="text-white">Allow Data Export</label>
                <Switch
                  checked={settings.allowDataExport}
                  onCheckedChange={() => handleToggle('allowDataExport')}
                  className="bg-slate-700 data-[state=checked]:bg-blue-500"
                />
              </div>
              
              <button
                onClick={handleExportData}
                disabled={!settings.allowDataExport}
                className={`mt-4 px-4 py-2 rounded-md w-full ${settings.allowDataExport 
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700' 
                  : 'bg-slate-700 text-slate-400 cursor-not-allowed'}`}
              >
                Export Data
              </button>
            </CardContent>
          </GlassCard>
          
          {/* Account Settings */}
          <GlassCard>
            <CardHeader>
              <CardTitle className="text-white">Defaults</CardTitle>
              <CardDescription className="text-slate-300">Default view settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-white mb-2">Default Tab</label>
                <select
                  value={settings.defaultTab}
                  onChange={(e) => handleChange('defaultTab', e.target.value)}
                  className="w-full bg-slate-800 text-white border border-slate-700 rounded-md px-3 py-2"
                >
                  <option value="overview">Overview</option>
                  <option value="applications">Applications</option>
                  <option value="analytics">Analytics</option>
                </select>
              </div>
              
              <div className="pt-4">
                <button
                  onClick={() => {
                    localStorage.setItem('dashboardSettings', JSON.stringify(settings));
                    alert('Settings saved successfully!');
                  }}
                  className="px-4 py-2 rounded-md w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700"
                >
                  Save Settings
                </button>
                
                <button
                  onClick={() => {
                    if (confirm('Are you sure you want to reset all settings to default?')) {
                      localStorage.removeItem('dashboardSettings');
                      setSettings({
                        darkMode: true,
                        showGeoMap: true,
                        showTopCountries: true,
                        showProgramDistribution: true,
                        cardOpacity: 10,
                        animationsEnabled: true,
                        dataRefreshRate: 30,
                        defaultTab: 'overview',
                        allowDataExport: true,
                      });
                      alert('Settings reset to default!');
                    }
                  }}
                  className="mt-2 px-4 py-2 rounded-md w-full border border-slate-600 text-slate-300 hover:bg-slate-700"
                >
                  Reset to Default
                </button>
              </div>
            </CardContent>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
