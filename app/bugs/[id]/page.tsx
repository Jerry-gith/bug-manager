import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import { BugDetails } from "../_components";
import { cache } from "react";

const fetchUser = cache((bugId: number) =>
  prisma.bug.findUnique({ where: { id: bugId} })
);

const BugDetailsPage = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  // const bugDetail = await prisma.bug.findUnique({
  //   where: { id: parseInt(params.id) },
  // });

  const bugDetail = await fetchUser(parseInt(params.id));

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
      userId={``}
    />
  );
};

export async function generateMetadata({
  params,
}: {
  params: {
    id: string;
  };
}) {
  
  const bug= await fetchUser(parseInt(params.id));

  return {
    title: bug?.title,
    description: "Details of bug " + bug?.id,
  };
}

export default BugDetailsPage;
