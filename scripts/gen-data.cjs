const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

// Read the Excel file
const workbook = XLSX.readFile('../MSapplications.xlsx');
const worksheet = workbook.Sheets[workbook.SheetNames[0]];

// Convert to JSON
const data = XLSX.utils.sheet_to_json(worksheet);

// Write to JSON file
fs.writeFileSync(
  path.join(__dirname, '../public/data.json'),
  JSON.stringify(data, null, 2)
);

console.log('Data generation complete!'); 