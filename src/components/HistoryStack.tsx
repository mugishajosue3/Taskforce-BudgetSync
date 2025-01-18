import React, { useState, useEffect } from "react";
import { Divider, ScrollArea, Stack, Text } from "@mantine/core";
import HistoryContext from "../store/HistoryContext";
import HistoryItem from "./HistoryItem";
import { useContext } from "react";
import { useDateRange } from "../store/DateRangeContext";
import { Printer, Download } from "lucide-react";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const convertToDate = (dateStr: string) => {
  if (dateStr) {
    const [day, month, year] = dateStr.split("/");
    return new Date(`${year}-${month}-${day}`);
  }
  return null;
};

const HistoryStack = () => {
  const [data, setData] = useState([]);
  const { fromDate, toDate } = useDateRange();
  const { history } = useContext(HistoryContext);

  useEffect(() => {
    if (fromDate || toDate) {
      const validFromDate = convertToDate(fromDate);
      const validToDate = convertToDate(toDate);

      const filteredData = history.filter((item) => {
        const itemDate = convertToDate(item.dateCreated);

        if (isNaN(itemDate.getTime())) {
          console.warn(`Invalid date for item with date: ${item.dateCreated}`);
          return false;
        }

        const fromDateCondition = validFromDate
          ? itemDate >= validFromDate
          : true;
        const toDateCondition = validToDate ? itemDate <= validToDate : true;

        return fromDateCondition && toDateCondition;
      });
      setData(filteredData);
    } else {
      setData(history);
    }
  }, [fromDate, toDate, history]);

  const accountType = localStorage.getItem("accountType");
  // console.log("Account Type:", accountType);

  const handlePrint = () => {
    const printContent = document.getElementById('history-table');
    const windowPrint = window.open('', '', 'width=1200,height=950');
    
    windowPrint.document.write(`
      <html>
        <head>
          <title>Transaction History on ${accountType}</title>
          <style>
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #black; padding: 8px; text-align: left; }
            th { background-color: #333; color: black; }
          </style>
        </head>
        <body>
          ${printContent.outerHTML}
        </body>
      </html>
    `);
    
    windowPrint.document.close();
    windowPrint.focus();
    windowPrint.print();
    windowPrint.close();
  };

  const handleDownload = async () => {
    const element = document.getElementById('history-table');
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL('image/png');
    
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('transaction-history.pdf');
  };

  const stickyHeaderStyle = {
    position: "sticky",
    top: 0,
    backgroundColor: "#202020",
    zIndex: 1,
  };

  const tableHeaderStyle = {
    padding: "12px 15px",
    textAlign: "left",
    fontSize: "16px",
    fontWeight: "bold",
    backgroundColor: "#333",
    color: "#fff",
  };

  return (
    <div className="bg-[#202020] p-4">
      <div className="flex justify-between items-center mb-4">
        <Text
          size="xl"
          sx={(theme) => ({
            color:
              theme.colorScheme === "dark"
                ? theme.colors.dark[0]
                : theme.colors.gray[9],
          })}
        >
          Transaction History
        </Text>
        <div className="flex gap-4">
          <button 
            onClick={handlePrint}
            className="flex items-center gap-2 px-3 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Download size={18} />
            Download Report 
          </button>
          {/* <button 
            onClick={handleDownload}
            className="flex items-center gap-2 px-3 py-2 rounded bg-green-600 hover:bg-green-700 text-white"
          >
            <Download size={18} />
            Download PDF
          </button> */}
        </div>
      </div>
      <Divider my="sm" />
      <ScrollArea
        type="always"
        sx={(theme) => ({
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
          height: 300,
          width: "100%",
          paddingRight: 15,
        })}
        className="p-4 bg-[#202020]"
      >
        <table id="history-table" style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead style={stickyHeaderStyle}>
            <tr>
              <th style={tableHeaderStyle}>Category</th>
              <th style={tableHeaderStyle}>Label</th>
              <th style={tableHeaderStyle}>Amount</th>
              <th style={tableHeaderStyle}>Type</th>
              <th style={tableHeaderStyle}>Date</th>
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0 ? (
              data.map((item) => (
                <HistoryItem
                  category={item.category}
                  label={item.label}
                  amount={item.amount}
                  type={item.type}
                  dateCreated={item.dateCreated}
                  key={item.id}
                  id={item.id}
                />
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  style={{ textAlign: "center", padding: "10px" }}
                >
                  No data available for the selected time range.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </ScrollArea>
    </div>
  );
};

export default HistoryStack;