import BugStatusBadge from "@/components/BugStatusBadge";
import prisma from "@/prisma/client";
import { Box, Button, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FiEdit } from "react-icons/fi";
import ReactMarkdown from "react-markdown";

const BugDetails = async ({ params }: { params: { id: string } }) => {
  const bugDetail = await prisma.bug.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!!!bugDetail) notFound();

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="4">
      <Box>
        <Heading className="font-bold">{bugDetail.title}</Heading>
        <Flex gap="3" my="3" className="items-center">
          <BugStatusBadge status={bugDetail.status} />
          <Text>{bugDetail.createdAt.toDateString()}</Text>
        </Flex>
        <Card className="prose">
          <ReactMarkdown>{bugDetail.description}</ReactMarkdown>
        </Card>
      </Box>

      <Box>
        <Button>
          <FiEdit />
          <Link href={`/bugs/${bugDetail.id}/edit`}>Edit Bug</Link>
        </Button>
      </Box>
    </Grid>
  );
};

export default BugDetails;
