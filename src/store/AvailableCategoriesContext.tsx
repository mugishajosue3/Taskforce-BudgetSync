import { useLocalStorage } from "@mantine/hooks";
import { createContext, ReactNode, useContext } from "react";

// Define types
type AvailableCategoriesContextProps = {
  children: ReactNode;
};

type AvailableCategories = {
  label: string;
  value: string;
  isused: string;
};

type CallBack = (prev: AvailableCategories[]) => AvailableCategories[];

type AvailableCategoriesContextType = {
  availableCategories: AvailableCategories[];
  setAvailableCategories: (callBack: CallBack) => void;
};

// Create context
const AvailableCategoriesContext = createContext<AvailableCategoriesContextType>({
  availableCategories: [],
  setAvailableCategories: (callBack: CallBack) => {},
});

// Create the provider
export function AvailableCategoriesContextProvider({
  children,
}: AvailableCategoriesContextProps) {
  // Get userId dynamically (this could come from login or session)
  const userId = localStorage.getItem("accountType");
  // console.log("User ID for multi-category files:", userId);

  // Dynamically set the localStorage key to include the userId
  const storageKey = `${userId}_multiSelectCategories`;

  const [availableCategories, setAvailableCategories] = useLocalStorage<AvailableCategories[]>({
    key: storageKey,
    defaultValue: [
      {
        label: "Entertainment",
        value: "Entertainment",
        isused: "false",
      },
      {
        label: "Groceries",
        value: "Groceries",
        isused: "false",
      },
      {
        label: "Housing",
        value: "Housing",
        isused: "false",
      },
      {
        label: "Utilities",
        value: "Utilities",
        isused: "false",
      },
      {
        label: "Transportation",
        value: "Transportation",
        isused: "false",
      },
      {
        label: "Healthcare",
        value: "Healthcare",
        isused: "false",
      },
      {
        label: "Debt Repayment",
        value: "Debt Repayment",
        isused: "false",
      },
      {
        label: "Savings",
        value: "Savings",
        isused: "false",
      },
      {
        label: "Education",
        value: "Education",
        isused: "false",
      },
      {
        label: "Insurance",
        value: "Insurance",
        isused: "false",
      },
      {
        label: "Dining Out",
        value: "Dining Out",
        isused: "false",
      },
      {
        label: "Clothing",
        value: "Clothing",
        isused: "false",
      },
      {
        label: "Gifts & Donations",
        value: "Gifts & Donations",
        isused: "false",
      },
      {
        label: "Fitness & Wellness",
        value: "Fitness & Wellness",
        isused: "false",
      },
      {
        label: "Childcare",
        value: "Childcare",
        isused: "false",
      },
      {
        label: "Personal Care",
        value: "Personal Care",
        isused: "false",
      },
      {
        label: "Travel",
        value: "Travel",
        isused: "false",
      },
      {
        label: "Technology",
        value: "Technology",
        isused: "false",
      },
      {
        label: "Subscriptions",
        value: "Subscriptions",
        isused: "false",
      },
      {
        label: "Pets",
        value: "Pets",
        isused: "false",
      },
      {
        label: "Hobbies",
        value: "Hobbies",
        isused: "false",
      },
      {
        label: "Business Expenses",
        value: "Business Expenses",
        isused: "false",
      },
      {
        label: "Investments",
        value: "Investments",
        isused: "false",
      },
      {
        label: "Emergency Fund",
        value: "Emergency Fund",
        isused: "false",
      },
      {
        label: "Home Maintenance",
        value: "Home Maintenance",
        isused: "false",
      },
      {
        label: "Auto Maintenance",
        value: "Auto Maintenance",
        isused: "false",
      },
      {
        label: "Alcohol & Tobacco",
        value: "Alcohol & Tobacco",
        isused: "false",
      },
      {
        label: "Entertainment Subscriptions",
        value: "Entertainment Subscriptions",
        isused: "false",
      },
      {
        label: "Miscellaneous",
        value: "Miscellaneous",
        isused: "false",
      },
      {
        label: "Uncategorized",
        value: "Uncategorized",
        isused: "false",
      },
      
    ],    
  });

  function setAvailableCategoriesHandler(callBack: CallBack) {
    setAvailableCategories(callBack);
  }

  const context = {
    availableCategories: availableCategories,
    setAvailableCategories: setAvailableCategoriesHandler,
  };

  return (
    <AvailableCategoriesContext.Provider value={context}>
      {children}
    </AvailableCategoriesContext.Provider>
  );
}

// Custom hook for accessing the context
export const useAvailableCategories = () => useContext(AvailableCategoriesContext);

export default AvailableCategoriesContext;
