import prisma from "@/prisma/client";
import { Button, Table } from "@radix-ui/themes";
import Link from "next/link";

const BugsPage = async () => {
  const bugs = await prisma.bug.findMany();

  return (
    <div className="space-y-4">
      <h2>Bugs Page</h2>
      <Button>
        <Link href={"/bugs/new"}>New Bug</Link>
      </Button>

      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Bugs</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">Date</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {bugs.map((bug) => (
            <Table.Row key={bug.id}>
              <Table.Cell>
                {bug.title}
                <small className="block text-gray-500 md:hidden">{bug.status}</small>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">{bug.status}</Table.Cell>
              <Table.Cell className="hidden md:table-cell">{bug.createdAt.toDateString()}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default BugsPage;
