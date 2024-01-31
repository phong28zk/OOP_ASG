'use client'
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

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

interface ProductGridItemsProps {
  params: { id: string };
}

export default function ProductGridItems({ params }: ProductGridItemsProps) {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/item/get/all/${params.id}`
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [params.id]);

  console.log(products);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
      {products.map((product) => (
        <div key={product.id}>
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center justify-center">
              <Link href={`/product/${product.id}`}>
                <Image
                  src={product.image}
                  alt={product.name}
                  width={48}
                  height={48}
                />
              </Link>
            </div>
            <div className="flex flex-col items-center justify-center">
              <Link href={`/product/${product.id}`}>{product.name}</Link>
              <div className="flex flex-col items-center justify-center">
                <span className="text-lg font-semibold">
                  ${product.price}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}