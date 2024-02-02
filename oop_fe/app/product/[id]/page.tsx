"use client";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

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

  console.log(product);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
      {product && (
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
                <span className="text-lg font-semibold">${product.price}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
