import BugStatusBadge from "@/components/BugStatusBadge";
import prisma from "@/prisma/client";
import { Link as RadixLink, Table, Text } from "@radix-ui/themes";
import Link from "next/link";
import { BugActions } from "./_components";

const BugsPage = async () => {
  const bugs = await prisma.bug.findMany();

  return (
    <div className="space-y-4">
      <Text weight="bold">All Bugs</Text>
      {/* <Flex justify="between">
        <Text weight="bold">All Bugs</Text>
        <Button>
          <Link href={"/bugs/new"}>New Bug</Link>
        </Button>
      </Flex> */}
      <BugActions />

      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Bugs</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Date
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {bugs.map((bug) => (
            <Table.Row key={bug.id}>
              <Table.Cell>
                <Link href={`/bugs/${bug.id}`} legacyBehavior>
                  <RadixLink>{bug.title}</RadixLink>
                </Link>

                <small className="block mt-2 md:hidden">
                  <BugStatusBadge status={bug.status} />
                </small>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <BugStatusBadge status={bug.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {bug.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

// export const dynamic = 'force-dynamic'

export default BugsPage;
