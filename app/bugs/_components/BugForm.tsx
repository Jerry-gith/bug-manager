"use client";

import { Bug } from "@prisma/client";
import { TextField } from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";
import {
  ChangeEvent,
  FormEvent,
  ReactNode
} from "react";
import SimpleMDE from "react-simplemde-editor";

interface BugFormProp {
  bugForm: {
    heading: string;
    title: Bug["title"];
    description: Bug["description"];
    bugTitleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    bugDescriptionChange: (value: string) => void;
    handleSubmit: (e: FormEvent) => Promise<void>;
    Button: ReactNode;
  };
}

const BugForm: React.FC<BugFormProp> = ({ bugForm }) => {
  return (
    <form className="space-y-4" onSubmit={bugForm.handleSubmit}>
      <h2 className="">{bugForm.heading}</h2>
      <TextField.Root
        placeholder="What's the bug…"
        variant="surface"
        value={bugForm.title}
        onChange={bugForm.bugTitleChange}
      />

      <SimpleMDE
        placeholder="Describe the bug…"
        value={bugForm.description}
        onChange={bugForm.bugDescriptionChange}
      />

      {bugForm.Button}
    </form>
  );
};

export default BugForm;
