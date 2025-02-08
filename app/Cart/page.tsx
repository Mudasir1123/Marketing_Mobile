"use client"; // ✅ Ensures this is a Client Component

import { useRouter } from "next/navigation"; // ✅ Import useRouter
import React, { useState, useEffect } from "react";
import { useCart } from "../Components/CartContext";

const CartComponent: React.FC = () => {
  const router = useRouter(); // ✅ Initialize router
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (!cartItems || cartItems.length === 0) {
      setTotalPrice(0);
      return;
    }

    const total = cartItems.reduce((acc, item) => {
      const price = item.price || 0;
      const quantity = item.quantity || 1;
      return acc + price * quantity;
    }, 0);

    setTotalPrice(total);
  }, [cartItems]);

  return (
    <div className="cart-container p-4">
      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty</p>
      ) : (
        <div>
          <div className="cart-items space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="cart-item flex justify-between items-center border-b pb-2"
              >
                <div className="flex items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover mr-4"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-500">Rs: {item.price} only</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <button
                    className="px-2 py-1 border rounded-lg mr-2"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="text-lg">{item.quantity}</span>
                  <button
                    className="px-2 py-1 border rounded-lg ml-2"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                  <button
                    className="ml-4 text-red-600"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* ✅ Fixed Total Price Calculation */}
          <div className="cart-total mt-4 flex justify-between font-bold text-lg">
            <span>Total Price:</span>
            <span>Rs {totalPrice > 0 ? totalPrice.toFixed(2) : "0.00"}</span>
          </div>

          {/* ✅ Proceed to Checkout Button with Fixed Navigation */}
          <button
            className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            onClick={() => router.push("/Checkout")} // ✅ Redirect to checkout
            disabled={cartItems.length === 0} // ✅ Disable if cart is empty
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default CartComponent;
