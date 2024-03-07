"use client";
import react, { useState, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserContext } from "@/components/context/user-provider";
import { useShoppingCart } from "@/components/context/cart-provider";
import dynamic from 'next/dynamic';
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

import Search from "./search";
import ListItem from "@/components/global/list-item";
const ListItemWithNoSSR = dynamic(
  () => import("@/components/global/list-item"),
  { ssr: false }
);

import { Button } from "@/components/ui/button";
import { FaRegUser } from "react-icons/fa";
import { RiShoppingCartLine } from "react-icons/ri";
import { IoLogOutOutline } from "react-icons/io5";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ModeToggle } from "@/components/global/toggle-theme";
import { CartItem } from "@/components/cart/cart-item";

const menu: { title: string; href: string; description: string }[] = [
  {
    title: "Category 1",
    href: "/search/1",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Category 2",
    href: "/search/2",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Category 3",
    href: "/search/3",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Category 4",
    href: "/search/4",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Category 5",
    href: "/search/5",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Category 6",
    href: "/search/6",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Category 7",
    href: "/search/7",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Category 8",
    href: "/search/8",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Category 9",
    href: "/search/9",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Accessories",
    href: "/search/10",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
];

export default function Navbar() {
  const router = useRouter();
  const [showCart, setShowCart] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const { openCart, cartQuantity } = useShoppingCart();
  const { cartItems } = useShoppingCart();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    router.push("/auth/login");
  };

  const handleCart = () => {
    openCart();
    setShowCart(true);
  };

  const submitCartHandler = () => {
    setShowCart(false);
    localStorage.setItem("cart", JSON.stringify(cartItems));
    cartItems.length !== 0 && router.push("/checkout");
    console.log("cartItems: ", cartItems);
  };

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
              Logo
            </div>
          </Link>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Shirt</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid grid-rows-3 gap-3 p-6 w-[250px]">
                    {menu.slice(0, 3).map((item, index) => (
                      <ListItem
                        key={index}
                        title={item.title}
                        href={item.href}
                      />
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Pants</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid grid-rows-3 gap-3 p-6 w-[250px]">
                    {menu.slice(3, 6).map((item, index) => (
                      <ListItemWithNoSSR
                        key={index}
                        title={item.title}
                        href={item.href}
                      />
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Shoes</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid grid-rows-3 gap-3 p-6 w-[250px]">
                    {menu.slice(6, 9).map((item, index) => (
                      <ListItemWithNoSSR
                        key={index}
                        title={item.title}
                        href={item.href}
                      />
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/search/10" legacyBehavior passHref>
                  <NavigationMenuLink>
                    {menu.slice(9, 10).map((item, index) => (
                      <ListItemWithNoSSR
                        key={index}
                        title={item.title}
                        href={item.href}
                      />
                    ))}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="hidden justify-center md:flex md:w-1/3">
          <Link
            href="/"
            className="md:hidden mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6"
          >
            Clothes Shop
          </Link>
        </div>

        {user ? (
          <div className="flex items-center justify-end md:w-1/3 gap-2">
            <Search />
            <ModeToggle />
            <Link href="/profile">
              <Button variant="outline" size="custom">
                <FaRegUser />
              </Button>
            </Link>
            <Button variant="outline" size="custom" onClick={handleLogout}>
              <IoLogOutOutline />
            </Button>

            <Sheet>
              <SheetTrigger asChild>
                <Button onClick={handleCart} variant="outline" size="custom">
                  <RiShoppingCartLine />
                  {cartQuantity}
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetDescription>
                  {cartItems.length ? (
                    <ul className="divide-y divide-neutral-100 dark:divide-neutral-800 m-4">
                      <div>User: {user ? user.fullName : "Guest"}</div>
                      {cartItems.map((item) => (
                        <CartItem key={item.id} {...item} />
                      ))}
                    </ul>
                  ) : (
                    <div className="flex items-center justify-center h-64">
                      <p className="text-lg font-medium text-neutral-500 dark:text-neutral-400">
                        Your cart is empty
                      </p>
                    </div>
                  )}
                </SheetDescription>
                <SheetFooter className="fixed bottom-0 left-0 w-full p-4">
                  <SheetClose asChild>
                    <Button
                      type="submit"
                      className="w-[80px]"
                      onClick={() => {
                        submitCartHandler();
                      }}
                    >
                      Submit
                    </Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        ) : (
          <div className="flex items-center justify-end md:w-1/3 gap-2">
            <Search />
            <ModeToggle />
            <Link href="/auth/login">
              <Button variant="outline" size="custom">
                <FaRegUser />
              </Button>
            </Link>
            <Button onClick={openCart} variant="outline" size="custom">
              <RiShoppingCartLine />
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}

