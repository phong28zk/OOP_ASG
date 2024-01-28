"use client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface Product {
  id: number;
  title: string;
  image: string;
  price: number;
  category: {
    id: number;
    name: string;
  };
}

interface ProductGridItemsProps {
  categoryName: string;
  params: { category: string }; // Add the params prop
}

export default function ProductGridItems({ params }: ProductGridItemsProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  console.log("params:", params);
  const categoryName = params.category === "all" ? "all" : params.category;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.escuelajs.co/api/v1/products"
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (categoryName === "all") {
      setFilteredProducts(products);
    } else {
      const filteredProducts = products.filter(
        (product) => product.category.name === categoryName
      );
      setFilteredProducts(filteredProducts);
    }
  }, [products, categoryName]);

  console.log(products);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
        {products.map((product) => (
          <div key={product.id}>
            <div className="flex flex-col items-center justify-center">
              {/* <div className="flex items-center justify-center">
                <Link href={`/product/${product.id}`}>
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={48}
                    height={48}
                  />
                </Link>
              </div>
              <div className="flex flex-col items-center justify-center">
                <Link href={`/product/${product.id}`}>{product.title}</Link>
                <div className="flex flex-col items-center justify-center">
                  <span className="text-lg font-semibold">
                    ${product.price}
                  </span>
                </div>
              </div> */}
              <div>{product.category.name}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
