"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const sampleProducts = [
  {
    id: 1,
    name: "Funny Mug",
    description: "A mug with a hilarious print.",
    price: "12.99",
    image:
      "https://media.istockphoto.com/id/482949611/photo/blank-white-t-shirt-front-with-clipping-path.jpg?s=612x612&w=0&k=20&c=NgWd6xDb3GuNoooQDCMGO9yrIiFv-w5fVkd2_IwUMsA=",
    discount: "10",
  },
  {
    id: 2,
    name: "Silly Socks",
    description: "Colorful socks that make you smile.",
    price: "8.99",
    image:
      "https://pangaia.com/cdn/shop/files/DNA_Oversized_T-Shirt_-Summit_Blue-1.png?crop=center&height=1999&v=1755260238&width=1500",
    discount: "10",
  },
  {
    id: 3,
    name: "Prank Toy",
    description: "A toy that surprises your friends.",
    price: "15.49",
    image:
      "https://tmlewin.co.uk/cdn/shop/files/Crewneck_Tshirt_Black_67937_FLF.jpg?v=1727366656",
    discount: "10",
  },
  {
    id: 4,
    name: "Funny T-Shirt",
    description: "A t-shirt with a witty quote.",
    price: "19.99",
    image: "https://assets.tpop.com/tpop/gallery/ns332-native-spirit_large.jpg",
    discount: "10",
  },
  {
    id: 4,
    name: "Funny T-Shirt",
    description: "A t-shirt with a witty quote.",
    price: "19.99",
    image: "https://assets.tpop.com/tpop/gallery/ns332-native-spirit_large.jpg",
    discount: "10",
  },
  {
    id: 4,
    name: "Funny T-Shirt",
    description: "A t-shirt with a witty quote.",
    price: "19.99",
    image: "https://assets.tpop.com/tpop/gallery/ns332-native-spirit_large.jpg",
    discount: "10",
  },
  {
    id: 4,
    name: "Funny T-Shirt",
    description: "A t-shirt with a witty quote.",
    price: "19.99",
    image: "https://assets.tpop.com/tpop/gallery/ns332-native-spirit_large.jpg",
    discount: "10",
  },
  {
    id: 4,
    name: "Funny T-Shirt",
    description: "A t-shirt with a witty quote.",
    price: "19.99",
    image: "https://assets.tpop.com/tpop/gallery/ns332-native-spirit_large.jpg",
    discount: "10",
  },
  {
    id: 4,
    name: "Funny T-Shirt",
    description: "A t-shirt with a witty quote.",
    price: "19.99",
    image: "https://assets.tpop.com/tpop/gallery/ns332-native-spirit_large.jpg",
    discount: "10",
  },
  {
    id: 4,
    name: "Funny T-Shirt",
    description: "A t-shirt with a witty quote.",
    price: "19.99",
    image: "https://assets.tpop.com/tpop/gallery/ns332-native-spirit_large.jpg",
    discount: "10",
  },
  {
    id: 4,
    name: "Funny T-Shirt",
    description: "A t-shirt with a witty quote.",
    price: "19.99",
    image: "https://assets.tpop.com/tpop/gallery/ns332-native-spirit_large.jpg",
    discount: "10",
  },
  {
    id: 4,
    name: "Funny T-Shirt",
    description: "A t-shirt with a witty quote.",
    price: "19.99",
    image: "https://assets.tpop.com/tpop/gallery/ns332-native-spirit_large.jpg",
    discount: "10",
  },
];

function Products() {
  return (
    <div className="min-h-screen bg-gray-50 mt-10 py-12 px-1 lg:px-8">
      <h1 className="text-4xl font-bold text-center text-blue-900 mb-6">
        Featured Products
      </h1>
      <p className="text-lg text-center text-gray-700 mb-12">
        Check out our latest fun products!
      </p>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {sampleProducts.map((product) => (
          <Card key={product.id} className="bg-white shadow-md">
            <CardHeader className="text-center">
              <CardTitle>{product.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-80 object-cover rounded-md mb-4"
              />
              <CardDescription>{product.description}</CardDescription>
              <p className="mt-2 font-bold text-lg">${product.price}</p>
              <p className="mt-2 font-bold text-lg">
                After Dis{product.discount}%: $
                {(
                  product.price -
                  (product.price * product.discount) / 100
                ).toFixed(2)}
              </p>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-amber-400 hover:bg-green-500">
                Buy Now
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Products;
