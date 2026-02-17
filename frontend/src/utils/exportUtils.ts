import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Asset } from '../types/Asset';

// Excel'e export
export const exportToExcel = (assets: Asset[]) => {
  const data = assets.map(asset => ({
    'Name': asset.name,
    'Serial No': asset.serialNo,
    'Category': asset.category || 'Other',
    'Assign Date': new Date(asset.assignDate).toLocaleDateString('en-GB'),
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  
  // Sütun genişlikleri
  worksheet['!cols'] = [
    { wch: 25 }, // Name
    { wch: 15 }, // Serial No
    { wch: 15 }, // Category
    { wch: 15 }, // Assign Date
  ];

  XLSX.utils.book_append_sheet(workbook, worksheet, 'Assets');
  
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  
  saveAs(blob, `assets_${new Date().toISOString().split('T')[0]}.xlsx`);
};

// PDF'e export
export const exportToPDF = (assets: Asset[]) => {
  const printContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Assets Report</title>
      <style>
        body { 
          font-family: Arial, sans-serif; 
          padding: 20px;
          color: #333;
        }
        h1 { 
          color: #667eea; 
          text-align: center;
          margin-bottom: 10px;
        }
        .subtitle {
          text-align: center;
          color: #666;
          margin-bottom: 30px;
          font-size: 14px;
        }
        table { 
          width: 100%; 
          border-collapse: collapse; 
          margin-top: 20px;
        }
        th { 
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white; 
          padding: 12px;
          text-align: left;
          font-size: 14px;
        }
        td { 
          padding: 10px 12px; 
          border-bottom: 1px solid #eee;
          font-size: 13px;
        }
        tr:nth-child(even) { 
          background-color: #f8f9ff; 
        }
        tr:hover {
          background-color: #f0f2ff;
        }
        .footer {
          margin-top: 30px;
          text-align: center;
          color: #999;
          font-size: 12px;
        }
        .category-chip {
          display: inline-block;
          padding: 2px 8px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: bold;
        }
        .total {
          margin-top: 15px;
          font-weight: bold;
          color: #667eea;
        }
      </style>
    </head>
    <body>
      <h1>📦 My Assets Report</h1>
      <div class="subtitle">Generated on ${new Date().toLocaleDateString('en-GB')} at ${new Date().toLocaleTimeString()}</div>
      
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Asset Name</th>
            <th>Serial No</th>
            <th>Category</th>
            <th>Assign Date</th>
          </tr>
        </thead>
        <tbody>
          ${assets.map((asset, index) => `
            <tr>
              <td>${index + 1}</td>
              <td><strong>${asset.name}</strong></td>
              <td>${asset.serialNo}</td>
              <td>${asset.category || 'Other'}</td>
              <td>${new Date(asset.assignDate).toLocaleDateString('en-GB')}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      
      <div class="total">Total Assets: ${assets.length}</div>
      
      <div class="footer">
        My Assets Management System - ${new Date().getFullYear()}
      </div>
    </body>
    </html>
  `;

  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);
  }
};