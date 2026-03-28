import { productI } from "@/types/product.type";
import React from "react";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
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
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { getProducts } from "@/services/product.services";
import AddToCartBtn from "@/components/products/addToCartBtn";
export default async function ProductDetails({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  // console.log(productId);

  const response = await fetch(`${process.env.BASE_URL}/products/${productId}`);
  const data = await response.json();

  const product: productI = data.data;
  console.log(product, "product");

  const related = await getProducts(product.category._id);
  const relatedProducts: productI[] = related.data;
  console.log(relatedProducts, "relatedProducts");

  // check if product is found
  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <>
      <main>
        <div className="max-w-5xl mx-auto py-10">
          <Breadcrumb className="pt-5">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link className="text-lg font-semibold" href="/">
                    Home
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link className="text-lg font-semibold" href="/products">
                    Products
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-xl font-bold">
                  {product.title}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* cart */}
          <Card className="grid grid-cols-3 mt-10">
            <div className="col-span-1">
              <Carousel>
                <CarouselContent>
                    { product.images.map((img, index)=> <React.Fragment key={index}>
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
                    </React.Fragment>)}
              
                </CarouselContent>
              </Carousel>
            </div>
            <div className="col-span-2">
              <div className="flex flex-col justify-center items-center">
                <CardHeader className="w-full space-y-3">
                  <div className="card-brand text-gray-400 text-lg">
                    {product.brand.name}
                  </div>
                  <CardTitle className="text-xl  font-bold">
                    {" "}
                    {product.title}
                  </CardTitle>
                  <div className="card-desc text-lg ">
                    {product.description}
                  </div>
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
              </div>

              <CardContent>
                <p className="text-xl  font-bold mt-4">EGP: {product.price}</p>
              </CardContent>
              <CardFooter className="gap-2  items-center">
                <Button className="grow cursor-pointer mt-4">
                  <ShoppingCart />
                  Add To Cart
                </Button>
                <Heart className="cursor-pointer" />
              </CardFooter>
            </div>
          </Card>
        </div>
      </main>
      <main>
       
        <div className="max-w-5xl mx-auto pt-8">
        <h2 className="text-2xl font-bold mb-6">Related Products</h2>
        <div className="grid gap-6 grid-cols-3 md:grid-cols-6 lg:grid-cols-9 xl:grid-cols-12">
        {relatedProducts.map((product) => (
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
