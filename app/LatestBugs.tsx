import BugStatusBadge from "@/components/BugStatusBadge";
import prisma from "@/prisma/client";
import { Avatar, Card, Flex, Table } from "@radix-ui/themes";
import Link from "next/link";

const LatestBugs = async () => {
  const bugs = await prisma.bug.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    include: { User: true },
  });

  return (
    <Card>
    <Table.Root>
      <Table.Body>
        {bugs.map((bug) => (
          <Table.Row key={bug.id}>
            <Table.Cell>
              <Flex justify="between">
                <Flex direction="column" align="start" gap="2">
                  <Link href={`/bugs/${bug.id}`}>{bug.title}</Link>
                  <BugStatusBadge status={bug.status} />
                </Flex>

                <Flex>
                  {bug.userId && <Avatar src={bug.User?.image!} fallback="?" size="2" radius="full"/>}
                </Flex>
              </Flex>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
    </Card>
  );
};

export default LatestBugs;
