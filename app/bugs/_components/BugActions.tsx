import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import BugStatusFIlter from "./BugStatusFilter";

const BugActions = () => {
  return (
    <Flex justify="between">
    <BugStatusFIlter />
    <Button>
      <Link href={"/bugs/new"}>New Bug</Link>
    </Button>
  </Flex>
  );
}

export default BugActions;