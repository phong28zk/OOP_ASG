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
  count: number;
  category: {
    id: number;
    name: string;
  };
}

const Product = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [localQuantity, setLocalQuantity] = useState(0);
  const router = useRouter();
  const {
    getItemQuantity,
    increaseCartQuantity,
    increaseCartManyQuantities,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();
  const quantity = getItemQuantity(Number(id));

  const handleIncreaseLocalQuantity = () => {
    setLocalQuantity(localQuantity + 1);
  }

  const handleDecreaseLocalQuantity = () => {
    if(localQuantity > 0) {
      setLocalQuantity(localQuantity - 1);
    }
  }

  const handleSubmitCart = () => {
    increaseCartManyQuantities(Number(id), localQuantity);
    setLocalQuantity(0);
  }

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
          <CardHeader className="flex flex-row gap-4">
            <Button
              variant="default"
              onClick={() => {
                router.push("/");
              }}
            >
              {`<-`}
            </Button>
            <CardTitle>{product.name}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-row justify-start">
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
            <CardContent className="">
              <CardContent>
                <p className="text-[20px] border-spacing-1">{product.name}</p>
                <p className="text-[20px] border-spacing-1">{product.price}$</p>
                <p className="text-[20px] border-spacing-1">
                  Product in stock: {product.count}
                </p>
              </CardContent>
              {localQuantity === 0 ? (
                <CardContent className="flex items-center justify-start">
                  <Button
                    variant="default"
                    onClick={() => handleIncreaseLocalQuantity()}
                  >
                    Add To Cart
                  </Button>
                </CardContent>
              ) : (
                <div className="flex flex-col justify-start">
                  <CardContent className="flex justify-start">
                    <Button
                      variant="default"
                      onClick={() => handleIncreaseLocalQuantity()}
                    >
                      +
                    </Button>
                    <Label className="m-4">{localQuantity}</Label>
                    <Button
                      variant="default"
                      onClick={() => handleDecreaseLocalQuantity()}
                    >
                      -
                    </Button>
                  </CardContent>
                  <CardContent>
                    <Button
                      variant="default"
                      onClick={() => handleSubmitCart()}
                    >
                      Submit
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
            </CardContent>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Product;
