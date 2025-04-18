#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');

// locate workbook file
const filePath = path.join(process.cwd(), 'MSapplications.xlsx');
if (!fs.existsSync(filePath)) {
  console.error('❌ Excel file not found at', filePath);
  process.exit(1);
}

// parse sheet
const workbook = XLSX.readFile(filePath);
const sheet = workbook.Sheets[workbook.SheetNames[0]];
const data = XLSX.utils.sheet_to_json(sheet);

// ensure output dir
const outDir = path.join(process.cwd(), 'public');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

// write JSON
const outPath = path.join(outDir, 'applicants.json');
fs.writeFileSync(outPath, JSON.stringify(data, null, 2));
console.log('✅ Generated', outPath);
