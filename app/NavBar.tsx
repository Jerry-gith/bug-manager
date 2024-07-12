'use client'

import Link from "next/link";
import classname from "classnames"
import { FaBug } from "react-icons/fa6";
import { usePathname } from "next/navigation";

const NavBar = () => {

    const currentPath = usePathname()
    console.log(currentPath)

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Bugs", href: "/bugs" },
  ];

  return (
    <nav className="flex space-x-6 h-16 border-b mb-20 items-center px-5">
      <Link href={"/"}><FaBug /></Link>

      <ul  className="flex space-x-6">
        {links.map((link) => (
          <Link  className={classname({
            "text-gray-500": link.href !== currentPath,
            "text-gray-900": link.href === currentPath,
            "hover:text-gray-800 transition-colors": true
          })} key={link.href} href={link.href}>
            {link.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
