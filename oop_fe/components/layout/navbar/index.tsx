import * as React from "react";
import Link from "next/link";
import { Suspense } from "react";
import Search from "./search";
import OpenCart from "@/components/cart/open-cart";
import { ModeToggle } from "@/components/global/toggle-theme";


const menu = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "About",
    path: "/about",
  },
  {
    title: "Contact",
    path: "/contact",
  },
];

export default async function Navbar() {

  return (
    <nav className="relative flex items-center justify-between p-4 lg:px-6">
      <div className="block flex-none md:hidden">
        <Link href="/" className="flex items-center justify-center">
          <div className="flex-none text-sm font-medium uppercase">
            <span className="">Home</span>
          </div>
        </Link>
      </div>
      <div className="flex w-full items-center">
        <div className="flex w-full md:w-1/3">
          <Link
            href="/"
            className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6"
          >
            <div className="ml-2 flex-none text-sm font-medium uppercase md:hidden lg:block">
              Clothes Shop
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
          <Search />
        </div>

        <div className="flex items-center justify-end md:w-1/3 gap-4">
          <ModeToggle />
          <span>Cart</span>
        </div>
      </div>
    </nav>
  );
}
