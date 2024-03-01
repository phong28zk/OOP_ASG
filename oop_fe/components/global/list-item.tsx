'use client'
import { cn } from "@/lib/utils";
import { NavigationMenuLink } from "../ui/navigation-menu";
import React from "react";

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <NavigationMenuLink asChild>
      <a
        ref={ref}
        {...props}
        className={cn("group block select-none space-y-1 font-medium leading-none")}
      >
        <span className="text-current text-sm font-medium leading-none">
          {title}
        </span>
        <p className="group-hover:text-white/70 line-clamp-2 text-sm leading-snug text-white/40">
          {children}
        </p>
      </a>
    </NavigationMenuLink>
  );
});

ListItem.displayName = "ListItem";

export default ListItem;