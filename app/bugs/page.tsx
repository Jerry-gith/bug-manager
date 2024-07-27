import Pagination from "@/components/Pagination";
import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import { Text } from "@radix-ui/themes";
import { Metadata } from "next";
import { BugActions, BugTable } from "./_components";
import { BugQuery, columnNames } from "./_components/BugTable";

const BugsPage = async ({ searchParams }: { searchParams: BugQuery }) => {
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const orderBy = columnNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const bugs = await prisma.bug.findMany({
    where: { status },
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const bugCount = await prisma.bug.count({ where: { status } });

  return (
    <div className="space-y-4">
      <Text weight="bold">All Bugs</Text>
      <BugActions />
      <BugTable searchParams={searchParams} bugs={bugs} />
      <Pagination itemCount={bugCount} pageSize={pageSize} currentPage={page} />
    </div>
  );
};

// export const dynamic = 'force-dynamic'

export default BugsPage;

export const metadata: Metadata = {
  title: "Bug Manager - All Bug",
  description: "View all project bugs",
};
