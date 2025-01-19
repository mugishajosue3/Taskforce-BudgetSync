import { Button, Divider, MultiSelect, Text, TextInput } from "@mantine/core";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AvailableCategoriesContext from "../store/AvailableCategoriesContext";
import CategoriesContext from "../store/CategoriesContext";
import HistoryContext from "../store/HistoryContext";
import DeleteCatToolTip from "./DeleteCatToolTip";
import DatePicker from "./DatePicker";

type AvailableCategories = {
  label: string;
  value: string;
  isused: string;
};

const AddToExpenses = () => {
  const [dateError, setDateError] = useState<string>("");
  const { addHistoryElement } = useContext(HistoryContext);
  const { availableCategories, setAvailableCategories } = useContext(
    AvailableCategoriesContext
  );
  const { addCategory } = useContext(CategoriesContext);
  const [label, setLabel] = useState("");
  const [value, setValue] = useState(0);

  const [category, setCategory] = useState<string[]>([""]);
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<string>("");

  const handleDateChange = (date: string) => {
    setSelectedDate(date); // Update selected date in dd/mm/yyyy format
  };
  const { getTotalAmount } = useContext(CategoriesContext);
  // const expenses = getTotalAmount("Expenses");
  const budget = Number(getTotalAmount("Budget")) || 0;
  const expenses = Number(getTotalAmount("Expenses")) || 0;
  const RemainingBudget = budget - expenses;
  // console.log({ RemainingBudget });

  const predefinedCategories = [
    { value: "food", label: "Food & Dining", isused: "false" },
    { value: "transportation", label: "Transportation", isused: "false" },
    { value: "utilities", label: "Utilities", isused: "false" },
    { value: "entertainment", label: "Entertainment", isused: "false" },
    { value: "shopping", label: "Shopping", isused: "false" },
    { value: "healthcare", label: "Healthcare", isused: "false" },
    { value: "travel", label: "Travel", isused: "false" },
    { value: "education", label: "Education", isused: "false" },
    { value: "rent", label: "Rent & Housing", isused: "false" },
    { value: "insurance", label: "Insurance", isused: "false" },
  ];
  // Dynamically checking if the input value exceeds the remaining budget
  const isExceedingBudget = value > RemainingBudget;

  return (
    <div>
      {/* <Text
        size="xl"
        weight={700}
        sx={(theme) => ({
          color:
            theme.colorScheme === "dark"
              ? theme.colors.dark[0]
              : theme.colors.gray[9],
        })}
      >
        Add a Category to Your Expense
      </Text> */}
      {/* <DatePicker
        label="Choose a date:"
        value={selectedDate}
        onChange={handleDateChange}
      /> */}
      <DatePicker
        label="Choose a date:"
        value={selectedDate}
        onChange={(date) => {
          handleDateChange(date);
          setDateError(""); // Clear error when date is selected
        }}
        error={dateError}
      />
      <MultiSelect
        w="40%"
        mt={10}
        data={predefinedCategories}
        label="Select a Category"
        placeholder="Select a category or create a new one"
        searchable
        creatable
        value={category}
        onChange={setCategory}
        maxSelectedValues={1}
        getCreateLabel={(query) =>
          `+ Create ${query.charAt(0).toUpperCase()}${query.slice(1)}`
        }
        onCreate={(query) => {
          const capitalizedQuery =
            query.charAt(0).toUpperCase() + query.slice(1).toLowerCase();
          const newCategory = {
            value: query.toLowerCase(),
            label: capitalizedQuery,
            isused: "false",
          };

          // console.log("New category created:", newCategory);
          setAvailableCategories((current) => [newCategory, ...current]);
          return newCategory;
        }}
        styles={(theme) => ({
          input: {
            "&:focus": {
              borderColor: theme.colors.blue[5],
            },
          },
          item: {
            "&[data-selected]": {
              "&, &:hover": {
                backgroundColor: theme.colors.blue[1],
                color: theme.colors.blue[9],
              },
            },
          },
        })}
      />

      <TextInput
        onChange={(e) => setLabel(e.currentTarget.value)}
        mt={20}
        size="sm"
        w="40%"
        placeholder="Ex: Car payments"
        label="Specify Sub-Category"
        withAsterisk
      />

      <TextInput
        onChange={(e) => setValue(Number.parseFloat(e.currentTarget.value))}
        mt={20}
        size="sm"
        w="40%"
        placeholder="Ex: 3000"
        label="Amount"
        withAsterisk
      />
      {isExceedingBudget && (
        <p className="text-red-400"> Amount Exceeds Current Budget! </p>
      )}

      <div style={{ display: "flex", alignItems: "center", marginTop: 20 }}>
        <Button
          mr={30}
          onClick={() => {
            // Check if date is selected
            if (!selectedDate) {
              setDateError("Please select a date");
              return;
            }

            if (label === "" || value <= 0 || Number.isNaN(value)) {
              alert(
                "Invalid Entries. Make sure the label is not empty and the amount is greater than zero."
              );
              return;
            }

            // If category is empty, set to "Uncategorized"
            const finalCategory = category[0] || "Uncategorized";

            // Add the expense
            addCategory({
              label: finalCategory,
              amount: value,
              id: crypto.randomUUID(),
            });

            // Update categories
            setAvailableCategories((prev) =>
              prev.map((c) => ({
                ...c,
                isused: c.label === finalCategory ? "true" : c.isused,
              }))
            );

            // Add to history
            addHistoryElement({
              label: label,
              amount: value,
              id: crypto.randomUUID(),
              type: "Expense",
              dateCreated: selectedDate,
              category: finalCategory,
            });

            navigate("/");
          }}
          disabled={isExceedingBudget}
        >
          Add Expense
        </Button>
        <Button
          color="red"
          onClick={() => {
            // Checks if the user has not selected a category
            if (category[0] === "") {
              alert("No category has been selected!");
            } else {
              // if they have selected a category

              // Uncategorized cannot be removed
              if (category[0] === "Uncategorized") {
                alert("Uncategorized cannot be removed!");
                return;
              }
              let removed = false; // used to check if the category has been removed
              setAvailableCategories((prev) => {
                // create a hard copy of the previous category state
                const arr: AvailableCategories[] = JSON.parse(
                  JSON.stringify(prev)
                );
                // if the category selected exists in the available categories array and its match is not being used remove the category
                arr.forEach((c, index) => {
                  if (c.label === category[0] && c.isused === "false") {
                    arr.splice(index, 1);
                    removed = true;
                  }
                });

                return arr;
              });
              // if the category has not been removed then it is being used. Show an alert to notify the user
              removed
                ? null
                : alert("Category cannot be removed since it is being used.");
            }
          }}
        >
          Remove Category
        </Button>
        <DeleteCatToolTip />
      </div>
    </div>
  );
};

export default AddToExpenses;
