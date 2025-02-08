"use client";
import React, { createContext, useState, ReactNode, useContext, useEffect } from "react";

// Define product type for the wishlist
type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  stock: number;
  customWidth: number;
  customHeight: number;
};

interface WishlistContextType {
  wishlistItems: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (id: string) => void;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};

interface WishlistProviderProps {
  children: ReactNode;
}

export const WishlistProvider: React.FC<WishlistProviderProps> = ({ children }) => {
  // Load wishlist from local storage, or set to an empty array if not available
  const loadWishlistFromLocalStorage = () => {
    if (typeof window !== "undefined") {
      const savedWishlist = localStorage.getItem("wishlist");
      return savedWishlist ? JSON.parse(savedWishlist) : [];
    }
    return [];
  };

  const [wishlistItems, setWishlistItems] = useState<Product[]>(loadWishlistFromLocalStorage);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
    }
  }, [wishlistItems]); // ✅ Save changes to local storage when wishlist updates

  const addToWishlist = (product: Product) => {
    // ✅ Prevent duplicate items
    const isAlreadyInWishlist = wishlistItems.some((item) => item.id === product.id);

    if (isAlreadyInWishlist) {
      window.alert("This item is already in the wishlist!");
      return;
    }

    setWishlistItems([...wishlistItems, product]);
  };

  const removeFromWishlist = (id: string) => {
    const updatedWishlist = wishlistItems.filter((item) => item.id !== id);
    setWishlistItems(updatedWishlist);
  };

  const clearWishlist = () => {
    setWishlistItems([]);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
