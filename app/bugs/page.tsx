import BugStatusBadge from "@/components/BugStatusBadge";
import prisma from "@/prisma/client";
import { Button, Table } from "@radix-ui/themes";
import BugToolBar from "./BugToolBar";
import delay from "delay";

const BugsPage = async () => {
  const bugs = await prisma.bug.findMany();
  await delay(2000)

  return (
    <div className="space-y-4">
      <h2>Bugs Page</h2>

      <BugToolBar />

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
                {bug.title}
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

export default BugsPage;
