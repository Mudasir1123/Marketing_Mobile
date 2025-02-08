import Link from "next/link";
import { Card, Button, Image } from "react-bootstrap";
import { useCart } from "./CartContext";
import { useWishlist } from "./WishlistContext"; // ✅ Import Wishlist Context
import Swal from "sweetalert2"; // ✅ Import SweetAlert2 for alerts

interface ProductCardProps {
  id: string;
  name: string;
  price: number | string;
  image: string;
  stock: number;
  customWidth: number;
  customHeight: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  image,
  stock,
  customWidth,
  customHeight,
}) => {
  const cartContext = useCart(); 
  const wishlistContext = useWishlist();

  const cart = cartContext?.cart || []; // ✅ Ensure cart is always an array
  const wishlist = wishlistContext?.wishlistItems || []; // ✅ Ensure wishlist is always an array
  const addToCart = cartContext?.addToCart || (() => {}); // ✅ Prevent errors if undefined
  const addToWishlist = wishlistContext?.addToWishlist || (() => {}); // ✅ Prevent errors if undefined

  // ✅ Ensure cart exists before checking `.some()`
  const isAlreadyInCart = cart.some((item) => item.id === id);
  const isAlreadyInWishlist = wishlist.some((item) => item.id === id); // ✅ Check wishlist

  // ✅ Show Alert Function
  const showAlert = (title: string, text: string, icon: "success" | "error" | "warning") => {
    Swal.fire({
      title,
      text,
      icon,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "OK",
    });
  };

  // ✅ Handle Add to Cart
  const handleAddToCart = () => {
    if (isAlreadyInCart) {
      showAlert("Already in Cart", "This item is already in your cart!", "warning");
      return;
    }
    addToCart({ id, name, price: Number(price), image, stock, customWidth, customHeight });
    showAlert("Added to Cart", `"${name}" has been added to your cart.`, "success");
  };

  // ✅ Handle Add to Wishlist (Prevent Duplicates)
  const handleAddToWishlist = () => {
    if (isAlreadyInWishlist) {
      showAlert("Already in Wishlist", "This item is already in your wishlist!", "warning");
      return;
    }
    addToWishlist({ id, name, price: Number(price), image, stock, customWidth, customHeight });
    showAlert("Added to Wishlist", `"${name}" has been added to your wishlist.`, "success");
  };

  return (
    <Card className="mb-4 shadow-lg rounded-lg overflow-hidden">
      <Link href={`/detail/${id}`} className="block">
        <div className="w-full h-64 flex items-center justify-center bg-gray-200">
          <Image
            src={image}
            alt={name}
            width={250}
            height={250}
            className="object-cover w-full h-full"
          />
        </div>
      </Link>
      <Card.Body className="p-4">
        <Card.Title className="text-lg font-semibold">{name}</Card.Title>
        <Card.Text className="text-gray-700">Rs: {Number(price).toFixed(2)}</Card.Text>
        <Card.Text className={`font-medium ${stock > 0 ? "text-green-600" : "text-red-600"}`}>
          {stock > 0 ? "In Stock" : "Out of Stock"}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
