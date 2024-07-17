import BugStatusBadge from "@/components/BugStatusBadge";
import prisma from "@/prisma/client";
import { Flex, Heading, Text, Card } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

const BugDetails = async ({ params }: { params: { id: string } }) => {
  const bugDetail = await prisma.bug.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!!!bugDetail) notFound();

  return (
    <div className="space-y-4">
      <Heading className="font-bold">{bugDetail.title}</Heading>
      <Flex gap="3" my="3" className="items-center">
        <BugStatusBadge status={bugDetail.status} />
        <Text>{bugDetail.createdAt.toDateString()}</Text>
      </Flex>
      <Card className="prose">
        <ReactMarkdown>{bugDetail.description}</ReactMarkdown>
      </Card>
    </div>
  );
};

export default BugDetails;
