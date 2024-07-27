import { z } from "zod";

const createBugSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Your title can not be less than 3 characters1" })
    .max(255),
  description: z.string().min(1, { message: "You have to describe the bug." }),
});

const readBugSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Your title can not be less than 3 characters1" })
    .max(255),
  description: z.string().min(1, { message: "You have to describe the bug." }),
});

const editBugSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Your title can not be less than 3 characters1" })
    .max(255),
  description: z.string().min(1, { message: "You have to describe the bug." }),
});

const updateBugSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Your title can not be less than 3 characters1" })
    .max(255),
  description: z.string().min(1, { message: "You have to describe the bug." }),
});

const deleteBugSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Your title can not be less than 3 characters1" })
    .max(65353),
  description: z.string().min(1, { message: "You have to describe the bug." }),
});

const patchBugSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Your title can not be less than 3 characters1" })
    .max(255)
    .optional(),
  description: z
    .string()
    .min(1, { message: "You have to describe the bug." })
    .max(65535)
    .optional(),
  userId: z
    .string()
    .min(1, { message: "User ID is required." })
    .max(255)
    .optional()
    .nullable(),
});

export {
  createBugSchema,
  readBugSchema,
  editBugSchema,
  updateBugSchema,
  deleteBugSchema,
  patchBugSchema,
};
