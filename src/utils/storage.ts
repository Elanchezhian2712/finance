import { Transaction } from '../types';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const exportTransactions = (transactions: Transaction[]): void => {
 const csvContent = [
  ['S.No', 'Date', 'Type', 'Category', 'Description', 'Amount (₹)'].join(','),
  ...transactions.map((t, index) => [
    index + 1,
    t.date,
    t.type,
    t.category,
    t.description,
    `₹${t.amount.toFixed(2)}`
  ].join(','))
].join('\n');


  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `transactions-${new Date().toISOString().split('T')[0]}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
export const exportToPDF = (transactions: Transaction[]): void => {
  const doc = new jsPDF();
  
  // Add title
  doc.setFontSize(20);
  doc.setTextColor(51, 65, 85); // slate-700
  doc.text('Financial Transaction Report', 20, 20);
  
  // Add generation date
  doc.setFontSize(12);
  doc.setTextColor(100, 116, 139); // slate-500
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 30);
  
  // Calculate summary
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const balance = totalIncome - totalExpenses;
  
  // Add summary section
  doc.setFontSize(14);
  doc.setTextColor(51, 65, 85);
  doc.text('Summary', 20, 45);
  
  doc.setFontSize(10);
  // --- CHANGES START HERE ---
  doc.text(`Total Income: Rs. ${totalIncome.toFixed(2)}`, 20, 55);
  doc.text(`Total Expenses: Rs. ${totalExpenses.toFixed(2)}`, 20, 62);
  doc.text(`Balance: Rs. ${balance.toFixed(2)}`, 20, 69);
  const tableData = transactions.map((t, index) => [
  index + 1,
  t.date,
  t.type.charAt(0).toUpperCase() + t.type.slice(1),
  t.category,
  t.description,
  `Rs. ${t.amount.toFixed(2)}`
]);

autoTable(doc, {
  head: [['S.No', 'Date', 'Type', 'Category', 'Description', 'Amount (Rs.)']],
  body: tableData,
  startY: 80,
  styles: {
    fontSize: 9,
    cellPadding: 3,
  },
  headStyles: {
    fillColor: [148, 163, 184],
    textColor: [255, 255, 255],
    fontStyle: 'bold',
  },
  alternateRowStyles: {
    fillColor: [248, 250, 252],
  },
  columnStyles: {
    0: { cellWidth: 15 },  // S.No
    1: { cellWidth: 25 },  // Date
    2: { cellWidth: 20 },  // Type
    3: { cellWidth: 30 },  // Category
    4: { cellWidth: 65 },  // Description
    5: { cellWidth: 25, halign: 'right' },  // Amount
  },
});

  
  // Save the PDF
  doc.save(`transactions-${new Date().toISOString().split('T')[0]}.pdf`);
};
export const printTransactions = (transactions: Transaction[]): void => {
  // --- 1. CALCULATE TOTALS (Add this section) ---
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const balance = totalIncome - totalExpenses;

  const printContent = `
    <html>
      <head>
        <title>Financial Transactions</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; margin: 20px; color: #333; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
          th { background-color: #f2f2f2; font-weight: 600; }
          .header { margin-bottom: 20px; }
          .header h1 { font-size: 24px; margin-bottom: 5px; }
          .header p { color: #666; font-size: 14px; }
          .summary {
            margin-bottom: 25px;
            padding: 15px;
            border: 1px solid #eee;
            background-color: #f9f9f9;
            border-radius: 5px;
          }
          .summary h2 {
            margin-top: 0;
            margin-bottom: 10px;
            font-size: 18px;
          }
          .summary p {
            margin: 5px 0;
            font-size: 16px;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Financial Transactions</h1>
          <p>Generated on: ${new Date().toLocaleDateString()}</p>
        </div>

        <div class="summary">
          <h2>Summary</h2>
          <p>Total Income: ₹${totalIncome.toFixed(2)}</p>
          <p>Total Expenses: ₹${totalExpenses.toFixed(2)}</p>
          <p><strong>Balance: ₹${balance.toFixed(2)}</strong></p>
        </div>

        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Date</th>
              <th>Type</th>
              <th>Category</th>
              <th>Description</th>
              <th>Amount (₹)</th>
            </tr>
          </thead>
          <tbody>
            ${transactions.map((t, index) => `
              <tr>
                <td>${index + 1}</td>
                <td>${t.date}</td>
                <td>${t.type}</td>
                <td>${t.category}</td>
                <td>${t.description}</td>
                <td>₹${t.amount.toFixed(2)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </body>
    </html>
  `;

  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
  }
};