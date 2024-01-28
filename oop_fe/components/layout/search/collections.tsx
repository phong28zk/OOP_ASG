'use client'
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { Suspense } from "react";
import FilterList from "./filter";

interface Collection {
  title: string;
  path: string;
}

function CollectionList({ list }: { list: Collection[] }) {
  return <FilterList list={list} title="Collections" />;
}

export default function Collections() {
  const [collections, setCollections] = useState<Collection[]>([]);

  useEffect(() => {
    axios
      .get("https://api.escuelajs.co/api/v1/categories")
      .then((response) => {
        const data: any[] = response.data;
        const updatedCollections = [
          {
            title: "All",
            path: "/search",
          },
          ...data.map((category) => ({
            title: category.name,
            path: `/search/${category.name.toLowerCase()}`,
          })),
        ];
        setCollections(updatedCollections);
      })
      .catch((error) => {
        console.error("Error fetching collections:", error);
      });
  }, []);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CollectionList list={collections} />
    </Suspense>
  );
}
