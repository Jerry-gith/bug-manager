// import { Bug } from "@prisma/client";
// import { AlertDialog, Box, Button, Flex, Spinner } from "@radix-ui/themes";
// import axios from "axios";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { ReactNode, useState } from "react";
// import { FiEdit } from "react-icons/fi";
// import { MdOutlineDeleteSweep } from "react-icons/md";
// import { AssignBugToAUser } from ".";



// // export interface BugDetailsCompProps {
// //   bug: Bug;
// //   handleDelete: () => Promise<void>;
// //   Button: ReactNode,
// //   Link: ReactNode
// // }

// const BugActions = ({ handleDelete }: BugDetailsCompProps) => {
//   // const router = useRouter();
//   // const [isDeleting, setIsDeleting] = useState(false);
//   // const [error, setError] = useState<boolean | undefined>(undefined);

//   // const handleDelete = async () => {
//   //   try {
//   //     setIsDeleting(true);
//   //     await axios.delete("/api/bugs/" + id);
//   //     router.push("/bugs");
//   //     router.refresh();
//   //   } catch (err) {
//   //     setIsDeleting(false);
//   //     console.error("Error deleting bug:", err);
//   //     setError(true);
//   //   }
//   // };
//   return (
//     // <Box className="mt-2 md:mt-0">
//     //   <AssignBugToAUser bug={undefined} />

//     //   <Flex direction="column" gap="2">
//     //     <Button color="violet">
//     //       <FiEdit />
//     //       <Link href={""} />
//     //     </Button>

//     //     <AlertDialog.Root>
//     //       <AlertDialog.Trigger>
//     //         <Button />
//     //       </AlertDialog.Trigger>
//     //       <AlertDialog.Content>
//     //         <AlertDialog.Title>Confirm Deletion.</AlertDialog.Title>
//     //         <AlertDialog.Description>
//     //           Are you sure you want to delete this bug? This action cannot be
//     //           undone!
//     //         </AlertDialog.Description>
//     //         <Flex mt="4" gap="3">
//     //           <AlertDialog.Cancel>
//     //             <Button variant="surface" color="gray">
//     //               Cancel
//     //             </Button>
//     //           </AlertDialog.Cancel>

//     //           <AlertDialog.Action>
//     //             <Button color="red" onClick={handleDelete}>
//     //               Delete Bug
//     //             </Button>
//     //           </AlertDialog.Action>
//     //         </Flex>
//     //       </AlertDialog.Content>
//     //     </AlertDialog.Root>
//     //   </Flex>
//     // </Box>
//   );
// };

// export default BugActions;

import { Button, Flex, Text } from "@radix-ui/themes";
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