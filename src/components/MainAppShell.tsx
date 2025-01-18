import {
  AppShell,
  Burger,
  ColorScheme,
  ColorSchemeProvider,
  Header,
  MantineProvider,
  MediaQuery,
  Navbar,
  Text,
  useMantineTheme,
  Menu,
  Button,
} from "@mantine/core";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { CgCalculator } from "react-icons/cg";
import { AiOutlineHome } from "react-icons/ai";
import { MdAttachMoney } from "react-icons/md";
import { BsBarChartLine, BsPlusCircle } from "react-icons/bs";
import NavigationLink from "./NavigationLink";
import DarkLightThemeButton from "./DarkLightThemeButton";
import HomePage from "../pages/HomePage";
import AddBudgetPage from "../pages/AddBudgetPage";
import AddExpensePage from "../pages/AddExpensePage";
import { useLocalStorage } from "@mantine/hooks";
import DisplayCategoriesPage from "../pages/DisplayCategoriesPage";
import "./../index.css";
import AccountSelectionModal from "./AccountSelectionModal";

const MainAppShell = () => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "theme",
    defaultValue: "dark",
  });
  const [accountType, setAccountType] = useState<string>("false");

  useEffect(() => {
    const storedAccountType = localStorage.getItem("accountType");
    if (storedAccountType) setAccountType(storedAccountType);
  }, []);

  if(accountType === 'false') 
    return <AccountSelectionModal />
  

  const handleAccountChange = (type: string) => {
    if (type === "Log out") {
      localStorage.removeItem("accountType");
      setAccountType("false");
    } else {
      setAccountType(type);
      localStorage.setItem("accountType", type);
      window.location.reload();
    }
  };

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{ colorScheme }}
        withGlobalStyles
        withNormalizeCSS
      >
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
              <NavigationLink
                label="Home"
                icon={<AiOutlineHome />}
                link="/"
              />
              <NavigationLink
                label="Add an Expense"
                icon={<BsPlusCircle />}
                link="/newExpense"
              />
              <NavigationLink
                label="Add / Update Your Budget"
                icon={<MdAttachMoney />}
                link="/newBudget"
              />
              <NavigationLink
                label="View Spending in Categories"
                icon={<BsBarChartLine />}
                link="/categories"
              />

              {/* Account Dropdown */}
              <div
                style={{
                  marginTop: "auto",
                  borderTop: `1px solid ${
                    theme.colorScheme === "dark"
                      ? theme.colors.dark[4]
                      : theme.colors.gray[3]
                  }`,
                  paddingTop: theme.spacing.sm,
                }}
              >
                <Menu>
                  <Menu.Target>
                    <Button
                      fullWidth
                      variant="outline"
                      color="gray"
                    >
                      {accountType}
                    </Button>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item
                    fullWidth 
                    onClick={() => handleAccountChange("BK Account")}>
                      BK Account
                    </Menu.Item>
                    <Menu.Item onClick={() => handleAccountChange("Equity Bank Account")}>
                      Equity Bank Account
                    </Menu.Item>
                    <Menu.Item onClick={() => handleAccountChange("MOMO Account")}>
                      MOMO Account
                    </Menu.Item>
                    <Menu.Item onClick={() => handleAccountChange("CASH")}>
                      CASH
                    </Menu.Item>
                    <Menu.Divider />
                    <Menu.Item
                      color="red"
                      onClick={() => handleAccountChange("Log out")}
                     >
                      Log out
                    </Menu.Item>
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
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <img
                    src="/icons8-calculator-64.png"
                    alt="BudgetSync Logo"
                    className="h-10 w-10"
                  />
                  <Text ml={10}>BudgetSync</Text>
                </div>
                <DarkLightThemeButton />
              </div>
            </Header>
          }
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/newExpense" element={<AddExpensePage />} />
            <Route path="/newBudget" element={<AddBudgetPage />} />
            <Route path="/categories" element={<DisplayCategoriesPage />} />
          </Routes>
        </AppShell>
      </MantineProvider>
    </ColorSchemeProvider>
  );
};

export default MainAppShell;
