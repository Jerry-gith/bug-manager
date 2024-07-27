import Pagination from "@/components/Pagination";
import LatestBugs from "./LatestBugs";
import { Heading, Text } from "@radix-ui/themes";

export default function Home() {
  return (
    <div className="space-y-4 mt-4">
      <Heading size="4" color="crimson">
        Latest Bugs
      </Heading>
      <LatestBugs />
      <Pagination itemCount={100} pageSize={10} currentPage={1} />
    </div>
  );
}
