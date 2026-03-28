import { removeCartProduct, updateProduct } from "@/actions/cart.action";
import { Card } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { CartContext } from "@/providers/cart-provider";
import { cartProductI } from "@/types/cart.type";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "sonner";

export default function CartItem({
  item,
  setProducts,
}: {
  item: cartProductI;
  setProducts: (products: cartProductI[]) => void;
}) {

  const {getCartData} = useContext(CartContext)
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingUpdateInc, setIsLoadingUpdateInc] = useState(false);
  const [isLoadingUpdateDec, setIsLoadingUpdateDec] = useState(false);

  const [productCount, setProductCount] = useState(0);

  useEffect(() => {
    setProductCount(item.count);
  }, [item]);

  // console.log(item);

  async function removeProduuctFromCart(productId: string) {
    try {
      setIsLoading(true);
      const response = await removeCartProduct(productId);
      // console.log(response);
      toast.success(response.message);
      setProducts(response.data.products);
      getCartData()
    } catch (error) {
      console.log(error);
      toast.success((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  }

  async function updateCartProduct(productId: string, count: number) {
    try {
      // condiytion
      if(count > productCount){
        setIsLoadingUpdateInc(true)
      }else{
        setIsLoadingUpdateDec(true)
      }

      const response = await updateProduct(productId, count);

      // console.log(response);
      toast.success(response.message);
      setProducts(response.data.products);
      getCartData()
    } catch (error) {
      console.log(error);
      toast.success((error as Error).message);
    } finally {
      setIsLoadingUpdateDec(false);
      setIsLoadingUpdateInc(false);
    }
  }
  return (
    <>
      <Card className="p-6 shadow-md">
        <div className="flex gap-6">
          {/* Product Image */}
          <div className="w-24 h-24 bg-gray-200 rounded shrink-0 relative overflow-hidden">
            <Image
              src={item.product.imageCover}
              alt="Product"
              fill
              className="object-cover rounded"
              sizes="200"
            />
          </div>

          {/* Product Details */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-black text-lg mb-1">
                {item.product.title}
              </h3>
              <p className="text-gray-500 text-sm mb-4">
                {item.product.brand.name} {item.product.category.name}
              </p>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-gray-300 rounded">
                <button
                  disabled={isLoadingUpdateDec}
                  onClick={() =>
                    updateCartProduct(item.product._id, productCount - 1)
                  }
                  className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-l"
                >
                  {isLoadingUpdateDec ? <Spinner /> : "-"}
                </button>
                <span className="px-4 py-1 border-x border-gray-300">
                  {productCount}
                </span>
                <button
                  disabled={isLoadingUpdateInc}
                  onClick={() =>
                    updateCartProduct(item.product._id, productCount + 1)
                  }
                  className="px-3 py-1  disabled:cursor-not-allowed text-gray-600 hover:bg-gray-100 rounded-r"
                >
                  {isLoadingUpdateInc ? <Spinner /> : "+"}
                </button>
              </div>
            </div>
          </div>

          {/* Price and Remove */}
          <div className="flex flex-col items-end justify-between">
            <div className="font-bold text-black flex flex-col items-end  text-lg mb-2">
              <p className="text-gray-500 text-sm">Price {item.price} /Item EGP</p>
              <p className="lg">Total {item.price * productCount }  EGP</p>
            </div>
            <button
              disabled={isLoading}
              onClick={() => removeProduuctFromCart(item.product._id)}
              className="text-red-500 disabled:cursor-not-allowed text-sm hover:underline border cursor-pointer border-red-500 rounded-md px-4 py-2"
            >
              {isLoading ? <Spinner /> : "Remove"}
            </button>
          </div>
        </div>
      </Card>
    </>
  );
}
