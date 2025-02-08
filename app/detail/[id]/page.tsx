"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useCart } from "../../Components/CartContext";
import { useWishlist } from "../../Components/WishlistContext";
import products from "../../Components/data";
import Swal from "sweetalert2";

// Define Product interface
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  stock: number;
}

// Component
const ProductDetail = () => {
  const params = useParams();
  const id = params.id as string;

  const cartContext = useCart();
  const wishlistContext = useWishlist();

  const cart = cartContext?.cart || [];
  const wishlistItems = wishlistContext?.wishlistItems || [];

  const addToCart = cartContext?.addToCart || (() => {});
  const addToWishlist = wishlistContext?.addToWishlist || (() => {});

  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const foundProduct = products.find((p) => p.id === id);
    setProduct(foundProduct || null);
  }, [id]);

  const isAlreadyInCart = cart.some((item) => item.id === id);
  const isAlreadyInWishlist = wishlistItems.some((item) => item.id === id);

  const showAlert = (title: string, text: string, icon: "success" | "error" | "warning") => {
    Swal.fire({
      title,
      text,
      icon,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "OK",
    });
  };

  const handleAddToCart = () => {
    if (!product) return;

    if (isAlreadyInCart) {
      showAlert("Already in Cart!", `"${product.name}" is already in your cart.`, "warning");
      return;
    }

    addToCart({ ...product, quantity });
    showAlert("Added to Cart!", `"${product.name}" has been added to your cart.`, "success");
  };

  const handleAddToWishlist = () => {
    if (!product) return;

    if (isAlreadyInWishlist) {
      showAlert("Already in Wishlist!", `"${product.name}" is already in your wishlist.`, "warning");
      return;
    }

    addToWishlist(product);
    showAlert("Added to Wishlist!", `"${product.name}" has been added to your wishlist.`, "success");
  };

  if (!product) {
    return <p className="text-center text-lg font-semibold mt-10">Loading product details...</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Image
            src={product.image}
            alt={product.name}
            width={500}
            height={350}
            className="rounded-lg shadow-lg object-cover w-full h-auto"
            priority
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="mt-2 text-gray-600">{product.description}</p>
          <p className="text-lg font-bold text-gray-800 mt-2">
  Rs: {product.price}
</p>
          <p className={product.stock > 0 ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
            {product.stock > 0 ? "In Stock" : "Out of Stock"}
          </p>

          <div className="mt-4">
            <label className="block text-sm font-medium">Quantity:</label>
            <input
              type="number"
              value={quantity}
              min={1}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="border p-2 w-20 rounded"
            />
          </div>

          <div className="mt-5 flex gap-4">
            <button
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-800 disabled:bg-gray-400"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              {isAlreadyInCart ? "Already in Cart" : "Add to Cart"}
            </button>

            <button
              className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-800"
              onClick={handleAddToWishlist}
            >
              {isAlreadyInWishlist ? "Already in Wishlist" : "Add to Wishlist"}
            </button>
          </div>

          <ul className="mt-5 text-gray-700">
            <li><b>Stock:</b> <span>{product.stock}</span></li>
            <li><b>Shipping:</b> <span>01 day shipping. <span className="text-green-500">Free pickup today</span></span></li>
            <li><b>Weight:</b> <span>0.5 kg</span></li>
            <li><b>Share on:</b>
              <div className="flex gap-2 mt-2">
                <a href="#" className="text-blue-600"><i className="fa fa-facebook"></i></a>
                <a href="#" className="text-blue-400"><i className="fa fa-twitter"></i></a>
                <a href="#" className="text-pink-500"><i className="fa fa-instagram"></i></a>
                <a href="#" className="text-red-600"><i className="fa fa-pinterest"></i></a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
