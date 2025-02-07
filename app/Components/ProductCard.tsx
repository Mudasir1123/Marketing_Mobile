"use client";

import Link from 'next/link';
import { Card, Button, Image } from 'react-bootstrap';
import { useCart } from './CartContext'; // Import Cart Context

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
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
  const { addToCart } = useCart(); // Get addToCart function from context

  return (
    <Card style={{ width: '18rem' }} className="mb-4">
      <Link href={`/detail/${id}`}>
        <Image
          src={image}
          alt={name}
          width={300}
          height={300}
          className="card-img-top"
        />
      </Link>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>${price}</Card.Text>
        <Card.Text>{stock > 0 ? 'In Stock' : 'Out of Stock'}</Card.Text>
        <Button
          variant="primary"
          disabled={stock === 0}
          onClick={() =>
            addToCart({ id, name, price, image, stock, customWidth, customHeight })
          }
        >
          Add to Cart
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
