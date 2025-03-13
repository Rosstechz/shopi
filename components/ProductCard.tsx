"use client";
import { FaPlus, FaCheck } from "react-icons/fa";
import { useCartStore } from "../store/useCartStore";
import Link from "next/link";

interface ProductProps {
  id: number;
  title: string;
  price: number;
  images: string[];
  category: {
    name: string;
  };
}

const ProductCard: React.FC<ProductProps> = ({
  id,
  title,
  price,
  images,
  category,
}) => {
  const { addToCart, cartItems } = useCartStore();
  const isAdded = cartItems.some((item) => item.id === id);

  return (
    <Link href={`/product/${id}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 shadow-green-300 cursor-pointer">
        <div className="relative">
          <img
            src={images[0]}
            alt={title}
            className="w-full h-56 object-cover"
          />
          <span className="absolute bottom-2 left-2 bg-green-500 text-white text-xs px-3 py-1 rounded-md">
            {category.name}
          </span>

          <button
            onClick={(e) => {
              e.preventDefault();
              addToCart({ id, title, price, images, quantity: 1 });
            }}
            className={`absolute top-2 right-2 ${
              isAdded ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"
            } text-white p-2 rounded-full shadow-lg transition`}
            disabled={isAdded}
          >
            {isAdded ? <FaCheck size={16} /> : <FaPlus size={16} />}
          </button>
        </div>

        <div className="p-4">
          <h3 className="font-light text-lg">{title}</h3>
          <p className="text-gray-600 font-semibold">${price}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
