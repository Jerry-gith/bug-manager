import LatestBugs from "./LatestBugs";
import { Heading, Text } from "@radix-ui/themes";
import BugSummary from "./BugSummary";
import prisma from "@/prisma/client";
import BugChart from "./BugChart";

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
    <div className="space-y-4 mt-4">
      <Heading size="4" color="crimson">
        Latest Bugs
      </Heading>

      <LatestBugs />
      
      <BugChart
        open={openBugCount}
        inProgress={inProgressBugCount}
        closed={closedBugCount}
      />
      <BugSummary
        open={openBugCount}
        inProgress={inProgressBugCount}
        closed={closedBugCount}
      />
    </div>
  );
}
