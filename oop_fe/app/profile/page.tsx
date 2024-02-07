"use client";
import { UserContext } from "@/components/context/user-provider";
import { User } from "lucide-react";
import React, { useContext } from "react";

const page = () => {
  const { user } = useContext(UserContext);
  return (
    <div>
      <p>Welcome to the page profile</p>
      <p>{user?.email}</p>
      <p>{user?.fullName}</p>
    </div>
  );
};

export default page;
