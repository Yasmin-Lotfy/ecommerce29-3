"use client";
import React, { useContext, useState } from "react";
import { Button } from "../ui/button";
import { ShoppingCart } from "lucide-react";
import { addProductToCart } from "@/actions/cart.action";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";
import { CartContext } from "@/providers/cart-provider";
import { redirect } from "next/navigation";

export default function AddToCartBtn({ prodId }: { prodId: string }) {

  const {getCartData} = useContext(CartContext)
  const [isLoading, setIsLoading] = useState(false);

  async function addTocart(productId: string) {
    try {
      setIsLoading(true);
      const response = await addProductToCart(productId);
      console.log(response);
      toast.success(response.message);
      getCartData()
    } catch (error) {
      console.log(error);
      //  throw error 
      toast.error((error as Error).message);
      //   redirct 
      redirect("/login")
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <>
      <Button 
      disabled={isLoading}
      onClick={() => addTocart(prodId)} className="grow cursor-pointer">
        {isLoading? <Spinner/> :     <ShoppingCart />}
    
        Add To Cart
      </Button>
    </>
  );
}
