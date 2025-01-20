import { BrowserRouter } from "react-router-dom";
import { Paper, MantineProvider } from "@mantine/core";
import { Suspense, lazy } from 'react';
import { LoadingOverlay } from '@mantine/core';

// Lazy load the main component
const MainAppShell = lazy(() => import("./components/MainAppShell"));

// Lazy load context providers
const AvailableCategoriesContextProvider = lazy(() => 
  import("./store/AvailableCategoriesContext").then(module => ({
    default: module.AvailableCategoriesContextProvider
  }))
);

const CategoriesContextProvider = lazy(() => 
  import("./store/CategoriesContext").then(module => ({
    default: module.CategoriesContextProvider
  }))
);

const HistoryContextProvider = lazy(() => 
  import("./store/HistoryContext").then(module => ({
    default: module.HistoryContextProvider
  }))
);

const AccountProvider = lazy(() => 
  import("./store/AccountContext").then(module => ({
    default: module.AccountProvider
  }))
);

const DateRangeProvider = lazy(() => 
  import("./store/DateRangeContext").then(module => ({
    default: module.DateRangeProvider
  }))
);

export default function App() {
  return (
    <MantineProvider
      theme={{
        fontFamily: "open-sans",
        colorScheme: "dark",
        fontSizes: { md: 90 },
      }}
    >
      <Suspense fallback={<LoadingOverlay visible={true} overlayBlur={2} />}>
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
      </Suspense>
    </MantineProvider>
  );
}