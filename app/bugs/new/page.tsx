"use client"

import { Button, TextArea, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

const NewBugPage = () => {
  return (
    <div className="space-y-4">
      <h2 className="">New Bug Page</h2>
      <TextField.Root variant="surface" placeholder="What's the bug…" />
      <SimpleMDE placeholder="Describe the bug…" />
      <Button>Submit New Bug</Button>
    </div>
  );
};

export default NewBugPage;
