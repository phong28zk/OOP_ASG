import Link from 'next/link';
import { Suspense } from 'react';
import FilterList from './filter';

const collections = [
    {
        title: "All",
        path: "/search",
    },
    {
        title: "Shirt",
        path: "/search/shirt",
    },
    {
        title: "Pants",
        path: "/search/pants",
    },
    {
        title: "Accessories",
        path: "/search/accessories",
    },
];

function CollectionList() {
    return <FilterList list={collections} title="Collections" />;
}

export default function Collections() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <CollectionList />
        </Suspense>
    )
}