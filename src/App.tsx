import { BrowserRouter } from "react-router-dom";
import { Paper } from "@mantine/core";
import { MantineProvider } from "@mantine/core";
import MainAppShell from "./components/MainAppShell";
import { AvailableCategoriesContextProvider } from "./store/AvailableCategoriesContext";
import { CategoriesContextProvider } from "./store/CategoriesContext";
import { HistoryContextProvider } from "./store/HistoryContext";
import { AccountProvider } from "./store/AccountContext";
import { DateRangeProvider } from "./store/DateRangeContext";

export default function App() {
  return (
    <MantineProvider
      theme={{
        fontFamily: "open-sans",
        colorScheme: "dark",
        fontSizes: { md: 90 },
      }}
    >
      <BrowserRouter>
        <AccountProvider>
          <Paper>
            <DateRangeProvider>
              <AvailableCategoriesContextProvider>
                <HistoryContextProvider>
                  <CategoriesContextProvider>
                    <MainAppShell />
                  </CategoriesContextProvider>
                </HistoryContextProvider>
              </AvailableCategoriesContextProvider>
            </DateRangeProvider>
          </Paper>
        </AccountProvider>
      </BrowserRouter>
    </MantineProvider>
  );
}
