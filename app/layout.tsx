"use client";

import { useState } from "react";
import NavScrollExample from "./Components/Header";
import { CartProvider } from "./Components/CartContext";
import { WishlistProvider } from "./Components/WishlistContext";
import products from "./Components/data";
import "bootstrap/dist/css/bootstrap.min.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [filteredProducts, setFilteredProducts] = useState(products);

  return (
    <html lang="en">
      <body>
        <CartProvider>
          <WishlistProvider>
            <NavScrollExample setFilteredProducts={setFilteredProducts} />
            <main className="container mx-auto p-4">{children}</main>
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
