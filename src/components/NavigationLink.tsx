// NavigationLink.tsx
import { UnstyledButton } from "@mantine/core";
import { Link } from "react-router-dom";

interface NavigationLinkProps {
  label: string;
  icon: React.ReactNode;
  link: string;
  onNavigate?: () => void;
}

const NavigationLink = ({ label, icon, link, onNavigate }: NavigationLinkProps) => {
  return (
    <UnstyledButton
      component={Link}
      to={link}
      onClick={onNavigate}
      sx={(theme) => ({
        display: "block",
        width: "100%",
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
        "&:hover": {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[6]
              : theme.colors.gray[0],
        },
      })}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <span style={{ marginRight: 10 }}>{icon}</span>
        <span>{label}</span>
      </div>
    </UnstyledButton>
  );
};

export default NavigationLink;