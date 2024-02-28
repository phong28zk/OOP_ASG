"use client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  count: number;
  category: {
    id: number;
    name: string;
  };
}

interface ProductGridItemsProps {
  params: { id: string };
}

export default function ProductGridItems({ params }: ProductGridItemsProps) {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = "http://localhost:8080/api/item/get/all";
        if (params.id !== undefined) {
          url = `http://localhost:8080/api/item/get/all/${params.id}`;
        }
        const response = await axios.get(url);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [params.id]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
      {products.map((product) => (
        <HoverCard key={product.id}>
          <HoverCardTrigger>
            <Card className="w-[200px] h-[220px]">
              <CardHeader className="px-2 items-center justify-center">
                <Link href={`/product/${product.id}`}>
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={48}
                    height={48}
                  />
                </Link>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center inset-x-0 bottom-0">
                <Link href={`/product/${product.id}`}>{product.name}</Link>
                <span className="text-lg font-semibold">${product.price}</span>
              </CardContent>
            </Card>
          </HoverCardTrigger>
          <HoverCardContent>
            <div className="flex flex-row items-center justify-center">
              <Link href={`/product/${product.id}`}>
                <Image
                  src={product.image}
                  alt={product.name}
                  width={`48`}
                  height={`48`}
                />
              </Link>
              <div className="flex flex-col justify-start gap-1 px-2">
                <span>Product name: {product.name}</span>
                <span>Price: ${product.price}</span>
                <span>Product in stock: {product.count}</span>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      ))}
    </div>
  );
}
