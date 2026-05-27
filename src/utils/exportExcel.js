/**
 * Tiện ích xuất dữ liệu giao dịch ra file CSV tương thích tốt với Excel (hỗ trợ Tiếng Việt có dấu).
 * Sử dụng BOM (\uFEFF) để Excel hiển thị đúng font UTF-8.
 */
export const exportTransactionsToCSV = (transactions) => {
  // UTF-8 BOM
  let csvContent = "\uFEFF";
  
  // Tiêu đề cột
  const headers = [
    "STT",
    "Mã Giao Dịch",
    "Tên Dịch Vụ",
    "Ngày Thực Hiện",
    "Người Thực Hiện",
    "Giá Tiền (VND)",
    "Ghi Chú"
  ];
  
  // Ghép tiêu đề
  csvContent += headers.map(h => `"${h.replace(/"/g, '""')}"`).join(",") + "\r\n";
  
  // Ghép nội dung từng dòng
  transactions.forEach((tx, idx) => {
    const row = [
      idx + 1,
      tx.id,
      tx.serviceName,
      tx.date,
      tx.providerName,
      tx.price,
      tx.notes || ""
    ];
    csvContent += row.map(val => `"${String(val).replace(/"/g, '""')}"`).join(",") + "\r\n";
  });
  
  // Tạo blob và tải về
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  
  const now = new Date();
  const dateStr = `${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}`;
  
  link.setAttribute("href", url);
  link.setAttribute("download", `Bao_Cao_Giao_Dich_${dateStr}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  console.log("Xuất dữ liệu Excel thành công với", transactions.length, "giao dịch.");
};
