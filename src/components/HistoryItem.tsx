import { useState } from "react";
import { Card, Text } from "@mantine/core";
import HistoryModal from "./HistoryModal";
import { useLocalStorage } from "@mantine/hooks";
import { ColorScheme } from "@mantine/core";

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
  category,
}: HistoryItemProps) => {
  const [opened, setOpened] = useState(false);
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "theme",
    defaultValue: "dark",
  });

  console.log("color scheme : ", colorScheme)

  // Determine background color based on the color scheme
  let bgColor;
  if (colorScheme === "light") {
    bgColor = "black"; // Using Tailwind color name, but this can be a hex value or proper Tailwind class
  } else {
    bgColor = "white"; // Dark mode color
  }

  // Row styling
  const tableCellStyle = {
    padding: "12px 15px",
    fontSize: "14px",
    color: bgColor, 
  };

  // Determine text color based on transaction type
  const amountColor = type === "Budget" || type === "Expenses Reset" ? "#69DB7C" : "#FF8787";

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
        <td className="text-black hidden md:table-cell" style={tableCellStyle}>
          {category}
        </td>
        <td style={tableCellStyle}>
          {label.length > 44 ? `${label.slice(0, 44)}...` : label}
        </td>
        <td style={tableCellStyle}>
          <Text color={amountColor} weight={500}>
            {type === "Budget" || type === "Expenses Reset" ? "+" : "-"}$
            {amount.toLocaleString("en-US")}
          </Text>
        </td>
        <td style={tableCellStyle} className="hidden md:table-cell">{type}</td>
        <td style={tableCellStyle}>{dateCreated}</td>
      </tr>
    </>
  );
};

// Row style for hovering/clicking effect
const tableRowStyle = {
  cursor: "pointer",
  borderBottom: "1px solid #ddd",
  transition: "background-color 0.2s ease",
};

export default HistoryItem;
