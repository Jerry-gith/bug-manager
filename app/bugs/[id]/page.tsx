// import BugStatusBadge from "@/components/BugStatusBadge";
// import prisma from "@/prisma/client";
// import {
//   AlertDialog,
//   Box,
//   Button,
//   Card,
//   Flex,
//   Grid,
//   Heading,
//   Text,
// } from "@radix-ui/themes";
// import axios from "axios";
// import Link from "next/link";
// import { notFound, useRouter } from "next/navigation";
// import { FiEdit } from "react-icons/fi";
// import { MdOutlineDeleteSweep } from "react-icons/md";
// import ReactMarkdown from "react-markdown";

// const BugDetails = async ({ params }: { params: { id: string } }) => {
//   const router = useRouter()

//   const bugDetail = await prisma.bug.findUnique({
//     where: { id: parseInt(params.id) },
//   });

//   if (!!!bugDetail) notFound();

//   const handleDelete = async () => {
//     await axios.delete("/api/bugs/" + bugDetail.id)
//     // router.push("/bugs")
//     // router.refresh()
//   }

//   return (
//     <Grid columns={{ initial: "1", sm: "5" }} gap="4">
//       <Box className="md:col-span-4">
//         <Heading className="font-bold">{bugDetail.title}</Heading>
//         <Flex gap="3" my="3" className="items-center">
//           <BugStatusBadge status={bugDetail.status} />
//           <Text>{bugDetail.createdAt.toDateString()}</Text>
//         </Flex>
//         <Card className="prose max-w-full">
//           <ReactMarkdown>{bugDetail.description}</ReactMarkdown>
//         </Card>
//       </Box>

//       <Box className="mt-2 md:mt-0">
//         <Flex direction="column" gap="2">
//           <Button color="violet">
//             <FiEdit />
//             <Link href={`/bugs/${bugDetail.id}/edit`}>Edit Bug</Link>
//           </Button>

//           <AlertDialog.Root>
//             <AlertDialog.Trigger>
//               <Button color="red">
//                 <MdOutlineDeleteSweep className="text-xl" /> Delete Bug
//                 {/* <Link href={`/bugs/${bugDetail.id}/edit`}>Delete Bug</Link> */}
//               </Button>
//             </AlertDialog.Trigger>
//             <AlertDialog.Content>
//               <AlertDialog.Title>Confirm Deletion.</AlertDialog.Title>
//               <AlertDialog.Description>
//                 Are you sure you want to delete this bug? This action cannot be
//                 undone!
//               </AlertDialog.Description>
//               <Flex mt="4" gap="3">
//                 <AlertDialog.Cancel>
//                   <Button variant="surface" color="gray">
//                     Cancel
//                   </Button>
//                 </AlertDialog.Cancel>

//                 <AlertDialog.Action>
//                   <Button color="red" onClick={handleDelete}>Delete Issue</Button>
//                 </AlertDialog.Action>
//               </Flex>
//             </AlertDialog.Content>
//           </AlertDialog.Root>
//         </Flex>
//       </Box>
//     </Grid>
//   );
// };

// export default BugDetails;



import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import BugDetails from "../_components/BugDetails";

interface BugDetailProps {
  params: {
    id: string;
  };
}

const BugDetailsPage = async ({ params }: BugDetailProps) => {
  const { id } = params;

  const bugDetail = await prisma.bug.findUnique({
    where: { id: parseInt(id) },
  });

  if (!bugDetail) {
    notFound();
  }

  return <BugDetails id={bugDetail.id} title={bugDetail.title} description={bugDetail.description} status={bugDetail.status} createdAt={bugDetail.createdAt} updatedAt={bugDetail.updatedAt}/>;
};

export default BugDetailsPage;
