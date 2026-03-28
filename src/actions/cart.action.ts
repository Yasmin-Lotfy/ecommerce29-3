"use server";

import { getUserToken } from "@/lib/auth";
import { ShippDataI } from "@/types/cart.type";

export async function addProductToCart(productId: string) {
  const token = await getUserToken();
  
  if (!token) {
    throw new Error("You are Not Authorized to do this Action ");
  }

  const response = await fetch(`https://ecommerce.routemisr.com/api/v2/cart`, {
    method: "POST",
    body: JSON.stringify({ productId }),
    headers: {
      token: token as string,
      "content-type": "application/json",
    },
  });

  const data = await response.json();
  return data;
}


export async function getLoggedUserCart() {
  const token = await getUserToken();
  if (!token) {
    throw new Error("un authorized");
  }

  const response = await fetch(`https://ecommerce.routemisr.com/api/v2/cart`, {
    method: "GET",
    headers: {
      token: token as string,
      "content-type": "application/json",
    },
  });

  const data = await response.json();
  return data;
}


export async function removeCartProduct(productId : string) {
  const token = await getUserToken();
  if (!token) {
    throw new Error("un authorized");
  }

  const response = await fetch(`https://ecommerce.routemisr.com/api/v2/cart/${productId}`, {
    method: "DELETE",
    headers: {
      token: token as string,
      "content-type": "application/json",
    },
  });

  const data = await response.json();
  return data;
}


export async function updateProduct(productId :string, count :number ) {
    console.log(productId , count , "ffffff");
    
  const token = await getUserToken();
  if (!token) {
    throw new Error("un authorized");
  }

  const response = await fetch(`https://ecommerce.routemisr.com/api/v2/cart/${productId}`, {
    method: "PUT",
      body: JSON.stringify({ count }),
    headers: {
      token: token as string,
      "content-type": "application/json",
    },
  });

  const data = await response.json();
  return data;
}



export async function clearCart( ) {

    
  const token = await getUserToken();
  if (!token) {
    throw new Error("un authorized");
  }

  const response = await fetch(`https://ecommerce.routemisr.com/api/v2/cart`, {
    method: "DELETE",
    
    headers: {
      token: token as string,
      "content-type": "application/json",
    },
  });

  const data = await response.json();
  return data;
}


export async function cashCheckout(cartData: ShippDataI, cartId: string) {
  console.log(cartData , cartId);
  
  const token = await getUserToken();
  
  if (!token) {
    throw new Error("You are Not Authorized to do this Action ");
  }

  const response = await fetch(`https://ecommerce.routemisr.com/api/v2/orders/${cartId}`, {
    method: "POST",
    body: JSON.stringify({ cartData }),
    headers: {
      token: token as string,
      "content-type": "application/json",
    },
  });

  const data = await response.json();
  return data;
}