"use client";

import Spinner from "@/components/Spinner";
import { Button, Callout } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useCallback, useState } from "react";
import { MdErrorOutline } from "react-icons/md";
import { BugForm } from "../_components";

const NewBugPage = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
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
      await axios.post("/api/bugs/", bugDetails);
      router.push("/bugs");
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

      <BugForm
        bugForm={{
          heading: "New Bug Page",
          title: bugTitle,
          description: bugDescription,
          bugTitleChange,
          bugDescriptionChange,
          handleSubmit,
          Button: (
            <Button disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  Submitting <Spinner />
                </>
              ) : (
                "Submit New Bug"
              )}
            </Button>
          ),
        }}
      />

      {/* <form className="space-y-4" onSubmit={handleSubmit}>
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
      </form> */}
    </div>
  );
};

export default NewBugPage;
