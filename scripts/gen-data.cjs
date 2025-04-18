const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

// Read the Excel file
const excelPath = path.join(__dirname, '../data/applicants.xlsx');
const workbook = XLSX.readFile(excelPath);
const worksheet = workbook.Sheets[workbook.SheetNames[0]];

// Convert rows to JSON and normalize fields for the UI
const rawRows = XLSX.utils.sheet_to_json(worksheet, { defval: null });
const data = rawRows.map(item => ({
  id: item['Application ID']?.toString() || '',
  GPA: Number(item.GPA) || 0,
  GRE_Total: item['Test Type'] && item['Test Type'].toString().toLowerCase().includes('gre')
    ? Number(item.Score) || 0
    : 0,
  IELTS_Score: item['Test Type'] && ['IELTS', 'PTE Academic', 'TOEFL'].includes(item['Test Type'])
    ? Number(item.Score) || 0
    : 0,
  Country: item['Citizenship Country']?.toString().trim() || 'Unknown',
  Program: item['Program Name']?.toString().trim() || '',
}));

// Write to JSON file
fs.writeFileSync(
  path.join(__dirname, '../public/data.json'),
  JSON.stringify(data, null, 2)
);

console.log('Data generation complete!');