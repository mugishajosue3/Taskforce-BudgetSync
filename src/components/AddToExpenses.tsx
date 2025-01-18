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
      <DatePicker label="Choose a date:" value={selectedDate} onChange={handleDateChange} />
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

          console.log("New category created:", newCategory);
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
        size="md"
        w="40%"
        placeholder="Ex: Car payments"
        label="Specify SubCategory"
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
      {/* <Divider mt={30} mb={20} /> */}

      <div style={{ display: "flex", alignItems: "center", marginTop: 20 }}>
        <Button
          mr={30}
          onClick={() => {
            if (label === "" || value <= 0 || Number.isNaN(value)) {
              alert(
                "Invalid Entries. Make sure the label is not empty and the amount is greater than zero."
              );
            } else {
              // if the user does not select a category while creating his expense, set category equal to 'Uncatigorized'
              category[0] === undefined ||
              category[0] === null ||
              category[0] === ""
                ? (category[0] = "Uncategorized")
                : null;
              addCategory({
                label: category[0],
                amount: value,
                id: crypto.randomUUID(),
              });
              setAvailableCategories((prev) => {
                // set the isused property of the available category selected to true
                return prev.map((c) => {
                  if (c.label === category[0]) {
                    c.isused = "true";
                  }
                  return c;
                });
              });
              // navigate back to the home page
              navigate("/");
              addHistoryElement({
                label: label,
                amount: value,
                id: crypto.randomUUID(),
                type: "Expense",
                dateCreated: selectedDate,
                category: category[0],
              });
            }
          }}
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
