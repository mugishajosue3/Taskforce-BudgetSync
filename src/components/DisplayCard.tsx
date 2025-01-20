import { Card, Text, useMantineTheme } from "@mantine/core";

type DisplayCardProps = {
  label: string;
  amount: number;
  color: string;
};

const DisplayCard = ({ label, amount, color }: DisplayCardProps) => {
  const theme = useMantineTheme();

  return (
    <Card
      shadow="sm"
      radius="md"
      withBorder
      style={{
        height: 'auto',
        minHeight: '180px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        transition: 'transform 0.2s ease',
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
      }}
      sx={{
        '&:hover': {
          transform: 'translateY(-5px)',
        },
        '@media (min-width: 768px)': {
          minHeight: '200px',
        },
        '@media (min-width: 992px)': {
          minHeight: '220px',
        }
      }}
    >
      <Text size="xl" weight={500} color={color}>
        {label}
      </Text>
      <Text size="xl" weight={700} color={color}>
        ${amount.toLocaleString("en-US")}
      </Text>
    </Card>
  );
};

export default DisplayCard;