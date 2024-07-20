"use client";

import Spinner from "@/components/Spinner";
import { Button, Callout, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useParams, useRouter } from "next/navigation";
import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useState,
} from "react";
import { MdErrorOutline } from "react-icons/md";
import SimpleMDE from "react-simplemde-editor";

const EditBug = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const [bug, setBug] = useState<{
    title?: string;
    description?: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (id) {
      axios
        .post("/api/bugs/edit/get-bug", { id })
        .then((response) => {
          setBug(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error sending ID to backend:", error);
          setError("Failed to fetch bug details");
          setLoading(false);
        });
    }
  }, [id]);

  const handleChange = () => {
    const bugTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setBug({ ...bug, title: e.target.value });
    };

    const bugDescriptionChange = (value: string) => {
      setBug({ ...bug, description: value });
    };

    return { bugTitleChange, bugDescriptionChange };
  };

  const { bugTitleChange, bugDescriptionChange } = handleChange();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const bugDetails = {
      id: id,
      title: bug?.title,
      description: bug?.description,
    };

    try {
      setIsSubmitting(true);
      await axios.patch("/api/bugs/edit/edit-bug", bugDetails);
      router.push(`/bugs/${id}/`);
      router.refresh()
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
          value={bug?.title}
          onChange={bugTitleChange}
        />

        <SimpleMDE value={bug?.description} onChange={bugDescriptionChange} />

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

export default EditBug;