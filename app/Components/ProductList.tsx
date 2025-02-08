import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";

interface Product {
  id: string;
  name: string;
  price: number | string;
  image: string;
  stock: number;
  customWidth: number;
  customHeight: number;
}

interface ProductListProps {
  products: Product[];
}

const shuffleArray = (array: Product[]) => {
  let shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const [randomProducts, setRandomProducts] = useState<Product[]>([]);

  useEffect(() => {
    const updateProducts = () => {
      const shuffled = shuffleArray(products).slice(0, 12);
      setRandomProducts(shuffled);
    };

    updateProducts(); // Initial shuffle
    const interval = setInterval(updateProducts, 10000); // Update every 30 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [products]);

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold text-center mb-6">Shop Our Collection</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {randomProducts.length > 0 ? (
          randomProducts.map((product) => <ProductCard key={product.id} {...product} />)
        ) : (
          <p className="text-center text-gray-500 col-span-full">No products available.</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;
