import { Group, Text, ThemeIcon, UnstyledButton } from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";

type NavigationLinkProps = {
  label: string;
  icon: React.ReactNode;
  link: string;
};

const NavigationLink = ({ icon, label, link }: NavigationLinkProps) => {
  return (
    <UnstyledButton
      component={Link}
      to={link}
      sx={(theme) => ({
        display: "block",
        width: "100%",
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color:
          theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

        "&:hover": {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[6]
              : theme.colors.gray[0],
        },
      })}
    >
      <Group>
        <ThemeIcon className="text-[4rem]" variant="light" style={{backgroundColor: "transparent"}}>
          {icon}
        </ThemeIcon>
        <Text>{label}</Text>
      </Group>
    </UnstyledButton>
  );
};

export default NavigationLink;
