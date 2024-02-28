"use client";
import axios, { AxiosResponse } from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface CartItem {
  id: number;
  name: string;
  image: string;
  quantity: number;
}

interface ApiResponse {
  id: number;
  name: string;
  image: string;
}

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedCartItems = localStorage.getItem("cart");
    if (storedCartItems) {
      const parsedCartItems: CartItem[] = JSON.parse(storedCartItems);
      Promise.all(
        parsedCartItems.map((item) =>
          axios.get<ApiResponse>(
            `http://localhost:8080/api/item/get/${item.id}`
          )
        )
      ).then((responses: AxiosResponse<ApiResponse>[]) => {
        const fullCartItems: CartItem[] = responses.map((response, index) => ({
          id: response.data.id,
          name: response.data.name,
          image: response.data.image,
          quantity: parsedCartItems[index].quantity,
        }));
        setCartItems(fullCartItems);
      });
    }
  }, []);

  const handleSubmitDeal = () => {
    // Submit order
  }

  return (
    <div className="flex flex-col px-32 py-4 w-full h-full">
      <h1>Checkout Page</h1>
      <ul className="items-center justify-start mb-4">
        {cartItems.map((item, index) => (
          <li key={index} className="mt-4">
            <Card className="flex flex-row max-w-[400px]">
              <CardHeader>
                <Image
                  alt={item.name}
                  src={item.image}
                  width={`100`}
                  height={`100`}
                  objectFit="cover"
                />
              </CardHeader>
              <CardContent className="py-4 items-center justify-center">
                <CardTitle>{item.name}</CardTitle>
                <CardDescription>{item.quantity}</CardDescription>
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>
      <Button variant="default" className="flex justify-end items-center mt-4 ml-auto">
        Submit Order
      </Button>
    </div>
  );
};

export default CheckoutPage;
