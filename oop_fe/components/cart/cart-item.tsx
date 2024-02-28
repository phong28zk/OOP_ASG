import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useShoppingCart } from "../context/cart-provider";
import { Sheet } from "../ui/sheet";
import Image from "next/image";

type CartItemProps = {
  id: number;
  quantity: number;
};

type Item = {
  id: number;
  name: string;
  price: number;
  image: string;
};

export function CartItem({ id, quantity }: CartItemProps) {
  const { removeFromCart } = useShoppingCart();
  const [item, setItem] = useState<Item | null>(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/item/get/${id}`
        );
        setItem(response.data);
      } catch (error) {
        console.error("Error fetching item:", error);
      }
    };

    fetchItem();
  }, [id]);

  if (item == null) return null;

  return (
    <Sheet>
      <div className="flex flex-row justify-center items-center gap-4 py-2">
        <Image
          alt={item.name}
          src={item.image}
          width={`75`}
          height={`75`}
          objectFit="cover"
        />
        <div className="flex flex-row">
          <div className="">
            <div>
              {item.name}{" "}
              {quantity > 1 && (
                <span className="" style={{ fontSize: ".65rem" }}>
                  x{quantity}
                </span>
              )}
            </div>
            <div> {item.price * quantity}</div>
          </div>
        </div>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => removeFromCart(item.id)}
          className="ml-auto"
        >
          &times;
        </Button>
      </div>
    </Sheet>
  );
}
