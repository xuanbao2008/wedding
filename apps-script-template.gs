// Google Apps Script for Wedding RSVP
//
// === SHEET SETUP ===
// 1. Create a Google Sheet
// 2. Rename the first tab to "RSVP" (exact match, case-sensitive)
// 3. In row 1, add these headers in order (each in its own cell):
//    A1: Timestamp
//    B1: Form
//    C1: Họ và tên
//    D1: SĐT
//    E1: Người lớn
//    F1: Trẻ em
//    G1: Tham dự tiệc nào?
//    H1: Có thể tham dự
//    I1: Lời nhắn
//    J1: Ghi chú
//
// STEP 3: Add Apps Script
// - In the Google Sheet, go to Extensions → Apps Script
// - Delete any existing code
// - Paste this entire file content
// - Save the script (Ctrl+S or Cmd+S)
//
// STEP 4: Deploy as Web App
// - Click "Deploy" → "New deployment"
// - Click the gear icon (Select type) → "Web app"
// - Description: "Wedding RSVP v1"
// - Execute as: "Me"
// - Who has access: "Anyone" (IMPORTANT: must be Anyone for public access)
// - Click "Deploy"
//
// STEP 5: Get Web App URL
// - After deployment, copy the "Web app URL" shown
// - It will look like: https://script.google.com/macros/s/XXXX/exec
//
// STEP 6: Configure Next.js Project
// - In your wedding project root, create or edit .env file
// - Add: APPS_SCRIPT_URL=https://script.google.com/macros/s/XXXX/exec
// - Replace XXXX with your actual Web App URL
//
// STEP 7: Restart Development Server
// - Stop the current dev server (Ctrl+C)
// - Restart with: npm run dev
//
// STEP 8: Test the Integration
// - Open the wedding website
// - Fill out the RSVP form
// - Submit the form
// - Check your Google Sheet to see if data appears
//
// === UPDATING THE SCRIPT ===
// If you need to update the script later:
// - Go to Extensions → Apps Script
// - Edit the code
// - Save the script
// - Go to Deploy → Manage deployments
// - Click the pencil icon (Edit) on your deployment
// - Change "Version" to "New version"
// - Click "Deploy"
//
// === FORM DATA STRUCTURE ===
// Form data structure:
// {
//   form: string,
//   fullName: string,
//   phone: string, // Used as unique identifier to prevent duplicates
//   adultCount: string,
//   childCount: string,
//   selectedEvents: string | string[],
//   message: string,
//   note: string,
//   canAttend: boolean,
//   rowId: string (optional - for updates)
// }
//
// === TROUBLESHOOTING ===
// - If you get "Script function not found" error: Make sure you saved the script
// - If you get "Sheet not found" error: Check the tab name is exactly "RSVP"
// - If no data appears: Check the Web App URL in .env file is correct
// - If you get permission errors: Make sure "Who has access" is set to "Anyone"

const SHEET_NAME = "RSVP";
const SPREADSHEET_ID = "1OmHCV22ZQUeQ_LHSyuAIWm3fE426BdkK8pDfrZZiBB8";

function doPost(e) {
  const startTime = new Date().getTime();

  try {
    // Use openById with ID for faster access (if ID is provided)
    const spreadsheet = SPREADSHEET_ID
      ? SpreadsheetApp.openById(SPREADSHEET_ID)
      : SpreadsheetApp.getActiveSpreadsheet();

    const sheet = spreadsheet.getSheetByName(SHEET_NAME);

    if (!sheet) {
      return ContentService
        .createTextOutput(JSON.stringify({
          success: false,
          error: 'Sheet not found. Please create a sheet named "RSVP"',
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    const data = JSON.parse(e.postData.contents);

    const rowData = [
      new Date(),
      data.form || "",
      data.fullName || "",
      data.phone || "",
      data.adultCount || "0",
      data.childCount || "0",
      Array.isArray(data.selectedEvents)
        ? data.selectedEvents.join(" | ")
        : data.selectedEvents || "",
      data.canAttend ? "Có" : "Không",
      data.message || "",
      data.note || "",
    ];

    let rowId;

    // Search for existing record by phone number
    if (data.phone) {
      const lastRow = sheet.getLastRow();
      if (lastRow > 1) {
        const phones = sheet.getRange(2, 4, lastRow - 1, 1).getValues(); // Column D (SĐT)
        const phoneToFind = String(data.phone).trim();
        const rowIndex = phones.findIndex(row => String(row[0]).trim() === phoneToFind);

        if (rowIndex !== -1) {
          // Found existing record, update it — format phone cell as text first
          try { sheet.getRange(rowIndex + 2, 4).setNumberFormat('@'); } catch(e) {}
          const range = sheet.getRange(rowIndex + 2, 1, 1, rowData.length);
          range.setValues([rowData]);
          rowId = String(rowIndex); // 0-based index
        } else {
          // No existing record — format next row's phone cell before appending
          const newRow = sheet.getLastRow() + 1;
          try { sheet.getRange(newRow, 4).setNumberFormat('@'); } catch(e) {}
          sheet.appendRow(rowData);
          rowId = String(newRow - 1); // -1 for header row
        }
      } else {
        // Sheet is empty (only headers) — format next row's phone cell before appending
        const newRow = sheet.getLastRow() + 1;
        try { sheet.getRange(newRow, 4).setNumberFormat('@'); } catch(e) {}
        sheet.appendRow(rowData);
        rowId = String(newRow - 1);
      }
    } else {
      // No phone number, append new row
      sheet.appendRow(rowData);
      rowId = String(sheet.getLastRow() - 1);
    }


    const endTime = new Date().getTime();
    console.log(`RSVP processed in ${endTime - startTime}ms`);

    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        rowId: rowId
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    const endTime = new Date().getTime();
    console.log(`RSVP failed in ${endTime - startTime}ms: ${err}`);

    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: String(err),
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Optional: Test function to check if sheet is accessible
function testSheetAccess() {
  const sheet = SpreadsheetApp
    .getActiveSpreadsheet()
    .getSheetByName(SHEET_NAME);

  if (sheet) {
    Logger.log("Sheet found: " + sheet.getName());
    Logger.log("Last row: " + sheet.getLastRow());
  } else {
    Logger.log("Sheet not found. Please create a sheet named 'RSVP'");
  }
}

// Function to remove duplicate entries based on phone number only
// Keeps the most recent entry (largest timestamp), deletes all older duplicates
function removeDuplicates() {
  const spreadsheet = SPREADSHEET_ID
    ? SpreadsheetApp.openById(SPREADSHEET_ID)
    : SpreadsheetApp.getActiveSpreadsheet();

  const sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    Logger.log("Sheet not found. Please create a sheet named 'RSVP'");
    return;
  }

  const lastRow = sheet.getLastRow();

  if (lastRow <= 1) {
    Logger.log("No data to process (only headers)");
    return;
  }

  // Get all data rows (skip header row 1)
  const dataRange = sheet.getRange(2, 1, lastRow - 1, 10);
  const data = dataRange.getValues();

  // Key: phone (col D = index 3), unique identifier
  // Value: { rowIndex (0-based in data array), timestampMs }
  const latestByPhone = new Map();

  // Parse timestamp flexibly: returns { dateMs, fullMs, hasTime }
  function parseTs(ts) {
    if (!ts) return { dateMs: 0, fullMs: 0, hasTime: false };
    const d = ts instanceof Date ? ts : new Date(ts);
    if (isNaN(d.getTime())) return { dateMs: 0, fullMs: 0, hasTime: false };
    const dateMs = new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
    const hasTime = d.getHours() !== 0 || d.getMinutes() !== 0 || d.getSeconds() !== 0;
    return { dateMs, fullMs: d.getTime(), hasTime };
  }

  // Returns true if candidate is newer/better than existing
  function isNewer(candidate, existing) {
    if (candidate.dateMs !== existing.dateMs) return candidate.dateMs > existing.dateMs;
    // Same date: can't trust time component — use row position (higher index = appended later = newer)
    return candidate.rowIndex > existing.rowIndex;
  }

  for (let i = 0; i < data.length; i++) {
    const row = data[i];
    const phone = String(row[3]).trim();

    if (!phone) continue; // Skip rows without phone

    const ts = { ...parseTs(row[0]), rowIndex: i };

    if (!latestByPhone.has(phone)) {
      latestByPhone.set(phone, { rowIndex: i, ts });
    } else {
      const existing = latestByPhone.get(phone);
      if (isNewer(ts, existing.ts)) {
        latestByPhone.set(phone, { rowIndex: i, ts });
      }
    }
  }

  // Collect rows to keep (1 per phone: the latest)
  const keepRows = new Set(Array.from(latestByPhone.values()).map(v => v.rowIndex));

  // Rows NOT in keepRows are duplicates to delete
  const toDelete = [];
  for (let i = 0; i < data.length; i++) {
    const phone = String(data[i][3]).trim();
    if (phone && !keepRows.has(i)) {
      toDelete.push(i);
    }
  }

  // Delete in reverse order to avoid row index shifting
  toDelete.sort((a, b) => b - a);
  toDelete.forEach(i => sheet.deleteRow(i + 2)); // +2: skip header + 1-based index

  Logger.log(`Removed ${toDelete.length} duplicate entries`);
  Logger.log(`Unique phone numbers: ${latestByPhone.size}`);
}
