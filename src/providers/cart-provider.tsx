"use client";
import { getLoggedUserCart } from "@/actions/cart.action";
import { cartI } from "@/types/cart.type";
import { useSession } from "next-auth/react";
import React, { createContext, useEffect, useState } from "react";

interface CartContextI {
  noOfCartItems: number;
  isLoading: boolean;
  getCartData: () => void;
  totalCartPrice: number;
  cartId:string
}

export const CartContext = createContext<CartContextI>({
  noOfCartItems: 0,
  isLoading: false,
  getCartData: () => {},
  totalCartPrice: 0,
  cartId:""
});

export default function CartContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const [noOfCartItems, setnoOfCartItems] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [cartId, setcartId] = useState("")

  console.log(status);

  async function getCartData() {
    try {
      setIsLoading(true);
      const response: cartI = await getLoggedUserCart();
      console.log(response);

      const totalItems = response.data.products.reduce(
        (acc, counter) => acc + counter.count,
        0,
      );

      setnoOfCartItems(totalItems);
      setTotalCartPrice(response.data.totalCartPrice);
      setcartId(response?.cartId)
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (status === "unauthenticated") return;
    if (status === "authenticated") {
      getCartData();
    }
  }, [status]);

  return (
    <>
      <CartContext.Provider
        value={{ noOfCartItems, isLoading, getCartData, totalCartPrice , cartId }}
      >
        {children}
      </CartContext.Provider>
    </>
  );
}
