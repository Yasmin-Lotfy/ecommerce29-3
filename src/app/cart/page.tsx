"use client";
import { clearCart, getLoggedUserCart } from "@/actions/cart.action";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cartI, cartProductI } from "@/types/cart.type";
import { Trash2 } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import CartItem from "./cart-item";
import { Avatar } from "@/components/ui/avatar";
import { Spinner } from "@/components/ui/spinner";
import Link from "next/link";
import { CartContext } from "@/providers/cart-provider";
import { CartCheckout } from "@/components/cart/cart-checkout";

export default function Cart() {
  const { getCartData, totalCartPrice, noOfCartItems } =
    useContext(CartContext);

  const [products, setProducts] = useState<cartProductI[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingClear, setIsLoadingClear] = useState(false);

  async function getCartProducts() {
    try {
      setIsLoading(true);
      const response: cartI = await getLoggedUserCart();
      // console.log(response);
      setProducts(response.data.products);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getCartProducts();
  }, []);

  async function clearAllCart() {
    try {
      setIsLoadingClear(true);
      const response = await clearCart();
      console.log(response);
      setProducts(response.data.products);
      getCartData();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingClear(false);
    }
  }

  if (isLoading) {
    return (
      <div className="h-screen flex items-center flex-col  gap-4 justify-center">
        <div className="nav-logo">
          <div className="text-3xl font-bold flex items-center gap-2">
            <Avatar className="text-white rounded-lg bg-black flex items-center justify-center">
              S
            </Avatar>
            ShopMart
          </div>
        </div>

        <Spinner className="size-8" />
        <p>Loading ..................</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="h-screen flex items-center flex-col  gap-4 justify-center">
        <div className="nav-logo">
          <div className="text-3xl font-bold flex items-center gap-2">
            <Avatar className="text-white rounded-lg bg-black flex items-center justify-center">
              S
            </Avatar>
            ShopMart
          </div>
        </div>

        <p>Your Cart is Empty</p>
        <Link
          href="/products"
          className="inline-flex h-16 min-w-56 items-center justify-center rounded-2xl border-2 border-black bg-black px-10 text-xl font-bold text-white transition-colors hover:bg-white hover:text-black"
        >
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Clear Cart Button */}
      <div className="flex justify-end mt-6">
        <button
          onClick={() => clearAllCart()}
          className="flex cursor-pointer items-center gap-2 text-red-500 hover:underline border border-red-500 rounded-md px-4 py-2"
        >
          {isLoadingClear ? <Spinner /> : <Trash2 className="w-4 h-4 " />}

          <span>Clear Cart</span>
        </button>
      </div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-black mb-2">Shopping Cart</h1>
        <p className="text-gray-500 text-sm">
          {noOfCartItems} items in your cart
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Column - Cart Items */}
        <div className="flex-1 space-y-3">
          {products &&
            products.map((item) => (
              <CartItem setProducts={setProducts} key={item._id} item={item} />
            ))}
        </div>

        {/* Right Column - Order Summary */}
        <div className="lg:w-96">
          <Card className="p-6 shadow-md">
            <h2 className="font-bold text-black text-xl mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6">
              {/* Subtotal */}
              <div className="flex justify-between items-center">
                <span className="text-black">Subtotal :10 items</span>
                <span className="text-black">{totalCartPrice} EGP</span>
              </div>

              {/* Shipping */}
              <div className="flex justify-between items-center">
                <span className="text-black">Shipping</span>
                <span className="text-green-600">Free</span>
              </div>

              {/* Total */}
              <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                <span className="font-bold text-black">Total</span>
                <span className="font-bold text-black">
                  {totalCartPrice} EGP
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
            
              <CartCheckout/>
              <Button className="w-full bg-black text-white hover:bg-black/90 h-12 rounded-md">
                <Link href="/products">Continue Shopping</Link>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
