import { defaultSort, sorting } from "@/lib/constants";
import axios from "axios";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import FilterList from "@/components/layout/search/filter";
import ProductGridItems from "@/components/layout/product-item";

export default async function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  
  return (
    <section>
      <div className="mx-auto flex max-w-screen-2xl flex-col gap-8 px-4 pb-4 text-black dark:text-white md:flex-row">
        <Separator orientation="vertical" />
        <div className="order-last min-h-screen w-full md:order-none">
          <ProductGridItems params={{ id: params.category }} />
        </div>
        <Separator orientation="vertical" />
        <div className="order-none flex-none md:order-last md:w-[125px]"></div>
      </div>
    </section>
  );
}