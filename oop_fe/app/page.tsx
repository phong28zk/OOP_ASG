"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import axios from "axios";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoadingPage } from "@/components/global/loading";

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  category: {
    id: number;
    name: string;
  };
}

const fetchProducts = async () => {
  try {
    const response = await axios.get(
      "http://localhost:8080/api/item/get/all"
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchProducts();
      setProducts(data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  if(isLoading) {
    return <LoadingPage/>;
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <main className="flex flex-col items-center justify-center flex-1 px-20 text-center">
          <div
            className="
          grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 
          gap-4 w-full
          "
          >
            {products.map((product) => (
              <Card key={product.id}>
                <CardContent className="flex items-center justify-center">
                  <Link href={`/product/${product.id}`}>
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={200}
                      height={200}
                      className="w-[150px] h-[150px]"
                    />
                  </Link>
                </CardContent>
                <CardFooter className="flex flex-col mt-auto">
                  <CardTitle className="text-[12px]">{product.price}$</CardTitle>
                  <CardTitle className="text-[12px]">{product.name}</CardTitle>
                  <CardTitle className="text-[12px]">{product.id}</CardTitle>
                </CardFooter>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </>
  );
}
