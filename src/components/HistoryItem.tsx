import { useState } from "react";
import { Card, Text } from "@mantine/core";
import HistoryModal from "./HistoryModal";

type HistoryItemProps = {
  label: string;
  amount: number;
  type: string;
  id: string;
  dateCreated: string;
  category: string;
};

const HistoryItem = ({
  label,
  amount,
  type,
  id,
  dateCreated,
  category
}: HistoryItemProps) => {
  const [opened, setOpened] = useState(false);

  // #69DB7C is green.4 and #FF8787 is red.4.
  const color = type === "Budget" || type === "Expenses Reset" ? "#69DB7C" : "#FF8787";

  return (
    <>
      <HistoryModal
        opened={opened}
        setOpened={setOpened}
        label={label}
        amount={amount}
        type={type}
        dateCreated={dateCreated}
        id={id}
        category={category}
      />
      <tr onClick={() => setOpened(true)} style={tableRowStyle}>
        <td style={tableCellStyle}>{category}</td>
        <td style={tableCellStyle}>{label.length > 44 ? `${label.slice(0, 44)}...` : label}</td>
        <td style={tableCellStyle}>
          <Text color={color} weight={500}>
            {type === "Budget" || type === "Expenses Reset" ? "+" : "-"}$
            {amount.toLocaleString("en-US")}
          </Text>
        </td>
        <td style={tableCellStyle}>{type}</td>
        <td style={tableCellStyle}>{dateCreated}</td>
      </tr>
    </>
  );
};

const tableRowStyle = {
  cursor: "pointer",
  borderBottom: "1px solid #ddd",
  transition: "background-color 0.2s ease",
};

const tableCellStyle = {
  padding: "12px 15px",
  fontSize: "14px",
  color: "#fff",
};

export default HistoryItem;
