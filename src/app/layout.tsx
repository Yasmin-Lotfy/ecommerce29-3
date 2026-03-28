import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/commons/navbar";
import Footer from "@/components/commons/footer";
import { Toaster } from "sonner";
import AuthProvider from "@/providers/session-provider";
import CartContextProvider from "@/providers/cart-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export const metadata: Metadata = {
  title: "ShopMart | ShopMart",
  description: "ShopMart is a platform for buying and selling products",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
       
        <AuthProvider>
          <CartContextProvider>
         
          <Navbar />
          <div className="mt-21">{children}</div>
          <Toaster position="top-center" richColors />

          <Footer />
          </CartContextProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
