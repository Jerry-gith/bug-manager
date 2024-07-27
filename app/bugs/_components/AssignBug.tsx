"use client";

import { Bug, User } from "@prisma/client";
import { Select, Skeleton } from "@radix-ui/themes";
import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const AssignBugToAUser = ({ bug }: { bug: Bug }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get<User[]>("/api/users");
        setUsers(data);
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        setError("Couldn't fetch users.");
      }
    };
    fetchUsers();
  }, []);

  const handleValueChange = async (userId: string) => {
    try {
      await axios.patch(`/api/bugs/${bug.id}`, {
        userId: userId === "null" ? null : userId,
      });
    } catch (error) {
      console.error("Failed to update the bug assignment:", error);
      toast.error("Failed to assign the bug to the user.");
    }
  }; 

  if (loading) {
    return (
      <Select.Root>
        <Select.Trigger placeholder="Loading users..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Bug Managers</Select.Label>
            <Select.Item value="null">
              <Skeleton />
            </Select.Item>
          </Select.Group>
        </Select.Content>
      </Select.Root>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <Select.Root
        defaultValue={bug.userId || "null"}
        onValueChange={handleValueChange}
      >
        <Select.Trigger placeholder="Assign bug..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Bug Managers</Select.Label>
            <Select.Item value={"null"}>Unassigned</Select.Item>
            {users.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>

      <Toaster />
    </>
  );
};

export default AssignBugToAUser;
