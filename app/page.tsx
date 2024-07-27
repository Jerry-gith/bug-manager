import prisma from "@/prisma/client";
import { Flex, Grid } from "@radix-ui/themes";
import { Metadata } from "next";
import BugChart from "./BugChart";
import BugSummary from "./BugSummary";
import LatestBugs from "./LatestBugs";

export default async function Home() {
  const openBugCount = await prisma.bug.count({
    where: { status: "OPEN" },
  });

  const inProgressBugCount = await prisma.bug.count({
    where: { status: "IN_PROGRESS" },
  });

  const closedBugCount = await prisma.bug.count({
    where: { status: "CLOSED" },
  });
  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Flex direction="column" gap="5">
        <BugSummary
          open={openBugCount}
          inProgress={inProgressBugCount}
          closed={closedBugCount}
        />

        <BugChart
          open={openBugCount}
          inProgress={inProgressBugCount}
          closed={closedBugCount}
        />
      </Flex>

      <LatestBugs />
    </Grid>
  );
}

// export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Bug Manager - Dashboard",
  description: "View a summary of project bugs",
};
