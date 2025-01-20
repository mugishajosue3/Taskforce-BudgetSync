import {
  AppShell,
  Burger,
  ColorScheme,
  ColorSchemeProvider,
  Header,
  MantineProvider,
  MediaQuery,
  Navbar,
  Menu,
  Button,
  useMantineTheme,
  LoadingOverlay,
} from "@mantine/core";
import { useState, useEffect, useCallback, Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { MdAttachMoney } from "react-icons/md";
import { BsBarChartLine, BsPlusCircle } from "react-icons/bs";
import NavigationLink from "./NavigationLink";
import DarkLightThemeButton from "./DarkLightThemeButton";
import { useLocalStorage } from "@mantine/hooks";
import AccountSelectionModal from "./AccountSelectionModal";
import { ErrorBoundary } from "react-error-boundary";
import { FallbackProps } from 'react-error-boundary';

// Lazy load pages (unchanged)
const HomePage = lazy(() => import("../pages/HomePage"));
const AddBudgetPage = lazy(() => import("../pages/AddBudgetPage"));
const AddExpensePage = lazy(() => import("../pages/AddExpensePage"));
const DisplayCategoriesPage = lazy(() => import("../pages/DisplayCategoriesPage"));

// Default account types
const defaultAccounts = [
  "BK Account",
  "Equity Bank Account",
  "MOMO Account",
  "CASH"
];

// Error Fallback Component (unchanged)
const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <div role="alert" style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Something went wrong:</h2>
      <pre style={{ color: 'red' }}>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
};

const MainAppShell = () => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "theme",
    defaultValue: "dark",
  });

  const [accountType, setAccountType] = useState<string>("");
  const [availableAccounts, setAvailableAccounts] = useState<string[]>(defaultAccounts);

  const toggleColorScheme = useCallback(
    (value?: ColorScheme) =>
      setColorScheme(value || (colorScheme === "dark" ? "light" : "dark")),
    [colorScheme, setColorScheme]
  );

  const handleNavigation = useCallback(() => {
    if (window.innerWidth < theme.breakpoints.sm) {
      setOpened(false);
    }
  }, [theme.breakpoints.sm]);

  const handleAccountChange = useCallback((type: string) => {
    if (type === "Log out") {
      localStorage.removeItem("accountType");
      setAccountType("");
    } else {
      setAccountType(type);
      localStorage.setItem("accountType", type);
      window.location.reload();
    }
  }, []);

  const handleLogout = useCallback(() => {
    handleAccountChange("Log out");
  }, [handleAccountChange]);

  // Load accounts from localStorage
  useEffect(() => {
    const loadAccounts = () => {
      try {
        const userAccounts = JSON.parse(localStorage.getItem("user-accounts")) || [];
        const currentAccount = JSON.parse(localStorage.getItem("current-account"));
        
        // Create a Set to store unique account names
        const uniqueAccounts = new Set(defaultAccounts);
        
        // Add user accounts
        userAccounts.forEach((account: any) => {
          if (account.name) {
            uniqueAccounts.add(account.name);
          }
        });
        
        // Add current account if it exists
        if (currentAccount?.name) {
          uniqueAccounts.add(currentAccount.name);
        }
        
        setAvailableAccounts(Array.from(uniqueAccounts));
      } catch (error) {
        console.error("Error loading accounts:", error);
        setAvailableAccounts(defaultAccounts);
      }
    };

    loadAccounts();
  }, []);

  // Load current account type
  useEffect(() => {
    const storedAccountType = localStorage.getItem("accountType");
    if (storedAccountType) {
      setAccountType(storedAccountType);
    } else {
      setAccountType("false");
    }
  }, []);

  if (accountType === "false" || accountType === "") {
    return <AccountSelectionModal />;
  }

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        setAccountType("");
      }}
    >
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
          <AppShell
            styles={(theme) => ({
              main: {
                backgroundColor:
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[8]
                    : theme.colors.gray[0],
              },
            })}
            navbarOffsetBreakpoint="sm"
            asideOffsetBreakpoint="sm"
            navbar={
              <Navbar
                p="md"
                hiddenBreakpoint="sm"
                hidden={!opened}
                width={{ sm: 250, lg: 350 }}
              >
                {/* Navigation Links (unchanged) */}
                <NavigationLink
                  label="Home"
                  icon={<AiOutlineHome />}
                  link="/"
                  onNavigate={handleNavigation}
                />
                <NavigationLink
                  label="Add an Expense"
                  icon={<BsPlusCircle />}
                  link="/newExpense"
                  onNavigate={handleNavigation}
                />
                <NavigationLink
                  label="Add / Update Your Budget"
                  icon={<MdAttachMoney />}
                  link="/newBudget"
                  onNavigate={handleNavigation}
                />
                <NavigationLink
                  label="View Spending in Categories"
                  icon={<BsBarChartLine />}
                  link="/categories"
                  onNavigate={handleNavigation}
                />

                <div
                  style={{
                    marginTop: "70px",
                    borderTop: `1px solid ${
                      theme.colorScheme === "dark"
                        ? theme.colors.dark[4]
                        : theme.colors.gray[3]
                    }`,
                    paddingTop: theme.spacing.sm,
                  }}
                >
                  <Menu>
                    <Menu.Target className="flex flex-col items-center justify-center">
                      <Button className="w-40" variant="outline" color="gray">
                        {accountType.replace(/"/g, "")}
                      </Button>
                    </Menu.Target>
                    <Menu.Dropdown>
                      {availableAccounts.map((account) => (
                        <Menu.Item 
                          key={account}
                          onClick={() => handleAccountChange(account)}
                        >
                          {account}
                        </Menu.Item>
                      ))}
                      <Menu.Divider />
                      <Menu.Item onClick={handleLogout}>Logout</Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                </div>
              </Navbar>
            }
            header={
              <Header
                height={{ base: 50, md: 70 }}
                p="md"
                sx={(theme) => ({
                  color:
                    theme.colorScheme === "dark"
                      ? theme.colors.dark[1]
                      : theme.colors.gray[9],
                  fontSize: "25px",
                })}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    height: "100%",
                  }}
                >
                  <MediaQuery largerThan="sm" styles={{ display: "none" }}>
                    <Burger
                      opened={opened}
                      onClick={() => setOpened((o) => !o)}
                      size="sm"
                      color={theme.colors.gray[6]}
                      mr="xl"
                    />
                  </MediaQuery>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      height: "100%",
                    }}
                  >
                    <img
                      src="/icons8-calculator-64.png"
                      alt="budgetSync - Code of Africa GmbH Logo"
                      className="h-10 w-10"
                    />
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center sm:text-left p-4 sm:p-6">
                      budgetSync - Code of Africa GmbH
                    </h2>
                  </div>
                  <DarkLightThemeButton />
                </div>
              </Header>
            }
          >
            <Suspense fallback={<LoadingOverlay visible={true} overlayBlur={2} />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/newExpense" element={<AddExpensePage />} />
                <Route path="/newBudget" element={<AddBudgetPage />} />
                <Route path="/categories" element={<DisplayCategoriesPage />} />
              </Routes>
            </Suspense>
          </AppShell>
        </MantineProvider>
      </ColorSchemeProvider>
    </ErrorBoundary>
  );
};

export default MainAppShell;