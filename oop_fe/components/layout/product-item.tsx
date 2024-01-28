'use client'
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function ProductGridItems(
    // { products }: { products: Product[] }
) {
    const [products, setProducts] = useState<any[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    'https://fakestoreapi.com/products'
                );
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, []);

  return (
    <>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
            {products.map((product) => (
            <div key={product.id}>
                <div className="flex flex-col items-center justify-center">
                <div className="flex items-center justify-center">
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
                    <Link href={`/product/${product.id}`}>
                        {product.title}
                    </Link>
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
    </>
  );
}
