import { useLocalStorage } from "@mantine/hooks";
import { createContext, ReactNode } from "react";

// Type definitions
type HistoryContextProps = {
  children: ReactNode;
};

type HistoryElement = {
  id: string;
  label: string;
  amount: number;
  type: string;
  dateCreated: string;
  category: string;
};

type HistoryContextType = {
  history: HistoryElement[];
  setHistory: (history: HistoryElement[]) => void;
  addHistoryElement: (element: HistoryElement) => void;
  deleteHistoryElement: (id: string) => void;
};

// Context initialization
const HistoryContext = createContext<HistoryContextType>({
  history: [],
  setHistory: (history: HistoryElement[]) => {},
  addHistoryElement: (element: HistoryElement) => {},
  deleteHistoryElement: (id: string) => {},
});

// The Provider component
export function HistoryContextProvider({ children }: HistoryContextProps) {
  // Use user ID to fetch history from localStorage for different accounts
  const userId = localStorage.getItem("accountType"); // Fetch current user's ID (you can store this when user logs in)
  // console.log('user Id:' , userId)

  // If there's no userId, assign a default one (or handle user creation/login logic)
  const currentUserId = userId || "false"; 

  // Use localStorage to store user-specific history
  const [history, setHistory] = useLocalStorage<HistoryElement[]>({
    key: `${currentUserId}_History`, // Key is unique to each user
    defaultValue: [],
  });

  function setHistoryHandler(history: HistoryElement[]) {
    setHistory(history);
  }

  // Adds a history element for the specific user
  function addHistoryElementHandler(element: HistoryElement) {
    var today = new Date();
    var date =
      today.getDate() +
      "/" +
      (today.getMonth() + 1) +
      "/" +
      today.getFullYear();
    setHistory((prev: HistoryElement[]) => {
      return [
        {
          label: element.label,
          amount: element.amount,
          type: element.type,
          id: element.id,
          dateCreated: date,
          category: element.category,
        },
        ...prev,
      ];
    });
  }

  // Deletes a history element for the specific user
  function deleteHistoryElementHandler(id: string) {
    setHistory((prev) => {
      return prev.filter((h) => h.id !== id);
    });
  }

  // Context value
  const context = {
    history: history,
    setHistory: setHistoryHandler,
    addHistoryElement: addHistoryElementHandler,
    deleteHistoryElement: deleteHistoryElementHandler,
  };

  return (
    <HistoryContext.Provider value={context}>
      {children}
    </HistoryContext.Provider>
  );
}

export default HistoryContext;
