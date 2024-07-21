import { Button } from "@radix-ui/themes";
import Link from "next/link";

const BugToolBar = () => {
  return (
    <div className="">
      <Button>
        <Link href={"/bugs/new"}>New Bug</Link>
      </Button>
    </div>
  );
};

export default BugToolBar;
