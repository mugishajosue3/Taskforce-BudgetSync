import { useContext } from "react";
import { MantineNumberSize } from '@mantine/core';
import { SimpleGrid, useMantineTheme, MediaQuery } from "@mantine/core";
import DisplayCard from "./DisplayCard";
import CategoriesContext from "../store/CategoriesContext";

const DisplayCategories = () => {
  const { categories } = useContext(CategoriesContext);
  const theme = useMantineTheme();

  return (
    <SimpleGrid
      cols={4}
      breakpoints={[
        { maxWidth: theme.breakpoints.lg, cols: 3 },
        { maxWidth: theme.breakpoints.md, cols: 2 },
        { maxWidth: theme.breakpoints.sm, cols: 1 },
      ]}
      spacing={'sm' as MantineNumberSize}
      verticalSpacing={'sm' as MantineNumberSize}
    >
      {categories.length > 0 ? (
        categories.map((category) => (
          <DisplayCard
            key={category.id}
            label={category.label}
            amount={category.amount}
            color="gray.6"
          />
        ))
      ) : (
        <MediaQuery
          query="(min-width: 768px)"
          styles={{
            gridColumn: "span 4",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[6],
          }}
        >
          <div>
            No categories to display
          </div>
        </MediaQuery>
      )}
    </SimpleGrid>
  );
};

export default DisplayCategories;