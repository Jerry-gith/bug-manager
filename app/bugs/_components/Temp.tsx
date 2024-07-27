"use client";

import { Box, Button, Flex, AlertDialog } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";
import Link from "next/link";
import { FiEdit } from "react-icons/fi";
import { MdOutlineDeleteSweep } from "react-icons/md";
import Spinner from "@/components/Spinner";
import { AssignBugToAUser } from ".";

const ClientOnlyControls: React.FC<{ id: string }> = ({ id }) => {
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
    <Box className="mt-2 md:mt-0">
      <Flex direction="column" gap="3">
        <AssignBugToAUser user={"User"} />

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
    </Box>
  );
};

export default ClientOnlyControls;
