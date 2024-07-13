"use client";

import { ChangeEvent, FormEvent, useCallback, useState } from "react";
import { Button, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import { useRouter } from "next/navigation";
import "easymde/dist/easymde.min.css";
import axios from "axios";

const NewBugPage = () => {
  const router = useRouter();
  const [bugTitle, setBugTitle] = useState("");
  const [bugDescription, setBugDescription] = useState("");

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

    console.log(bugDetails);
    await axios.post("/api/bugs", bugDetails);

    router.push("/bugs");
  };

  return (
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
      <Button>Submit New Bug</Button>
    </form>
  );
};

export default NewBugPage;
