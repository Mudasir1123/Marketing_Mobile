"use client";
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { FaShippingFast, FaShoppingCart, FaSearch, FaPhoneVolume, FaSync } from "react-icons/fa";
import './globals.css';
import ProductList from './Components/ProductList';
import CategoryComponent from './Components/categoryComponent';
import SearchBar from './Components/SearchBar';
import { CartProvider } from './Components/CartContext';
import { WishlistProvider } from './Components/WishlistContext'; // Ensure this import is present
import CartComponent from './Components/CartComponent';
import WishlistComponent from './Components/WishlistComponent'; // Ensure this import is present



import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap
import "../public/assets/css/all.min.css"; // FontAwesome
import "../public/assets/css/owl.carousel.css"; // Owl Carousel
import "../public/assets/css/magnific-popup.css"; // Magnific Popup
import "../public/assets/css/animate.css"; // Animate.css
import "../public/assets/css/meanmenu.min.css"; // Mean Menu
import "../public/assets/css/main.css"; // Main Styles
import "../public/assets/css/responsive.css"; // Responsive Styles
import products  from './Components/data.js'; // Ensure this import is present



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
    <div className="top-header-area" id="sticker">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-sm-12 text-center">
            <div className="main-menu-wrap">
              {/* Logo */}
              <div className="site-logo">
                <Link href="/">
                  <Image src="/assets/img/logo.png" alt="Logo" width={200} height={50} />
                </Link>
              </div>y
              {/* Logo */}
{/* 
             <div className="hero-area hero-bg">
      <div className="container">
        <div className="row">
          <div className="col-lg-9 offset-lg-2 text-center">
            <div className="hero-text">
              <div className="hero-text-tablecell">
                <p className="subtitle">Fresh & Organic</p>
                <h1>Delicious Seasonal Fruits</h1>
                <div className="hero-btns">
                  <Link href="/shop">
                    <a className="boxed-btn">Fruit Collection</a>
                  </Link>
                  <Link href="/contact">
                    <a className="bordered-btn">Contact Us</a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> */}

              {/* Menu */}
              <nav className="main-menu">
                <ul>
                  <li className="current-list-item">
                    <Link href="#">
                      Home
                    </Link>
                    <ul className="sub-menu">
                      <li><Link href="index.html">Static Home</Link></li>
                      <li><Link href="index_2.html">Slider Home</Link></li>
                    </ul>
                  </li>
                  <li><Link href="about.html">About</Link></li>
                  <li>
                    <Link href="#">Pages</Link>
                    <ul className="sub-menu">
                      <li><Link href="404.html">404 page</Link></li>
                      <li><Link href="about.html">About</Link></li>
                      <li><Link href="cart.html">Cart</Link></li>
                      <li><Link href="checkout.html">Check Out</Link></li>
                      <li><Link href="contact.html">Contact</Link></li>
                      <li><Link href="news.html">News</Link></li>
                      <li><Link href="shop.html">Shop</Link></li>
                    </ul>
                  </li>
                  <li>
                    <Link href="news.html">News</Link>
                    <ul className="sub-menu">
                      <li><Link href="news.html">News</Link></li>
                      <li><Link href="single-news.html">Single News</Link></li>
                    </ul>
                  </li>
                  <li><Link href="contact.html">Contact</Link></li>
                  <li>
                    <Link href="shop.html">Shop</Link>
                    <ul className="sub-menu">
                      <li><Link href="shop.html">Shop</Link></li>
                      <li><Link href="checkout.html">Check Out</Link></li>
                      <li><Link href="single-product.html">Single Product</Link></li>
                      <li><Link href="cart.html">Cart</Link></li>
                    </ul>
                  </li>
                  <li>
                    <div className="header-icons">
                      <Link href="cart.html">
                        <FaShoppingCart />
                      </Link>
                      <a className="mobile-hide search-bar-icon" href="#">
                        <FaSearch />
                      </a>
                    </div>
                  </li>
                </ul>
              </nav>
              {/* Menu */}

              {/* Mobile Menu */}
              <a className="mobile-show search-bar-icon" href="#">
                <FaSearch />
              </a>
              <div className="mobile-menu"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

      <div className="row m-5">
      <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
        <div className="list-box d-flex align-items-center">
          <div className="list-icon">
            <FaShippingFast />
          </div>
          <div className="content">
            <h3>Free Shipping</h3>
            <p>When order over $75</p>
          </div>
        </div>
      </div>
      <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
        <div className="list-box d-flex align-items-center">
          <div className="list-icon">
            <FaPhoneVolume />
          </div>
          <div className="content">
            <h3>24/7 Support</h3>
            <p>Get support all day</p>
          </div>
        </div>
      </div>
      <div className="col-lg-4 col-md-6">
        <div className="list-box d-flex justify-content-start align-items-center">
          <div className="list-icon">
            <FaSync />
          </div>
          <div className="content">
            <h3>Refund</h3>
            <p>Get refund within 3 days!</p>
          </div>
        </div>
      </div>
    </div>




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
  
            {/* Cart Component */}
            <CartComponent />
  
            {/* Wishlist Component */}
            <WishlistComponent />
          </div>
        </WishlistProvider>
      </CartProvider>
      </>
    );
  };
  
  export default Page;
