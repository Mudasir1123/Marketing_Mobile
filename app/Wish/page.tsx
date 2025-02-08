"use client";

import React from "react";
import { useWishlist } from "../Components/WishlistContext";

const WishlistComponent: React.FC = () => {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();

  return (
    <div className="wishlist-container p-4">
      {wishlistItems.length === 0 ? (
        <p className="text-center text-gray-500">Your wishlist is empty</p>
      ) : (
        <div>
          <div className="wishlist-items space-y-4">
            {wishlistItems.map((item) => (
              <div
                key={item.id}
                className="wishlist-item flex justify-between items-center border-b pb-2"
              >
                <div className="flex items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover mr-4 rounded-lg"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-500">Rs: {item.price} only</p>
                  </div>
                </div>
                <button
                  className="ml-4 text-red-600 hover:text-red-800 transition"
                  onClick={() => removeFromWishlist(item.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="wishlist-actions mt-4 flex justify-between font-bold text-lg">
            <button
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
              onClick={clearWishlist}
            >
              Clear Wishlist
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WishlistComponent;
