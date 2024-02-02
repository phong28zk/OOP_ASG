"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

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

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/item/get/all"
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

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
                    />
                  </Link>
                </CardContent>
                <CardFooter className="flex flex-col">
                  <CardTitle className="text-[12px]">{product.price}</CardTitle>
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
