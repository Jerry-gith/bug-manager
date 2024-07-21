"use client";

import {
  AlertDialog,
  Box,
  Button,
  Card,
  Flex,
  Grid,
  Heading,
  Text,
} from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { FiEdit } from "react-icons/fi";
import { MdOutlineDeleteSweep } from "react-icons/md";
import ReactMarkdown from "react-markdown";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import BugStatusBadge from "@/components/BugStatusBadge";
import { Bug } from "@prisma/client";
import Spinner from "@/components/Spinner";

const BugDetails = ({ id, title, description, status, createdAt }: Bug) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<boolean | undefined>(undefined);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await axios.delete("/api/bugs/" + id);
      router.push("/bugs");
      router.refresh();
    } catch (err) {
      setIsDeleting(false);
      console.error("Error deleting bug:", err);
      setError(true);
    }
  };

  return (
    <>
      <Grid columns={{ initial: "1", sm: "5" }} gap="4">
        <Box className="md:col-span-4">
          <Heading className="font-bold">{title}</Heading>
          <Flex gap="3" my="3" className="items-center">
            <BugStatusBadge status={status} />
            <Text>{new Date(createdAt).toDateString()}</Text>
          </Flex>
          <Card className="prose max-w-full">
            <ReactMarkdown>{description}</ReactMarkdown>
          </Card>
        </Box>

        <Box className="mt-2 md:mt-0">
          <Flex direction="column" gap="2">
            <Button color="violet">
              <FiEdit />
              <Link href={`/bugs/${id}/edit`}>Edit Bug</Link>
            </Button>

            <AlertDialog.Root>
              <AlertDialog.Trigger>
                <Button disabled={isDeleting} color="red">
                  {isDeleting ? (
                    <>
                      Deleting <Spinner />
                    </>
                  ) : (
                    <>
                      <MdOutlineDeleteSweep className="text-xl" />
                      Delete Bug
                    </>
                  )}
                </Button>
                {/* <Button color="red">
                  <MdOutlineDeleteSweep className="text-xl" />
                </Button> */}
              </AlertDialog.Trigger>
              <AlertDialog.Content>
                <AlertDialog.Title>Confirm Deletion.</AlertDialog.Title>
                <AlertDialog.Description>
                  Are you sure you want to delete this bug? This action cannot
                  be undone!
                </AlertDialog.Description>
                <Flex mt="4" gap="3">
                  <AlertDialog.Cancel>
                    <Button variant="surface" color="gray">
                      Cancel
                    </Button>
                  </AlertDialog.Cancel>

                  <AlertDialog.Action>
                    <Button color="red" onClick={handleDelete}>
                      Delete Bug
                    </Button>
                  </AlertDialog.Action>
                </Flex>
              </AlertDialog.Content>
            </AlertDialog.Root>
          </Flex>
        </Box>
      </Grid>

      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description color="red">
            This bug couldn't be deleted due to some error! Kindly, try again
            later.
          </AlertDialog.Description>
          <Button
            color="gray"
            variant="soft"
            mt="4"
            onClick={() => setError(false)}
          >
            OK
          </Button>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default BugDetails;
