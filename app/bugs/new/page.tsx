import { Button, TextArea, TextField } from "@radix-ui/themes";

const NewBugPage = () => {
  return (
    <div className="space-y-4">
      <h2 className="">New Bug Page</h2>
      <TextField.Root variant="surface" placeholder="What's the bug…" />
      <TextArea placeholder="Describe the bug…" />
      <Button>Submit New Bug</Button>
    </div>
  );
};

export default NewBugPage;
