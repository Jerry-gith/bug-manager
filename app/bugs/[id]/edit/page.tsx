import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import EditBugDetails from "../../_components/EditBugDetails";

const EditBug = async ({ params }: { params: { id: string } }) => {
  const bug = await prisma.bug.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!bug) {
    notFound();
  }

  return (
    <EditBugDetails
      id={bug.id}
      title={bug.title}
      description={bug.description}
      status={bug.status}
      createdAt={bug.createdAt}
      updatedAt={bug.updatedAt}
      userId={bug.userId}
    />
  );
};

export default EditBug;
