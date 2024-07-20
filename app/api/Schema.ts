import { z } from "zod"

const createBugSchema = z.object({
    title: z.string().min(3, {message: "Your title can not be less than 3 characters1"}).max(255),
    description: z.string().min(1, {message: "You have to describe the bug."})
})

const readBugSchema = z.object({
    title: z.string().min(3, {message: "Your title can not be less than 3 characters1"}).max(255),
    description: z.string().min(1, {message: "You have to describe the bug."})
})

const editBugSchema = z.object({
    title: z.string().min(3, {message: "Your title can not be less than 3 characters1"}).max(255),
    description: z.string().min(1, {message: "You have to describe the bug."})
})

const updateBugSchema = z.object({
    title: z.string().min(3, {message: "Your title can not be less than 3 characters1"}).max(255),
    description: z.string().min(1, {message: "You have to describe the bug."})
})

const deleteBugSchema = z.object({
    title: z.string().min(3, {message: "Your title can not be less than 3 characters1"}).max(255),
    description: z.string().min(1, {message: "You have to describe the bug."})
})

export {createBugSchema, readBugSchema, editBugSchema, updateBugSchema, deleteBugSchema}