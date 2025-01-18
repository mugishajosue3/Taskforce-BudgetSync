import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextInput } from "@mantine/core";
import HistoryContext from "../store/HistoryContext";
import CategoriesContext from "../store/CategoriesContext"

      import DatePicker from "../components/DatePicker";
      

const SetBudget = () => {
  const { addHistoryElement } = useContext(HistoryContext);
  const { addCategory, getTotalAmount } = useContext(CategoriesContext);

  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<string>("");
  const handleDateChange = (date: string) => {
    setSelectedDate(date); // Update selected date in dd/mm/yyyy format
  };
  return (
    <div>
      <DatePicker
        label="Choose a date:"
        value={selectedDate}
        onChange={handleDateChange}
      />
      <TextInput
        onChange={(e) => setValue(Number.parseFloat(e.currentTarget.value))}
        mt={20}
        size="md"
        w="40%"
        placeholder="Ex: 5000"
        label="Enter your budget"
        withAsterisk
      />
      <Button
        mt={20}
        onClick={() => {
          // checks that the user inputted valid values
          if (value <= 0 || Number.isNaN(value)) {
            alert("Invalid Entry. Make sure the amount is greater than zero.");
          } else {
            const budget = getTotalAmount("Budget");
            addCategory({
              label: "Budget",
              id: crypto.randomUUID(),
              amount: -1*budget,
            });
            addCategory({
              label: "Budget",
              id: crypto.randomUUID(),
              amount: value,
            });
            // navigates back to home page
            navigate("/");
            addHistoryElement({
              label: "Budget has been set to $" + value,
              id: crypto.randomUUID(),
              amount: value,
              type: "Budget",
              dateCreated: selectedDate, 
              category: "Budget",
            });
          }
        }}
      >
        Set Budget
      </Button>
    </div>
  );
};

export default SetBudget;
