"use client";

import Link from "next/link";
import classname from "classnames";
import { FaBug } from "react-icons/fa6";
import { usePathname } from "next/navigation";
import { Box, Container } from "@radix-ui/themes";
import { useSession } from "next-auth/react";

const NavBar = () => {
  const currentPath = usePathname();
  const { status, data: session } = useSession();

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Bugs", href: "/bugs" },
  ];

  return (
    <Container className="border-b">
      <nav className="flex space-x-6 h-16 items-center px-5 md:px-10">
        <Link href={"/"} className="text-[#DC143C]">
          <FaBug />
        </Link>

        <ul className="flex space-x-6">
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

        <Box>
          {status === "authenticated" && (
            <Link href={"/api/auth/signout"}>Sign Out</Link>
          )}
          {status === "unauthenticated" && (
            <Link href={"/api/auth/signin"}>Sign In</Link>
          )}
        </Box>
      </nav>
    </Container>
  );
};

export default NavBar;
