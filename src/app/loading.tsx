import { Avatar } from "@/components/ui/avatar";
import { Spinner } from "@/components/ui/spinner";
import React from "react";

export default function Loading() {
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
    </div>
  );
}
