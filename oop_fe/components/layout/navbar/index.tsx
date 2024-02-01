import * as React from "react";
import Link from "next/link";
import Search from "./search";
import { ModeToggle } from "@/components/global/toggle-theme";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import ListItem from "@/components/global/list-item";
import { Button } from "@/components/ui/button";

import { FaRegUser } from "react-icons/fa";
import { RiShoppingCartLine } from "react-icons/ri";

const menu = [
  {
    title: "All",
    path: "/search",
  },
  {
    title: "Shirt",
    path: "/search/1",
  },
  {
    title: "Pants",
    path: "/search/2",
  },
  {
    title: "Accessories",
    path: "/search/3",
  },
];

export default async function Navbar() {
  return (
    <nav className="relative flex items-center justify-between p-4 lg:px-6">
      <div className="block flex-none md:hidden"></div>
      <div className="flex w-full items-center">
        <div className="flex w-full md:w-1/3">
          <Link
            href="/"
            className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6"
          >
            <div className="ml-2 flex-none text-sm font-medium uppercase md:hidden lg:block">
              Clothes Shop's Logo
            </div>
          </Link>
          {menu.length ? (
            <ul className="hidden gap-6 text-sm md:flex md:items-center">
              {menu.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.path}
                    className="text-neutral-500 underline-offset-4 hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-neutral-300"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <div className="hidden justify-center md:flex md:w-1/3">
          <Link
            href="/"
            className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6"
          >
            Clothes Shop
          </Link>
        </div>

        <div className="flex items-center justify-end md:w-1/3 gap-2">
          <Search />
          <ModeToggle />
          <Link href="/auth/login">
            <Button variant="outline" size="custom">
              <FaRegUser />
            </Button>
          </Link>
          <Button variant="outline" size="custom">
            <RiShoppingCartLine />
          </Button>
        </div>
      </div>
    </nav>
  );
}
