"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useCart } from "../../Components/CartContext";
import { useWishlist } from "../../Components/WishlistContext";
import products from "../../Components/data";
import Swal from "sweetalert2";
import Link from "next/link";

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
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const foundProduct = products.find((p) => p.id === id);
    setProduct(foundProduct || null);

    if (foundProduct) {
      // Exclude the current product and shuffle
      const filteredProducts = products.filter((p) => p.id !== id);
      const shuffledProducts = filteredProducts.sort(() => 0.5 - Math.random());
      setRelatedProducts(shuffledProducts.slice(0, 4)); // Pick 4 random related products
    }
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
          <p className="text-lg font-bold text-gray-800 mt-2">Rs: {product.price}</p>
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
        </div>
      </div>

      {/* Related Products Section */}
      <div className="mt-10">
  <h2 className="text-2xl font-bold text-center mb-6">Related Products</h2>
  <div className="row">
    {relatedProducts.map((related) => (
      <div key={related.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
        <Link href={`/detail/${related.id}`} className="text-decoration-none">
          <div className="card h-100 shadow-sm">
            <Image
              src={related.image}
              alt={related.name}
              width={200}
              height={150}
              className="card-img-top p-2"
              style={{ objectFit: "cover", height: "180px", borderRadius: "10px" }}
            />
            <div className="card-body text-center">
              <h5 className="card-title">{related.name}</h5>
              <p className="card-text text-muted">Rs: {related.price}</p>
              <p className={`fw-semibold ${related.stock > 0 ? "text-success" : "text-danger"}`}>
                {related.stock > 0 ? "In Stock" : "Out of Stock"}
              </p>
              <button className="btn btn-primary">View Details</button>
            </div>
          </div>
        </Link>
      </div>
    ))}
  </div>
</div>

    </div>
  );
};

export default ProductDetail;
