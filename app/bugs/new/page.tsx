"use client";

import Spinner from "@/components/Spinner";
import { Button, Callout, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useCallback, useState } from "react";
import { MdErrorOutline } from "react-icons/md";
import SimpleMDE from "react-simplemde-editor";

const NewBugPage = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [bugTitle, setBugTitle] = useState("");
  const [bugDescription, setBugDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = () => {
    const bugTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const title = e.target.value;
      setBugTitle(title);
    };
    const bugDescriptionChange = useCallback((value: string) => {
      setBugDescription(value);
    }, []);

    return { bugTitleChange, bugDescriptionChange };
  };

  const { bugTitleChange, bugDescriptionChange } = handleChange();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const bugDetails = {
      title: bugTitle,
      description: bugDescription,
    };

    try {
      setIsSubmitting(true);
      await axios.post("/api/bugs", bugDetails);
      router.push("/bugs");
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
        <h2 className="">New Bug Page</h2>
        <TextField.Root
          variant="surface"
          placeholder="What's the bug…"
          value={bugTitle}
          onChange={bugTitleChange}
        />

        <SimpleMDE
          placeholder="Describe the bug…"
          value={bugDescription}
          onChange={bugDescriptionChange}
        />
        
        <Button disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              Submitting <Spinner />
            </>
          ) : (
            "Submit New Bug"
          )}
        </Button>
      </form>
    </div>
  );
};

export default NewBugPage;
