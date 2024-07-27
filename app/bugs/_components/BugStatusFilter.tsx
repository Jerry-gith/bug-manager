"use client";

import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import {
  ReadonlyURLSearchParams,
  useRouter,
  useSearchParams,
} from "next/navigation";

const statuses: { label: string; value?: Status }[] = [
  { label: "All" },
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];

const BugStatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (
    status: Status,
    searchParams: ReadonlyURLSearchParams,
    router: AppRouterInstance
  ) => {
    const params = new URLSearchParams();
    if (status) params.append("status", status);
    if (searchParams.get("orderBy"))
      params.append("orderBy", searchParams.get("orderBy")!);
    const query = params.size ? "?" + params.toString() : "";
    router.push(`/bugs${query}`);
  };

  return (
    <Select.Root
      defaultValue={searchParams.get("status") || "All"}
      onValueChange={(status: Status) =>
        handleChange(status, searchParams, router)
      }
    >
      <Select.Trigger placeholder="Filter by status..." />
      <Select.Content>
        {statuses.map((status) => (
          <Select.Item key={status.value} value={status.value ?? "All"}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default BugStatusFilter;
