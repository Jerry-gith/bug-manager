import BugStatusBadge from "@/components/BugStatusBadge";
import prisma from "@/prisma/client";
import { Link as RadixLink, Table, Text } from "@radix-ui/themes";
import Link from "next/link";
import { BugActions } from "./_components";
import { Bug, Status } from "@prisma/client";
import { Metadata } from "next";
import { IoArrowUpCircleOutline } from "react-icons/io5";

const BugsPage = async ({
  searchParams,
}: {
  searchParams: { status: Status; orderBy: keyof Bug };
}) => {
  const columns: {
    label: string;
    value: keyof Bug;
    className?: string;
  }[] = [
    { label: "Bugs", value: "title" },
    { label: "Status", value: "status", className: "hidden md:table-cell" },
    { label: "Date", value: "createdAt", className: "hidden md:table-cell" },
  ];

  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const orderBy = columns
    .map((column) => column.value)
    .includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  const bugs = await prisma.bug.findMany({
    where: { status },
    orderBy,
  });

  return (
    <div className="space-y-4">
      <Text weight="bold">All Bugs</Text>

      <BugActions />

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
    </div>
  );
};

// export const dynamic = 'force-dynamic'

export default BugsPage;

export const metadata: Metadata = {
  title: "Bug Manager- Bug List",
  description: "View all project bugs",
};

// import Pagination from '@/app/components/Pagination';
// import prisma from '@/prisma/client';
// import { Status } from '@prisma/client';
// import IssueActions from './IssueActions';
// import IssueTable, { IssueQuery, columnNames } from './IssueTable';
// import { Flex } from '@radix-ui/themes';
// import { Metadata } from 'next';

// interface Props {
//   searchParams: IssueQuery
// }

// const IssuesPage = async ({ searchParams }: Props) => {
//   const statuses = Object.values(Status);
//   const status = statuses.includes(searchParams.status)
//     ? searchParams.status
//     : undefined;
//   const where = { status };

//   const orderBy = columnNames
//     .includes(searchParams.orderBy)
//     ? { [searchParams.orderBy]: 'asc' }
//     : undefined;

//   const page = parseInt(searchParams.page) || 1;
//   const pageSize = 10;

//   const issues = await prisma.issue.findMany({
//     where,
//     orderBy,
//     skip: (page - 1) * pageSize,
//     take: pageSize,
//   });

//   const issueCount = await prisma.issue.count({ where });

//   return (
//     <Flex direction="column" gap="3">
//       <IssueActions />
//       <IssueTable searchParams={searchParams} issues={issues} />
//       <Pagination
//         pageSize={pageSize}
//         currentPage={page}
//         itemCount={issueCount}
//       />
//     </Flex>
//   );
// };
