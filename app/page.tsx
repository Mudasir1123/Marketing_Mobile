"use client";
import React, { useState } from 'react';
import { FaShippingFast, FaShoppingCart, FaSearch, FaPhoneVolume, FaSync } from "react-icons/fa";
import './globals.css';
import ProductList from './Components/ProductList';
import CategoryComponent from './Components/categoryComponent';
import SearchBar from './Components/SearchBar';
import { CartProvider } from './Components/CartContext';
import { WishlistProvider } from './Components/WishlistContext'; // Ensure this import is present
import products from "./Components/data"; // ✅ Ensure correct path

const categories = [
  { id: '1', name: 'Samsung Galaxy' },
  { id: '2', name: 'I phone' },
  { id: '3', name: 'Infinix' },
  { id: '4', name: 'Oppo' },                 
  { id: '5', name: 'Huawei' },
  { id: '6', name: 'Readme' },
];
  


  const Page: React.FC = () => {
    const [filteredProducts, setFilteredProducts] = useState(products);
  
    return (
      <>

      <CartProvider>
        <WishlistProvider>
          <div className="p-4">
            <h1 className="text-center mb-4">Product List</h1>
  
            {/* Category Filter */}
            <CategoryComponent
              categories={categories}
              products={products}
              setFilteredProducts={setFilteredProducts}
            />
  
            {/* Search Bar */}
            <SearchBar
              products={products}
              setFilteredProducts={setFilteredProducts}
            />
  
            {/* Product List */}
            <ProductList products={filteredProducts} />
  
          </div>
        </WishlistProvider>
      </CartProvider>
      </>
    );
  };
  
  export default Page;
