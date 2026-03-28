"use client";
import Link from "next/link";
import { Avatar } from "@/components/ui/avatar";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ShoppingCart, UserRound } from "lucide-react";
import { Badge } from "../ui/badge";
import { signOut, useSession } from "next-auth/react";
import { useContext } from "react";
import { CartContext } from "@/providers/cart-provider";
import { Spinner } from "../ui/spinner";
export default function Navbar() {
  const { data: session, status } = useSession();

  const { noOfCartItems, isLoading } = useContext(CartContext);

  // console.log(session);

  function handleLogOut() {
    signOut({
      callbackUrl: "/login",
    });
  }

  return (
    <>
      <nav className="bg-gray-100  fixed top-0 w-full p-5 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <div className="nav-logo">
            <Link
              className="text-3xl font-bold flex items-center gap-2"
              href="/"
            >
              <Avatar className="text-white rounded-lg bg-black flex items-center justify-center">
                S
              </Avatar>
              ShopMart
            </Link>
          </div>
          <div className="nav-links">
            <NavigationMenu>
              <NavigationMenuItem className="list-none flex gap-3 items-center">
                <NavigationMenuLink
                  className="text-black text-lg bg-transparent hover:text-white hover:bg-black transition-all duration-300"
                  asChild
                >
                  <Link href="/">Home</Link>
                </NavigationMenuLink>
                <NavigationMenuLink
                  className="text-black text-lg bg-transparent hover:text-white hover:bg-black transition-all duration-300"
                  asChild
                >
                  <Link href="/products">Products</Link>
                </NavigationMenuLink>

                <NavigationMenuLink
                  className="text-black text-lg bg-transparent hover:text-white hover:bg-black transition-all duration-300"
                  asChild
                >
                  <Link href="/categories">Categories</Link>
                </NavigationMenuLink>

                <NavigationMenuLink
                  className="text-black text-lg bg-transparent hover:text-white hover:bg-black transition-all duration-300"
                  asChild
                >
                  <Link href="/brands">Brands</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenu>
          </div>
          <div className="nav-icons flex items-center gap-2">
            {session && (
              <>
                <p>{`Welcome ${session.user?.name}`}</p>
              </>
            )}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <UserRound className="cursor-pointer" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuGroup>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  {session ? (
                    <>
                      <Link href="all-orders">
                        <DropdownMenuItem>Your Orders</DropdownMenuItem>
                      </Link>

                      <DropdownMenuItem onClick={handleLogOut}>
                        Logout
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <>
                      <Link href="/register">
                        <DropdownMenuItem>Register</DropdownMenuItem>
                      </Link>

                      <Link href="/login">
                        <DropdownMenuItem>Login</DropdownMenuItem>
                      </Link>
                    </>
                  )}
                </DropdownMenuGroup>

                <DropdownMenuGroup></DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            {session && (
              <>
                <Link href="/cart" className="cursor-pointer relative">
                  <ShoppingCart />
                  <Badge className="absolute start-full bottom-full -translate-x-1/2 translate-y-1/2">
                    {isLoading ? <Spinner /> : noOfCartItems}
                  </Badge>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
