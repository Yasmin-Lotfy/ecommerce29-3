import { productI } from "@/types/product.type";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import AddToCartBtn from "@/components/products/addToCartBtn";
import { getProducts } from "@/services/product.services";

export default async function Products() {
  
  const data = await getProducts();
  console.log(data);
  const products: productI[] = data.data;

 
 

  return (
    <>
      <main>
        <div className="container mx-auto pt-8">
          <div className="grid gap-6 grid-cols-3 md:grid-cols-6 lg:grid-cols-9 xl:grid-cols-12">
            {products.map((product) => (
              <React.Fragment key={product._id}>
                <div className="col-span-3">
                  <Card>
                    <Link href={`/products/${product._id}`}>
                      <Carousel>
                        <CarouselContent>
                          {product.images.map((img, index) => (
                            <React.Fragment key={index}>
                              <CarouselItem>
                                <Image
                                  src={img}
                                  width={1000}
                                  height={1000}
                                  className="w-full object-cover h-90"
                                  alt="product"
                                  loading="eager"
                                  fetchPriority="high"
                                />
                              </CarouselItem>
                            </React.Fragment>
                          ))}
                        </CarouselContent>
                      </Carousel>

                      <CardHeader>
                        <div className="card-brand text-gray-400 text-lg">
                          {product.brand.name}
                        </div>
                        <CardTitle className="text-xl  font-bold">
                          {" "}
                          {product.title}
                        </CardTitle>
                        <CardDescription className="card-brand text-gray-400 text-sm">
                          {" "}
                          {product.category.name}
                        </CardDescription>
                        <div className="flex gap-2">
                          <div className="flex gap-1 items-center">
                            {[0, 1, 2, 3, 4].map((star, index) => {
                              const filledStars =
                                index < Math.floor(product.ratingsAverage);

                              return (
                                <React.Fragment key={index}>
                                  <Star
                                    className={
                                      filledStars
                                        ? "text-yellow-500 fill-yellow-500"
                                        : "text-gray-500 fill-gray-500"
                                    }
                                  />
                                </React.Fragment>
                              );
                            })}
                          </div>
                          <div className="product-rating text-gray-400">
                            ( {product.ratingsAverage})
                          </div>
                        </div>
                      </CardHeader>
                    </Link>

                    <CardContent>
                      <p className="text-xl  font-bold">EGP: {product.price}</p>
                    </CardContent>
                    <CardFooter className="gap-2">
                    <AddToCartBtn prodId={product._id}/>
                      <Heart className="cursor-pointer" />
                    </CardFooter>
                  </Card>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
