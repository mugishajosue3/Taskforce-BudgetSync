import { Divider, ScrollArea, Stack, Text } from "@mantine/core";
import HistoryContext from "../store/HistoryContext";
import HistoryItem from "./HistoryItem";
import { useContext } from "react";

const HistoryStack = () => {
  const { history } = useContext(HistoryContext);
  const stickyHeaderStyle = {
    position: 'sticky',
    top: 0,
    backgroundColor: '#202020',
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
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
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
            {history.map((item) => (
              <HistoryItem
                category={item.category}
                label={item.label}
                amount={item.amount}
                type={item.type}
                dateCreated={item.dateCreated}
                key={item.id}
                id={item.id}
              />
            ))}
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
