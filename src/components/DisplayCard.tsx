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
      padding={{ base: 'md', sm: 'lg', md: 'xl' }}
      mb={{ base: 'md', sm: 'lg' }}
      sx={(theme) => ({
        height: 'auto',
        minHeight: { base: '180px', sm: '200px', md: '220px' },
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        transition: 'transform 0.2s ease',
        '&:hover': {
          transform: 'translateY(-5px)',
        },
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
      })}
    >
      <Text 
        weight={500}
        size={{ base: 24, sm: 28, md: 32 }}
        sx={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          wordBreak: 'break-word',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          lineHeight: 1.2,
        }}
      >
        {label}
      </Text>
      <Text 
        mt="xs"
        size={{ base: 24, sm: 28, md: 32 }}
        color={color}
        weight={500}
        sx={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          wordBreak: 'break-word',
        }}
      >
        ${amount.toLocaleString("en-US")}
      </Text>
    </Card>
  );
};

export default DisplayCard;