"use client";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useShoppingCart } from "@/components/context/cart-provider";

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

const Product = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();
  const quantity = getItemQuantity(Number(id));
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/item/get/${id}`
        );
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  return (
    <div className="flex items-center justify-center">
      {product && (
        <Card className="w-[800px] m-4 items-center justify-center">
          <CardHeader>
            <CardTitle>{product.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center">
              <Image
                src={product.image}
                alt={product.name}
                width={200}
                height={200}
              />
            </div>
          </CardContent>
          <CardContent>
            <p className="text-[20px] border-spacing-1">{product.price}$</p>
          </CardContent>
          {quantity === 0 ? (
            <CardContent className="flex items-center justify-center">
              <Button
                variant="default"
                onClick={() => increaseCartQuantity(Number(id))}
              >
                Add To Cart
              </Button>
            </CardContent>
          ) : (
            <div className="flex flex-col justify-center items-center">
              <CardContent className="flex items-center justify-center">
                <Button
                  variant="default"
                  onClick={() => increaseCartQuantity(Number(id))}
                >
                  +
                </Button>
                <Label className="m-4">{quantity}</Label>
                <Button
                  variant="default"
                  onClick={() => decreaseCartQuantity(Number(id))}
                >
                  -
                </Button>
              </CardContent>
              <CardContent>
                <Button
                  variant="default"
                  onClick={() => removeFromCart(Number(id))}
                >
                  Remove
                </Button>
              </CardContent>
            </div>
          )}
        </Card>
      )}
    </div>
  );
};

export default Product;
