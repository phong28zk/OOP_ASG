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

export default function HomePage() {
  const [photos, setPhotos] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts"
        );
        setPhotos(response.data);
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
            {photos.map((photo) => (
              <Card key={photo.id}>
                <CardContent
                  className="flex items-center justify-center"
                >
                  <Image
                    src={photo.url}
                    alt={photo.title}
                    width={300}
                    height={300}
                    className="mt-8"
                  />
                </CardContent>
                <CardFooter className="flex flex-col">
                  <CardTitle className="text-[12px]">{photo.title}</CardTitle>
                  <CardTitle className="text-[12px]">{photo.albumId}</CardTitle>
                  <CardTitle className="text-[12px]">{photo.id}</CardTitle>
                </CardFooter>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </>
  );
}
