"use client";

import Link from "next/link";
import { useState } from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { useCart } from "../Components/CartContext";
import { useWishlist } from "../Components/WishlistContext";

interface NavScrollExampleProps {
  setFilteredProducts: React.Dispatch<React.SetStateAction<any[]>>;
}

export default function NavScrollExample({ setFilteredProducts }: NavScrollExampleProps) {
  const [expanded, setExpanded] = useState(false);
  const { cartItems } = useCart(); 
  const { wishlistItems } = useWishlist(); 

  return (
    <Navbar expand="lg" bg="light" variant="light" expanded={expanded} className="relative">
      <Container fluid>
        <Navbar.Brand as={Link} href="/" className="fw-bold">
          Navbar Scroll
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarScroll" onClick={() => setExpanded(!expanded)} />

        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" navbarScroll>
            <Nav.Link as={Link} href="/">Home</Nav.Link>
            <Nav.Link as={Link} href="/about">About</Nav.Link>

            {/* Dropdown Menu */}
            <NavDropdown title="Categories" id="navbarScrollingDropdown">
              <NavDropdown.Item as={Link} href="/products">All Products</NavDropdown.Item>
              <NavDropdown.Item as={Link} href="/tables">Tables</NavDropdown.Item>
              <NavDropdown.Item as={Link} href="/chairs">Chairs</NavDropdown.Item>
              <NavDropdown.Item as={Link} href="/crockery">Crockery</NavDropdown.Item>
              <NavDropdown.Item as={Link} href="/tableware">Tableware</NavDropdown.Item>
            </NavDropdown>
          </Nav>

          {/* Wishlist Icon with Badge */}
          <Link href="/Wish" className="relative cursor-pointer ml-4">
            <FaHeart size={24} className="text-red-500" />
            {wishlistItems.length > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-2">
                {wishlistItems.length}
              </span>
            )}
          </Link>

          {/* Cart Icon with Badge (Redirect to Cart Page) */}
          <Link href="/Cart" className="relative cursor-pointer ml-4">
            <FaShoppingCart size={24} />
            {cartItems.length > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-2">
                {cartItems.length}
              </span>
            )}
          </Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
