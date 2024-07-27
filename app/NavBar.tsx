"use client";

import Link from "next/link";
import classname from "classnames";
import { FaBug } from "react-icons/fa6";
import { usePathname } from "next/navigation";
import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import Skeleton from "@/components/Skeleton";

const NavBar = () => {
  const currentPath = usePathname();
  const { status, data: session } = useSession();

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Bugs", href: "/bugs" },
  ];

  return (
    <Container className="border-b">
      <nav className="py-4 items-center px-5 md:px-10">
        <Flex justify="between">
          <Flex align="center" gap="3">
            <Link href={"/"} className="text-[#DC143C]">
              <FaBug />
            </Link>

            <ul className="flex space-x-4">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    className={classname({
                      "text-gray-500": link.href !== currentPath,
                      "text-gray-900": link.href === currentPath,
                      "hover:text-gray-800 transition-colors": true,
                    })}
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Flex>

          <Box>
            {status === "loading" && <Skeleton width={"5rem"} />}
            {status === "authenticated" && (
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <Avatar
                    src={session.user!.image!}
                    fallback="?"
                    size="2"
                    radius="full"
                    className="cursor-pointer"
                  />
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                  <DropdownMenu.Label>
                    <Text size="2">{session.user!.email}</Text>
                  </DropdownMenu.Label>
                  <DropdownMenu.Item>
                    <Link href={"/api/auth/signout"}>Sign Out</Link>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            )}
            {status === "unauthenticated" && (
              <Link className="text-gray-500 hover:text-gray-900" href={"/api/auth/signin"}>Sign In</Link>
            )}
          </Box>
        </Flex>
      </nav>
    </Container>
  );
};

export default NavBar;
