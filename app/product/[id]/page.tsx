"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useCartStore } from "@/store/useCartStore";
import { FaShoppingCart } from "react-icons/fa";
import Navbar from "@/components/Navbar";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  category: {
    name: string;
  };
}

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart, cartItems } = useCartStore();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `https://api.escuelajs.co/api/v1/products/${id}`
        );
        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product details:", error);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading)
    return (
      <p className="text-center text-gray-500 mt-10">
        Loading product details...
      </p>
    );

  if (!product)
    return <p className="text-center text-red-500 mt-10">Product not found.</p>;

  const isAdded = cartItems.some((item) => item.id === product.id);

  return (
    <div className="w-full min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-6xl mx-auto p-6 md:p-12 flex flex-col items-center">
        <div className="w-full bg-white shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row">
          <div className="md:w-1/2 p-6 flex justify-center">
            <img
              src={product.images[0]}
              alt={product.title}
              className="w-full max-w-md rounded-lg shadow-md"
            />
          </div>

          <div className="md:w-1/2 p-6 flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                {product.title}
              </h1>
              <p className="text-gray-500 text-lg mt-2">
                {product.description}
              </p>

              <div className="mt-4">
                <p className="text-xl font-semibold text-green-600">
                  Price: ${product.price}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Category: {product.category.name}
                </p>
              </div>
            </div>

            <button
              onClick={() =>
                addToCart({
                  id: product.id,
                  title: product.title,
                  price: product.price,
                  images: product.images,
                  quantity: 1,
                })
              }
              className={`mt-6 w-full flex justify-center items-center gap-2 py-3 text-lg font-semibold rounded-md transition 
              ${
                isAdded
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600 text-white"
              }`}
              disabled={isAdded}
            >
              {isAdded ? (
                "Added to Cart ✔"
              ) : (
                <>
                  <FaShoppingCart size={20} />
                  Add to Cart
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
