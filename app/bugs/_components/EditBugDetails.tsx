"use client";

import Spinner from "@/components/Spinner";
import { Bug } from "@prisma/client";
import { Button, Callout, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { MdErrorOutline } from "react-icons/md";
import SimpleMDE from "react-simplemde-editor";

const EditBugDetails = ({ id, title, description, status, createdAt }: Bug) => {
  const router = useRouter();
  const [updatedBug, setUpdatedBug] = useState<{
    title?: string;
    description?: string;
  }>({ title, description });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = () => {
    const bugTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setUpdatedBug({ ...updatedBug, title: e.target.value });
    };

    const bugDescriptionChange = (value: string) => {
      setUpdatedBug({ ...updatedBug, description: value });
    };

    return { bugTitleChange, bugDescriptionChange };
  };

  const { bugTitleChange, bugDescriptionChange } = handleChange();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);
      await axios.patch(`/api/bugs/${id}`, updatedBug);
      router.push(`/bugs/${id}/`);
      router.refresh();
    } catch (error) {
      setIsSubmitting(false);
      setError(`${error}`);
    }
  };

  return (
    <div>
      {error && (
        <Callout.Root variant="surface" color="red" className="mb-4">
          <Callout.Icon>
            <MdErrorOutline />
          </Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}

      <form className="space-y-4" onSubmit={handleSubmit}>
        <h2 className="">Edit Bug Page</h2>
        <TextField.Root
          variant="surface"
          value={title}
          onChange={bugTitleChange}
        />

        <SimpleMDE value={description} onChange={bugDescriptionChange} />

        <Button disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              Submitting <Spinner />
            </>
          ) : (
            "Submit Bug"
          )}
        </Button>
      </form>
    </div>
  );
};

export default EditBugDetails;
