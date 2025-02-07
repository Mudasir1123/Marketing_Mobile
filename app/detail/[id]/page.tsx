"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import products from "../../Components/data"; // Ensure the correct path

// Define Product interface
interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  stock: number;
  customWidth?: number;
  customHeight?: number;
}

// Component
const ProductDetail = () => {
  const params = useParams(); // Fetch params correctly in Next.js 15+
  const id = params.id as string; // Ensure correct typing

  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    // Find product by ID
    const foundProduct = products.find((p) => p.id === id);
    setProduct(foundProduct || null);
  }, [id]);

  // Loading state
  if (!product) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <img
        src={product.image}
        alt={product.name}
        width={product.customWidth || 500}
        height={product.customHeight || 350}
        className="w-full h-96 object-cover"
      />
      <h1 className="text-2xl font-bold mt-4">{product.name}</h1>
      <p className="mt-2">{product.description}</p>
      <p className="text-lg font-bold mt-2">${product.price}</p>
      <p className={product.stock > 0 ? "text-green-500" : "text-red-500"}>
        {product.stock > 0 ? "In Stock" : "Out of Stock"}
      </p>
    </div>
  );
};

export default ProductDetail;
