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



const categories = [
  { id: '1', name: 'Samsung Galaxy' },
  { id: '2', name: 'I phone' },
  { id: '3', name: 'Infinix' },
  { id: '4', name: 'Oppo' },                 
  { id: '5', name: 'Huawei' },
  { id: '6', name: 'Readme' },
];

const products = [
  {
    id: '1',
    name: 'Samsung Galaxy A01',
    price: '16,499',
    image: '/SamsungGalaxyA01.webp', // Absolute path
    stock: 30,
    category: '1', // Electronics
    tags: ['smartphone', 'budget', 'mobile'],
    customWidth: 500,
    customHeight: 350,
    description: 'Samsung Galaxy A01 offers essential smartphone features in an affordable package. Enjoy a 5.7-inch screen, 13MP camera, and reliable performance.',
  },

  {
    id: '2',
    name: 'Samsung Galaxy A21',
    price: '34,999',
    image: '/SamsungGalaxyA21.webp',
    stock: 25,
    category: '1',
    tags: ['smartphone', 'budget', 'mobile'],
    customWidth: 500,
    customHeight: 350,
    description: 'A21 features a 6.5-inch screen, quad-camera setup, and a long-lasting battery. Perfect for everyday use with a larger display and camera flexibility.'
  },
  {
    id: '3',
    name: 'Samsung Galaxy S20',
    price: '170,999',
    image: '/SamsungGalaxyS20.webp',
    stock: 15,
    category: '1',
    tags: ['smartphone', 'premium', 'mobile'],
    customWidth: 500,
    customHeight: 350,
    description: 'The Galaxy S20 delivers top-tier performance with a 120Hz AMOLED display, 64MP camera, and 5G capabilities. A flagship device for all your tech needs.'
  },
  {
    id: '4',
    name: 'Samsung Galaxy Note 20',
    price: '179,999',
    image: '/SamsungGalaxyNote20.jpg',
    stock: 12,
    category: '1',
    tags: ['smartphone', 'premium', 'mobile', 'stylus'],
    customWidth: 500,
    customHeight: 350,
    description: 'Note 20 combines productivity and performance with a large 6.9-inch display, Snapdragon 865+, and the iconic S-Pen. Ideal for professionals and creatives.'
  },
  {
    id: '5',
    name: 'Samsung Galaxy A51',
    price: '49,999',
    image: '/SamsungGalaxyA51.jpg',
    stock: 20,
    category: '1',
    tags: ['smartphone', 'mid-range', 'mobile'],
    customWidth: 500,
    customHeight: 350,
    description: 'The A51 features a 6.5-inch Super AMOLED display, 48MP quad-camera, and strong battery life, all within an affordable price range.'
  },
  {
    id: '6',
    name: 'Samsung Galaxy Z Flip',
    price: '299,999',
    image: '/SamsungGalaxyZFlip.jpg',
    stock: 10,
    category: '1',
    tags: ['smartphone', 'foldable', 'premium'],
    customWidth: 500,
    customHeight: 350,
    description: 'The Galaxy Z Flip redefines compact design with a foldable 6.7-inch screen, making it both functional and fashionable.'
  },
  {
    id: '7',
    name: 'Samsung Galaxy S21',
    price: '176,499',
    image: '/SamsungGalaxyS21.jpg',
    stock: 18,
    category: '1',
    tags: ['smartphone', 'premium', 'mobile'],
    customWidth: 500,
    customHeight: 350,
    description: 'The Galaxy S21 brings a 6.2-inch Dynamic AMOLED display, 8GB RAM, and 5G support, delivering high-end performance at a more accessible price.'
  },
  {
    id: '8',
    name: 'Samsung Galaxy A72',
    price: "82,999",
    image: '/SamsungGalaxyA72.jpg',
    stock: 22,
    category: '1',
    tags: ['smartphone', 'mid-range', 'mobile'],
    customWidth: 500,
    customHeight: 350,
    description: 'A72 combines a large 6.7-inch display, 64MP camera, and a 5000mAh battery, making it ideal for users who need more screen and camera power.'
  },
  {
    id: '9',
    name: 'Samsung Galaxy M32 5G',
    price: '32,999',
    image: '/SamsungGalaxyM325G.jpg',
    stock: 30,
    category: '1',
    tags: ['smartphone', 'budget', 'mobile'],
    customWidth: 500,
    customHeight: 350,
    description: 'Samsung Galaxy M32 offers a 6.4-inch FHD+ AMOLED screen, MediaTek Helio G80 chipset, and a 64MP quad-camera at a great value for budget-conscious users.'
  },
  {
    id: '10',
    name: 'Samsung Galaxy Z Fold 2',
    price: '289,999',
    image: '/SamsungGalaxyZFold2.jpg',
    stock: 5,
    category: '1',
    tags: ['smartphone', 'foldable', 'premium'],
    customWidth: 500,
    customHeight: 350,
    description: 'The Galaxy Z Fold 2 brings a massive 7.6-inch foldable display, Snapdragon 865+, and premium build quality for those seeking the cutting edge in mobile tech.'
  },
  
    {
      id: '11',
      name: 'iPhone 13 Mini',
      price: '223,399',
      image: '/iPhone13Mini.jpg',
      stock: 35,
      category: '2', // Electronics
      tags: ['smartphone', 'compact', 'mobile'],
      customWidth: 500,
      customHeight: 350,
      description: 'The iPhone 13 Mini is small in size but big on features. With a 5.4-inch OLED display, A15 Bionic chip, and great camera system, it’s ideal for users who prefer a compact phone with powerful performance.'
    },
    {
      id: '12',
      name: 'iPhone 13',
      price: '239,999',
      image: '/iPhone13.webp',
      stock: 40,
      category: '2',
      tags: ['smartphone', 'premium', 'mobile'],
      customWidth: 500,
      customHeight: 350,
      description: 'The iPhone 13 features a 6.1-inch OLED display, A15 Bionic chip, and a dual-camera system for improved photo and video quality. A perfect balance between performance and value.'
    },
    {
      id: '13',
      name: 'iPhone 13 Pro',
      price: '309,999',
      image: '/iPhone13Pro.webp',
      stock: 30,
      category: '2',
      tags: ['smartphone', 'premium', 'mobile'],
      customWidth: 500,
      customHeight: 350,
      description: 'The iPhone 13 Pro offers top-tier performance with a 6.1-inch ProMotion display, 120Hz refresh rate, and the powerful A15 Bionic chip. Capture stunning photos with the advanced triple-camera system.'
    },
    {
      id: '14',
      name: 'iPhone 13 Pro Max',
      price: '371,999',
      image: '/iPhone13Promax.webp',
      stock: 25,
      category: '2',
      tags: ['smartphone', 'premium', 'mobile'],
      customWidth: 500,
      customHeight: 350,
      description: 'The iPhone 13 Pro Max comes with a large 6.7-inch display, 120Hz ProMotion technology, and enhanced camera features. Perfect for users who want the best in performance and battery life.'
    },
    {
      id: '15',
      name: 'iPhone 12 Mini',
      price: '157,399',
      image: '/iPhone12Mini.jpg',
      stock: 30,
      category: '2',
      tags: ['smartphone', 'compact', 'mobile'],
      customWidth: 500,
      customHeight: 350,
      description: 'iPhone 12 Mini offers a compact design with a 5.4-inch OLED display, A14 Bionic chip, and 5G capabilities. It combines modern features with a small form factor for ultimate portability.'
    },
    {
      id: '16',
      name: 'iPhone 12',
      price: '175,599',
      image: '/iPhone12.webp',
      stock: 40,
      category: '2',
      tags: ['smartphone', 'premium', 'mobile'],
      customWidth: 500,
      customHeight: 350,
      description: 'iPhone 12 features a 6.1-inch OLED display, A14 Bionic chip, and 5G capabilities. It’s a perfect mix of performance and future-proofing with the latest technology.'
    },
    {
      id: '17',
      name: 'iPhone 12 Pro',
      price: '220,899',
      image: '/iPhone12Pro.webp',
      stock: 20,
      category: '2',
      tags: ['smartphone', 'premium', 'mobile'],
      customWidth: 500,
      customHeight: 350,
      description: 'The iPhone 12 Pro delivers a 6.1-inch Super Retina XDR display, enhanced camera system with LiDAR, and superior performance with the A14 Bionic chip, making it perfect for creatives.'
    },
    {
      id: '18',
      name: 'iPhone 12 Pro Max',
      price: '236,999',
      image: '/iPhone12ProMax.webp',
      stock: 15,
      category: '2',
      tags: ['smartphone', 'premium', 'mobile'],
      customWidth: 500,
      customHeight: 350,
      description: 'iPhone 12 Pro Max offers a 6.7-inch Super Retina XDR display, Pro camera system with improved Night mode, and long-lasting battery life, perfect for those who want the ultimate iPhone experience.'
    },
    {
      id: '19',
      name: 'iPhone 11',
      price: '143,999',
      image: '/iPhone11.webp',
      stock: 35,
      category: '2',
      tags: ['smartphone', 'budget', 'mobile'],
      customWidth: 500,
      customHeight: 350,
      description: 'The iPhone 11 comes with a 6.1-inch Liquid Retina display, dual-camera system, and the A13 Bionic chip, offering excellent performance and value for those looking for an affordable iPhone.'
    },
    {
      id: '20',
      name: 'iPhone XR',
      price: '1,19999',
      image: '/iPhoneXR.jpg',
      stock: 50,
      category: '2',
      tags: ['smartphone', 'budget', 'mobile'],
      customWidth: 500,
      customHeight: 350,
      description: 'iPhone XR features a 6.1-inch Liquid Retina HD display, A12 Bionic chip, and great battery life, offering an affordable way to enjoy the iPhone experience.'
    },

  
      {
        id: '21',
        name: 'Infinix Zero 5G',
        price: '46,999',
        image: '/InfinixZero5G.webp',
        stock: 30,
        category: '3', // Mobile
        tags: ['smartphone', '5G', 'mobile'],
        customWidth: 500,
        customHeight: 350,
        description: 'The Infinix Zero 5G offers fast 5G connectivity, a 6.78-inch FHD+ display, and a powerful MediaTek Dimensity 900 chipset, delivering performance and speed for all your tasks.'
      },
      {
        id: '22',
        name: 'Infinix Note 11 Pro',
        price: '34,799',
        image: '/InfinixNote11Pro.webp',
        stock: 40,
        category: '3',
        tags: ['smartphone', 'budget', 'mobile'],
        customWidth: 500,
        customHeight: 350,
        description: 'Infinix Note 11 Pro features a large 6.95-inch display, a 64MP triple-camera system, and the MediaTek Helio G96 chipset, providing a balance of performance and affordability.'
      },
      {
        id: '23',
        name: 'Infinix Hot 11S',
        price: '21,899',
        image: '/InfinixHot11S.WEBP',
        stock: 50,
        category: '3',
        tags: ['smartphone', 'budget', 'mobile'],
        customWidth: 500,
        customHeight: 350,
        description: 'Infinix Hot 11S offers a 6.78-inch display, 50MP camera, and a powerful MediaTek Helio G88 chipset. A great budget option with performance and a large screen.'
      },
      {
        id: '24',
        name: 'Infinix Note 10 Pro',
        price: '33,999',
        image: '/InfinixNote10Pro.webp',
        stock: 25,
        category: '3',
        tags: ['smartphone', 'mid-range', 'mobile'],
        customWidth: 500,
        customHeight: 350,
        description: 'The Infinix Note 10 Pro has a large 6.95-inch display, a 64MP quad-camera setup, and the MediaTek Helio G95 chipset, offering a high-quality experience in a mid-range device.'
      },
      {
        id: '25',
        name: 'Infinix Zero 8i',
        price: '30,199',
        image: '/InfinixZero8i.webp',
        stock: 20,
        category: '3',
        tags: ['smartphone', 'mid-range', 'mobile'],
        customWidth: 500,
        customHeight: 350,
        description: 'The Infinix Zero 8i comes with a 48MP dual front camera, 6.85-inch display, and MediaTek Helio G90T processor, offering great selfie capabilities and smooth performance.'
      },
      {
        id: '26',
        name: 'Infinix Hot 10',
        price: '19,799',
        image: '/InfinixHot10 .webp',
        stock: 60,
        category: '3',
        tags: ['smartphone', 'budget', 'mobile'],
        customWidth: 500,
        customHeight: 350,
        description: 'Infinix Hot 10 delivers a 6.78-inch display, 16MP quad-camera setup, and a long-lasting battery. A budget-friendly device with a large screen and solid performance.'
      },
      {
        id: '27',
        name: 'Infinix Zero X Pro',
        price: '49,999',
        image: '/InfinixZeroXPro.webp',
        stock: 15,
        category: '3',
        tags: ['smartphone', 'premium', 'mobile'],
        customWidth: 500,
        customHeight: 350,
        description: 'The Infinix Zero X Pro offers a stunning 108MP camera, a 6.67-inch AMOLED display, and a MediaTek Dimensity 1300 chipset, perfect for photography enthusiasts and power users.'
      },
      {
        id: '28',
        name: 'Infinix Note 12',
        price: '54,999',
        image: '/InfinixNote12.webp',
        stock: 30,
        category: '3',
        tags: ['smartphone', 'mid-range', 'mobile'],
        customWidth: 500,
        customHeight: 350,
        description: 'The Infinix Note 12 is equipped with a 6.7-inch AMOLED display, 50MP camera, and MediaTek Helio G96 processor, providing great performance and display quality at an affordable price.'
      },
      {
        id: '29',
        name: 'Infinix Zero 5G 2023',
        price: 349.99,
        image: '/infinix_zero_5g_2023.png',
        stock: 18,
        category: '3',
        tags: ['smartphone', '5G', 'premium'],
        customWidth: 500,
        customHeight: 350,
        description: 'The Infinix Zero 5G 2023 features a 6.78-inch AMOLED display, MediaTek Dimensity 1200 chipset, and 5G support for faster speeds, offering performance and future-proofing for tech enthusiasts.'
      },
      {
        id: '30',
        name: 'Infinix Hot 11 Play',
        price: 149.99,
        image: '/infinix_hot_11_play.png',
        stock: 70,
        category: '3',
        tags: ['smartphone', 'budget', 'mobile'],
        customWidth: 500,
        customHeight: 350,
        description: 'Infinix Hot 11 Play features a 6.82-inch display, 13MP camera, and a large 6000mAh battery, providing solid performance for users looking for a budget phone with extended battery life.'
      },
    
      
        {
          id: '31',
          name: 'Oppo A54',
          price: 199.99,
          image: '/oppo_a54.png',
          stock: 40,
          category: '4', // Mobile
          tags: ['smartphone', 'budget', 'mobile'],
          customWidth: 500,
          customHeight: 350,
          description: 'Oppo A54 features a 6.51-inch display, 13MP triple-camera setup, and a long-lasting 5000mAh battery. A solid entry-level smartphone for everyday tasks.'
        },
        {
          id: '32',
          name: 'Oppo F19 Pro',
          price: 299.99,
          image: '/oppo_f19_pro.png',
          stock: 35,
          category: '4',
          tags: ['smartphone', 'mid-range', 'mobile'],
          customWidth: 500,
          customHeight: 350,
          description: 'Oppo F19 Pro offers a 6.43-inch AMOLED display, 48MP quad-camera system, and MediaTek Helio P95 chipset, providing excellent performance and style in the mid-range segment.'
        },
        {
          id: '33',
          name: 'Oppo Reno5',
          price: 399.99,
          image: '/oppo_reno5.png',
          stock: 25,
          category: '4',
          tags: ['smartphone', 'premium', 'mobile'],
          customWidth: 500,
          customHeight: 350,
          description: 'Oppo Reno5 features a 6.43-inch AMOLED display, 64MP quad-camera setup, and Snapdragon 720G chipset, delivering high-end performance with a sleek design.'
        },
        {
          id: '34',
          name: 'Oppo A74 5G',
          price: 269.99,
          image: '/oppo_a74_5g.png',
          stock: 30,
          category: '4',
          tags: ['smartphone', '5G', 'mobile'],
          customWidth: 500,
          customHeight: 350,
          description: 'The Oppo A74 5G brings 5G connectivity, a 6.5-inch display, 48MP camera, and Snapdragon 480 chipset for users looking for future-proof performance in an affordable device.'
        },
        {
          id: '35',
          name: 'Oppo F19',
          price: 249.99,
          image: '/oppo_f19.png',
          stock: 40,
          category: '4',
          tags: ['smartphone', 'mid-range', 'mobile'],
          customWidth: 500,
          customHeight: 350,
          description: 'Oppo F19 delivers a 6.43-inch AMOLED display, 48MP triple-camera setup, and Snapdragon 662 chipset. A well-balanced phone for those who want reliable performance without breaking the bank.'
        },
        {
          id: '36',
          name: 'Oppo Reno4 Pro',
          price: 499.99,
          image: '/oppo_reno4_pro.png',
          stock: 20,
          category: '4',
          tags: ['smartphone', 'premium', 'mobile'],
          customWidth: 500,
          customHeight: 350,
          description: 'Oppo Reno4 Pro offers a 6.5-inch AMOLED display, Snapdragon 720G chipset, and a 48MP quad-camera system. Perfect for users looking for a flagship-like experience in a mid-range device.'
        },
        {
          id: '37',
          name: 'Oppo A95',
          price: 349.99,
          image: '/oppo_a95.png',
          stock: 30,
          category: '4',
          tags: ['smartphone', 'mid-range', 'mobile'],
          customWidth: 500,
          customHeight: 350,
          description: 'Oppo A95 comes with a 6.43-inch AMOLED display, 48MP camera, and Snapdragon 662 chipset. A great all-rounder for those who need performance, display quality, and a good camera.'
        },
        {
          id: '38',
          name: 'Oppo Find X3 Pro',
          price: 1099.99,
          image: '/oppo_find_x3_pro.png',
          stock: 15,
          category: '4',
          tags: ['smartphone', 'premium', 'mobile'],
          customWidth: 500,
          customHeight: 350,
          description: 'Oppo Find X3 Pro features a 6.7-inch AMOLED display, Snapdragon 888 chipset, and 50MP quad-camera setup. A flagship device offering cutting-edge features and excellent performance.'
        },
        {
          id: '39',
          name: 'Oppo A53s 5G',
          price: 219.99,
          image: '/oppo_a53s_5g.png',
          stock: 50,
          category: '4',
          tags: ['smartphone', '5G', 'mobile'],
          customWidth: 500,
          customHeight: 350,
          description: 'Oppo A53s 5G offers a 6.52-inch display, MediaTek Dimensity 700 5G chipset, and a 13MP camera setup, making it a solid option for budget-conscious users seeking 5G performance.'
        },
        {
          id: '40',
          name: 'Oppo A31',
          price: 179.99,
          image: '/oppo_a31.png',
          stock: 60,
          category: '4',
          tags: ['smartphone', 'budget', 'mobile'],
          customWidth: 500,
          customHeight: 350,
          description: 'Oppo A31 comes with a 6.5-inch display, 12MP triple-camera system, and a large 4230mAh battery, offering an affordable yet reliable smartphone for everyday use.'
        },
      
        
          {
            id: '41',
            name: 'Huawei P40 Pro',
            price: 899.99,
            image: '/huawei_p40_pro.png',
            stock: 20,
            category: '5', // Mobile
            tags: ['smartphone', 'premium', 'mobile'],
            customWidth: 500,
            customHeight: 350,
            description: 'The Huawei P40 Pro features a 6.58-inch OLED display, Kirin 990 chipset, and a quad-camera system with a 50MP main camera. A premium device offering excellent performance and photography capabilities.'
          },
          {
            id: '42',
            name: 'Huawei Mate 40 Pro',
            price: 1099.99,
            image: '/huawei_mate_40_pro.png',
            stock: 15,
            category: '5',
            tags: ['smartphone', 'premium', 'mobile'],
            customWidth: 500,
            customHeight: 350,
            description: 'The Huawei Mate 40 Pro boasts a 6.76-inch OLED display, Kirin 9000 chipset, and a powerful 50MP main camera. Ideal for users looking for a cutting-edge device with top-notch performance.'
          },
          {
            id: '43',
            name: 'Huawei P30 Pro',
            price: 799.99,
            image: '/huawei_p30_pro.png',
            stock: 25,
            category: '5',
            tags: ['smartphone', 'premium', 'mobile'],
            customWidth: 500,
            customHeight: 350,
            description: 'Huawei P30 Pro is known for its remarkable 40MP Leica quad-camera system, a 6.47-inch OLED display, and the Kirin 980 chipset. A flagship phone designed for users who prioritize photography.'
          },
          {
            id: '44',
            name: 'Huawei Nova 8',
            price: 399.99,
            image: '/huawei_nova_8.png',
            stock: 30,
            category: '5',
            tags: ['smartphone', 'mid-range', 'mobile'],
            customWidth: 500,
            customHeight: 350,
            description: 'Huawei Nova 8 offers a 6.57-inch OLED display, 64MP main camera, and Kirin 820E chipset. It’s an excellent option for mid-range smartphone users looking for good performance and sleek design.'
          },
          {
            id: '45',
            name: 'Huawei P40 Lite',
            price: 269.99,
            image: '/huawei_p40_lite.png',
            stock: 40,
            category: '5',
            tags: ['smartphone', 'budget', 'mobile'],
            customWidth: 500,
            customHeight: 350,
            description: 'Huawei P40 Lite features a 6.4-inch display, 48MP quad-camera system, and Kirin 810 chipset. A solid budget-friendly phone offering great performance and camera quality.'
          },
          {
            id: '46',
            name: 'Huawei Y9a',
            price: 229.99,
            image: '/huawei_y9a.png',
            stock: 50,
            category: '5',
            tags: ['smartphone', 'budget', 'mobile'],
            customWidth: 500,
            customHeight: 350,
            description: 'Huawei Y9a comes with a 6.63-inch display, 64MP quad-camera system, and MediaTek Helio G80 chipset, offering a solid experience for budget-conscious users.'
          },
          {
            id: '47',
            name: 'Huawei Mate 30 Pro',
            price: 999.99,
            image: '/huawei_mate_30_pro.png',
            stock: 18,
            category: '5',
            tags: ['smartphone', 'premium', 'mobile'],
            customWidth: 500,
            customHeight: 350,
            description: 'The Huawei Mate 30 Pro features a 6.53-inch OLED display, Kirin 990 chipset, and an exceptional 40MP Leica quad-camera system, perfect for those seeking advanced features and performance.'
          },
          {
            id: '48',
            name: 'Huawei P40',
            price: 799.99,
            image: '/huawei_p40.png',
            stock: 30,
            category: '5',
            tags: ['smartphone', 'premium', 'mobile'],
            customWidth: 500,
            customHeight: 350,
            description: 'Huawei P40 offers a 6.1-inch OLED display, 50MP camera, and Kirin 990 chipset. A flagship phone with impressive features and a great camera setup for everyday use.'
          },
          {
            id: '49',
            name: 'Huawei Mate 20 Pro',
            price: 649.99,
            image: '/huawei_mate_20_pro.png',
            stock: 22,
            category: '5',
            tags: ['smartphone', 'premium', 'mobile'],
            customWidth: 500,
            customHeight: 350,
            description: 'Huawei Mate 20 Pro comes with a 6.39-inch AMOLED display, Kirin 980 chipset, and a 40MP Leica triple-camera system, offering a top-tier experience with advanced features.'
          },
          {
            id: '50',
            name: 'Huawei Y7a',
            price: 199.99,
            image: '/huawei_y7a.png',
            stock: 60,
            category: '5',
            tags: ['smartphone', 'budget', 'mobile'],
            customWidth: 500,
            customHeight: 350,
            description: 'Huawei Y7a features a 6.67-inch display, 48MP quad-camera system, and Kirin 710A chipset, providing solid performance and camera quality for an affordable price.'
          },
          
            {
              id: '51',
              name: 'Readme X1',
              price: 499.99,
              image: '/readme_x1.png',
              stock: 25,
              category: '6', // Mobile
              tags: ['smartphone', 'premium', 'mobile'],
              customWidth: 500,
              customHeight: 350,
              description: 'The Readme X1 offers a 6.5-inch AMOLED display, a powerful Snapdragon 888 chipset, and a 64MP quad-camera system, delivering an exceptional smartphone experience.'
            },
            {
              id: '52',
              name: 'Readme Pro 5G',
              price: 599.99,
              image: '/readme_pro_5g.png',
              stock: 20,
              category: '6',
              tags: ['smartphone', '5G', 'mobile'],
              customWidth: 500,
              customHeight: 350,
              description: 'Readme Pro 5G features a 6.7-inch OLED display, Snapdragon 870, and 5G connectivity, offering blazing-fast speeds and high-end performance in a sleek design.'
            },
            {
              id: '53',
              name: 'Readme 10',
              price: 399.99,
              image: '/readme_10.png',
              stock: 30,
              category: '6',
              tags: ['smartphone', 'mid-range', 'mobile'],
              customWidth: 500,
              customHeight: 350,
              description: 'The Readme 10 features a 6.5-inch IPS display, MediaTek Dimensity 700, and 48MP camera system. A balanced phone that offers great performance and camera capabilities at an affordable price.'
            },
            {
              id: '54',
              name: 'Readme Max 5G',
              price: 699.99,
              image: '/readme_max_5g.png',
              stock: 15,
              category: '6',
              tags: ['smartphone', '5G', 'mobile'],
              customWidth: 500,
              customHeight: 350,
              description: 'Readme Max 5G comes with a 6.8-inch AMOLED display, Snapdragon 888 chipset, and a 108MP camera setup, offering top-tier performance and 5G speeds.'
            },
            {
              id: '55',
              name: 'Readme Lite',
              price: 229.99,
              image: '/readme_lite.png',
              stock: 40,
              category: '6',
              tags: ['smartphone', 'budget', 'mobile'],
              customWidth: 500,
              customHeight: 350,
              description: 'The Readme Lite offers a 6.4-inch display, 48MP camera, and a MediaTek Helio G85 chipset, a great choice for users looking for a budget-friendly smartphone with solid features.'
            },
            {
              id: '56',
              name: 'Readme S10',
              price: 349.99,
              image: '/readme_s10.png',
              stock: 30,
              category: '6',
              tags: ['smartphone', 'mid-range', 'mobile'],
              customWidth: 500,
              customHeight: 350,
              description: 'Readme S10 features a 6.5-inch FHD+ display, Snapdragon 720G chipset, and a versatile 64MP triple-camera setup, delivering a strong mix of performance and value.'
            },
            {
              id: '57',
              name: 'Readme Ultra',
              price: 799.99,
              image: '/readme_ultra.png',
              stock: 18,
              category: '6',
              tags: ['smartphone', 'premium', 'mobile'],
              customWidth: 500,
              customHeight: 350,
              description: 'The Readme Ultra features a stunning 6.9-inch AMOLED display, Snapdragon 888 chipset, and a 108MP quad-camera system, designed for those who demand the best in performance and design.'
            },
            {
              id: '58',
              name: 'Readme 9',
              price: 299.99,
              image: '/readme_9.png',
              stock: 35,
              category: '6',
              tags: ['smartphone', 'budget', 'mobile'],
              customWidth: 500,
              customHeight: 350,
              description: 'Readme 9 offers a 6.5-inch display, 48MP triple-camera setup, and MediaTek Helio G80 chipset. A solid option for those looking for a budget-friendly phone with a good camera.'
            },
            {
              id: '59',
              name: 'Readme 5G',
              price: 549.99,
              image: '/readme_5g.png',
              stock: 22,
              category: '6',
              tags: ['smartphone', '5G', 'mobile'],
              customWidth: 500,
              customHeight: 350,
              description: 'The Readme 5G features a 6.7-inch FHD+ display, Snapdragon 765G, and 5G connectivity, offering a great blend of performance, screen quality, and speed at an affordable price.'
            },
            {
              id: '60',
              name: 'Readme X5',
              price: 649.99,
              image: '/readme_x5.png',
              stock: 25,
              category: '6',
              tags: ['smartphone', 'premium', 'mobile'],
              customWidth: 500,
              customHeight: 350,
              description: 'Readme X5 comes with a 6.6-inch OLED display, Snapdragon 870 chipset, and a 64MP camera system, delivering powerful performance with flagship-level specifications.'
            }
          
          
        

  ]
  


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
              </div>
              {/* Logo */}

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
