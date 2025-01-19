import { useContext } from "react";
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
      spacing={{ base: 'sm', sm: 'lg' }}
      verticalSpacing={{ base: 'sm', sm: 'lg' }}
    >
      {categories.map((category) => (
        <DisplayCard
          key={category.id}
          label={category.label}
          amount={category.amount}
          color="gray.6"
        />
      ))}
    </SimpleGrid>
  );
};

export default DisplayCategories;