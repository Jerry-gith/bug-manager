import Link from "next/link";
import { Button } from "@radix-ui/themes";

const BugsPage = () => {
  return (
    <div>
      <h2>Bugs Page</h2>
      <Button><Link href={"/bugs/new"}>New Bug</Link></Button>
    </div>
  );
};

export default BugsPage;
