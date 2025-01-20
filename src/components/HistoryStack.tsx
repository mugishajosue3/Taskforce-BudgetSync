import React, { useState, useEffect } from "react";
import { Divider, ScrollArea, Text } from "@mantine/core";
import HistoryContext from "../store/HistoryContext";
import HistoryItem from "./HistoryItem";
import { useContext } from "react";
import { useDateRange } from "../store/DateRangeContext";
import { Download } from "lucide-react";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useLocalStorage } from "@mantine/hooks";
import { ColorScheme, CSSObject } from "@mantine/core";

// Define interfaces for type safety
interface HistoryElement {
  id: string;
  category: string;
  label: string;
  amount: number;
  type: string;
  dateCreated: string;
}

const convertToDate = (dateStr: string | null): Date | null => {
  if (!dateStr) return null;
  
  const [day, month, year] = dateStr.split("/");
  const date = new Date(`${year}-${month}-${day}`);
  
  return isNaN(date.getTime()) ? null : date;
};

const HistoryStack: React.FC = () => {
  const [data, setData] = useState<HistoryElement[]>([]);
  const { fromDate, toDate } = useDateRange();
  const { history } = useContext(HistoryContext);
  const [colorScheme] = useLocalStorage<ColorScheme>({
    key: "theme",
    defaultValue: "dark",
  });

  useEffect(() => {
    if (fromDate || toDate) {
      const validFromDate = convertToDate(fromDate);
      const validToDate = convertToDate(toDate);

      const filteredData = history.filter((item: HistoryElement) => {
        const itemDate = convertToDate(item.dateCreated);
        
        if (!itemDate) {
          console.warn(`Invalid date for item with date: ${item.dateCreated}`);
          return false;
        }

        const fromDateCondition = validFromDate
          ? itemDate >= validFromDate
          : true;
        const toDateCondition = validToDate 
          ? itemDate <= validToDate 
          : true;

        return fromDateCondition && toDateCondition;
      });
      setData(filteredData);
    } else {
      setData(history);
    }
  }, [fromDate, toDate, history]);

  const accountType = localStorage.getItem("accountType");

  const handlePrint = () => {
    const printContent = document.getElementById('history-table');
    if (!printContent) return;

    const windowPrint = window.open('', '', 'width=1200,height=950');
    if (!windowPrint) {
      console.error('Failed to open print window');
      return;
    }
    
    windowPrint.document.write(`
      <html>
        <head>
          <title>Transaction History on ${accountType || 'Account'}</title>
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
    if (!element) return;

    try {
      const canvas = await html2canvas(element);
      const imgData = canvas.toDataURL('image/png');
      
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('transaction-history.pdf');
    } catch (error) {
      console.error('Failed to generate PDF:', error);
    }
  };

  const stickyHeaderStyle: React.CSSProperties = {
    position: "sticky",
    top: 0,
    backgroundColor: "#202020",
    zIndex: 1,
  };

  const tableHeaderStyle: React.CSSProperties = {
    padding: "12px 15px",
    textAlign: "left",
    fontSize: "16px",
    fontWeight: "bold",
    backgroundColor: colorScheme === "light" ? "gray" : "#202020",
    color: "#fff",
  };

  return (
    <div className={`p-4 ${colorScheme === "dark" ? "text-white" : "text-gray-800"}`}>
      <div className="flex justify-between items-center mb-4">
        <Text size="xl">
          Transaction History
        </Text>
        <div className="flex gap-4">
          <button 
            onClick={handlePrint}
            className="flex items-center gap-2 px-3 py-2 rounded bg-green-600 hover:bg-green-700"
          >
            <Download size={18} />
            Download Report 
          </button>
        </div>
      </div>
      <Divider my="sm" />
      <ScrollArea
        type="always"
        sx={(theme): CSSObject => ({
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
          height: 300,
          width: "100%",
          paddingRight: 15,
          overflowX: "auto",
          overflowY: "auto",
        })}
        className={`${colorScheme === "dark" ? "bg-transparent" : ""}`}
      >
        <table id="history-table" style={{ width: "100%", borderCollapse: "collapse" }} className="w-1/2">
          <thead className="bg-transparent" style={stickyHeaderStyle}>
            <tr>
              <th style={tableHeaderStyle} className="hidden md:table-cell">Category</th>
              <th style={tableHeaderStyle}>Label</th>
              <th style={tableHeaderStyle}>Amount</th>
              <th style={tableHeaderStyle} className="hidden md:table-cell">Type</th>
              <th style={tableHeaderStyle}>Date</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item: HistoryElement) => (
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
                  colSpan={6}
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