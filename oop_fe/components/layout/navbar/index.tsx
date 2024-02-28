"use client";
import react, { useState, useContext } from "react";
import Link from "next/link";
import Search from "./search";

import { useRouter } from "next/navigation";
import { UserContext } from "@/components/context/user-provider";
import { useShoppingCart } from "@/components/context/cart-provider";
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
