import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import {BugDetails} from "../_components";

const BugDetailsPage = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const bugDetail = await prisma.bug.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!bugDetail) {
    notFound();
  }

  return (
    <BugDetails
      id={bugDetail.id}
      title={bugDetail.title}
      description={bugDetail.description}
      status={bugDetail.status}
      createdAt={bugDetail.createdAt}
      updatedAt={bugDetail.updatedAt}
    />
  );
};

export default BugDetailsPage;
