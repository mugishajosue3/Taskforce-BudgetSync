import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextInput } from "@mantine/core";
import HistoryContext from "../store/HistoryContext";
import CategoriesContext from "../store/CategoriesContext";
import DatePicker from "./DatePicker";

const AddToBudget = () => {
  const [dateError, setDateError] = useState<string>("");
  const { addCategory } = useContext(CategoriesContext);
  const { addHistoryElement } = useContext(HistoryContext);
  const [label, setLabel] = useState("");
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<string>("");
  const handleDateChange = (date: string) => {
    setSelectedDate(date); 
  };
  return (
    <div>
      <DatePicker
        label="Choose a date:"
        value={selectedDate}
        onChange={(date) => {
          handleDateChange(date);
          setDateError(""); // Clear error when date is selected
        }}
        error={dateError}
      />
      <TextInput
        onChange={(e) => setLabel(e.currentTarget.value)}
        mt={20}
        size="md"
        w="40%"
        placeholder="Ex: Christmas bonus"
        label="Label"
        withAsterisk
      />
      <TextInput
        onChange={(e) => setValue(Number.parseFloat(e.currentTarget.value))}
        mt={20}
        size="md"
        w="40%"
        placeholder="Ex: 3000"
        label="Amount"
        withAsterisk
      />
      <Button
        mt={20}
        onClick={() => {
          // Check if date is selected
          if (!selectedDate) {
            setDateError("Please select a date");
            return;
          }
          // Checks if the user input is valid
          if (label === "" || value <= 0 || Number.isNaN(value)) {
            alert(
              "Invalid Entries. Make sure the label is not empty and the amount is greater than zero."
            );
          } else {
            addCategory({
              label: "Budget",
              id: crypto.randomUUID(),
              amount: value,
            });
            // navigate to home page
            navigate("/");
            addHistoryElement({
              label: label,
              amount: value,
              id: crypto.randomUUID(),
              type: "Budget",
              dateCreated: selectedDate,
              category: "Budget",
            });
          }
        }}
      >
        Add To Budget
      </Button>
    </div>
  );
};

export default AddToBudget;
