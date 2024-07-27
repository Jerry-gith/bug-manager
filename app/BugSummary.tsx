import { Status } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const BugSummary = ({ open, inProgress, closed }: Props) => {
  const statuses: {
    label: string;
    value: number;
    status: Status;
  }[] = [
    { label: "Open Bugs", value: open, status: "OPEN" },
    { label: "In-Progress Bugs", value: inProgress, status: "IN_PROGRESS" },
    { label: "Closed Bugs", value: closed, status: "CLOSED" },
  ];
  return (
    <Flex gap="4">
      {statuses.map((status) => (
        <Card key={status.label}>
          <Flex direction="column" gap="1">
            <Link className="text-xs md:text-sm md:font-bold hover:text-[#e2005bc2]" href={`/bugs?status=${status.status}`}>{status.label}</Link>
            <Text size="5" className="font-bold">{status.value}</Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default BugSummary;
