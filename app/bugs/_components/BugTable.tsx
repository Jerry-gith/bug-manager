import BugStatusBadge from "@/components/BugStatusBadge";
import { Bug, Status } from "@prisma/client";
import { Table, Link as RadixLink } from "@radix-ui/themes";
import Link from "next/link";
import { IoArrowUpCircleOutline } from "react-icons/io5";

export interface BugQuery {
  status: Status;
  orderBy: keyof Bug;
  page: string;
}

const BugTable = ({
  searchParams,
  bugs,
}: {
  searchParams: BugQuery;
  bugs: Bug[];
}) => {
  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {columns.map((column) => (
            <Table.ColumnHeaderCell
              key={column.value}
              className={column.className}
            >
              <Link
                href={{
                  query: { ...searchParams, orderBy: column.value },
                }}
              >
                {column.label}
              </Link>
              {column.value === searchParams.orderBy && (
                <IoArrowUpCircleOutline className="inline ml-1" />
              )}
            </Table.ColumnHeaderCell>
          ))}
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
  );
};

const columns: {
  label: string;
  value: keyof Bug;
  className?: string;
}[] = [
  { label: "Bugs", value: "title" },
  { label: "Status", value: "status", className: "hidden md:table-cell" },
  { label: "Date", value: "createdAt", className: "hidden md:table-cell" },
];

export const columnNames = columns.map((columns) => columns.value);

export default BugTable;
