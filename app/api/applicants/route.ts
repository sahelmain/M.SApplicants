import { NextResponse } from 'next/server';
import * as XLSX from 'xlsx';
import path from 'path';
import fs from 'fs/promises';

interface RawApplicantRow {
  'Application ID': string | number;
  GPA?: number;
  'Test Type'?: string;
  Score?: string | number;
  'Citizenship Country'?: string;
  'Program Name'?: string;
  [key: string]: any; // Allow other properties
}

interface ProcessedApplicant {
  id: string;
  GPA: number;
  GRE_Total: number;
  IELTS_Score: number;
  Country: string;
  Program: string;
}

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'MSapplications.xlsx');
    console.log('Looking for Excel file at:', filePath);

    const fileExists = await fs.stat(filePath).then(() => true).catch(() => false);
    if (!fileExists) {
      console.error('File not found at path:', filePath);
      return NextResponse.json({ error: 'Excel file not found' }, { status: 404 });
    }

    const fileBuffer = await fs.readFile(filePath);
    console.log('Successfully read Excel file');
    const workbook = XLSX.read(fileBuffer, { type: 'buffer' });
    console.log('Available sheets:', workbook.SheetNames);

    if (workbook.SheetNames.length === 0) {
      return NextResponse.json({ error: 'No sheets in workbook' }, { status: 500 });
    }

    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    const rawData: RawApplicantRow[] = XLSX.utils.sheet_to_json<RawApplicantRow>(worksheet);
    // Debug: show first few raw rows to inspect Test Type values
    console.log('RawData sample rows (first 10):', JSON.stringify(rawData.slice(0, 10), null, 2));
    console.log('Total rows from Excel:', rawData.length);

    // Group data by Application ID
    const groupedData: { [key: string]: RawApplicantRow[] } = {};
    for (const row of rawData) {
      const appId = String(row['Application ID']);
      if (!groupedData[appId]) {
        groupedData[appId] = [];
      }
      groupedData[appId].push(row);
    }

    console.log('Total unique applicants:', Object.keys(groupedData).length);

    // Process each applicant group
    const processedData: ProcessedApplicant[] = [];
    for (const appId in groupedData) {
      const applicantRows = groupedData[appId];
      let gpa = 0;
      let greVerbal = 0;
      let greQuant = 0;
      let ieltsScore = 0;
      let greTotal = 0; // Track combined GRE total if provided
      let country = '';
      let program = '';

      // Accept numeric or numeric-string GPAs; default to 0 otherwise
      const firstRowWithGpa = applicantRows.find(
        r => r.GPA != null && !isNaN(Number(r.GPA))
      );
      if (firstRowWithGpa) {
        gpa = Number(firstRowWithGpa.GPA);
        country = firstRowWithGpa['Citizenship Country'] || '';
        program = firstRowWithGpa['Program Name'] || '';
      } else {
        console.log(`Applicant ${appId} missing GPA, defaulting to 0.`);
        // proceed with default gpa=0, country/program empty
      }

      // Iterate through all rows for this applicant to find test scores
      for (const row of applicantRows) {
        // Handle separate GRE verbal and quant columns
        if (row['Verbal'] != null && !isNaN(Number(row['Verbal']))) {
          greVerbal = Math.max(greVerbal, Number(row['Verbal']));
        }
        if (row['Quantitative'] != null && !isNaN(Number(row['Quantitative']))) {
          greQuant = Math.max(greQuant, Number(row['Quantitative']));
        }

        if (row['Test Type'] && row.Score) {
          const testType = String(row['Test Type']).toLowerCase();
          const score = parseFloat(String(row.Score)) || 0;

          // Debug: log any relevant test row
          if (testType.includes('verbal') || testType.includes('quant') || testType.includes('gre') || testType.includes('ielts')) {
            console.log(`Applicant ${appId} - Test row detected: type='${testType}', score=${score}`);
          }

          // Handle GRE and IELTS scores
          if (testType.includes('verbal')) {
            // GRE verbal section
            greVerbal = Math.max(greVerbal, score);
          } else if (testType.includes('quant')) {
            // GRE quantitative section
            greQuant = Math.max(greQuant, score);
          } else if (testType.includes('gre')) {
            // Any other GRE entry (e.g. total GRE)
            greTotal = Math.max(greTotal, score);
          } else if (testType.includes('ielts')) {
            // IELTS score
            ieltsScore = Math.max(ieltsScore, score);
          }
        }
      }

      // Use provided GRE total if available, otherwise sum verbal + quant
      const finalGRE = greTotal > 0 ? greTotal : greVerbal + greQuant;

      processedData.push({
        id: appId,
        GPA: gpa,
        GRE_Total: finalGRE,
        IELTS_Score: ieltsScore,
        Country: country,
        Program: program,
      });
    }

    console.log('Processed data length:', processedData.length);
    if (processedData.length > 0) {
      console.log('First processed applicant:', JSON.stringify(processedData[0]));
      console.log('Sample processed applicant with scores:', JSON.stringify(processedData.find(p => p.IELTS_Score > 0 || p.GRE_Total > 0)));
    }

    return NextResponse.json(processedData);
  } catch (error) {
    console.error('Error processing Excel file:', error);
    return NextResponse.json(
      { error: 'Failed to process Excel file: ' + (error instanceof Error ? error.message : String(error)) },
      { status: 500 }
    );
  }
} 