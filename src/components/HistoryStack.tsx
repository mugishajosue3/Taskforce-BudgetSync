import React, { useState, useEffect } from "react";
import { Divider, ScrollArea, Stack, Text } from "@mantine/core";
import HistoryContext from "../store/HistoryContext";
import HistoryItem from "./HistoryItem";
import { useContext } from "react";
import { useDateRange } from "../store/DateRangeContext";

// Ensure the dates are in a consistent format and parse correctly
const convertToDate = (dateStr: string) => {
  // Check if the date is in DD/MM/YYYY format and convert it to YYYY-MM-DD
  if (dateStr) {
    const [day, month, year] = dateStr.split("/");
    return new Date(`${year}-${month}-${day}`); // Converts to YYYY-MM-DD format
  }
  return null;
};

const HistoryStack = () => {
  const [data, setData] = useState([]);
  console.log("data", data);
  const { fromDate, toDate } = useDateRange();
  const { history } = useContext(HistoryContext);

  useEffect(() => {
    if (fromDate || toDate) {
      // Convert the fromDate and toDate to proper Date objects
      const validFromDate = convertToDate(fromDate);
      const validToDate = convertToDate(toDate);

      const filteredData = history.filter((item) => {
        // Convert item.dateCreated to proper Date object
        const itemDate = convertToDate(item.dateCreated);

        // Validate the date conversion
        if (isNaN(itemDate.getTime())) {
          console.warn(`Invalid date for item with date: ${item.dateCreated}`);
          return false;
        }

        // Check if itemDate is within the range
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
      <Text
        size="xl"
        sx={(theme) => ({
          color:
            theme.colorScheme === "dark"
              ? theme.colors.dark[0]
              : theme.colors.gray[9],
        })}
        mb="md"
      >
        Transaction History
      </Text>
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
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
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

const tableHeaderStyle = {
  padding: "12px 15px",
  textAlign: "left",
  fontSize: "16px",
  fontWeight: "bold",
  backgroundColor: "#333",
  color: "#fff",
};

export default HistoryStack;
