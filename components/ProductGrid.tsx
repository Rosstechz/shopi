"use client";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { useProductStore } from "../store/useProductStore";

interface ProductProps {
  id: number;
  title: string;
  price: number;
  images: string[];
  category: {
    name: string;
  };
}

const ProductGrid = () => {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [loading, setLoading] = useState(true);
  const { searchTerm, sortOption, setSortOption } = useProductStore();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://api.escuelajs.co/api/v1/products"
        );
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  let filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (sortOption === "low-to-high") {
    filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortOption === "high-to-low") {
    filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
  }

  if (loading) {
    return (
      <p className="text-center text-gray-500 mt-10">Loading products... </p>
    );
  }

  return (
    <div className="relative flex flex-col items-center">
      <div className="flex justify-end w-full max-w-7xl px-6">
        <select
          className="p-2 border border-gray-300 rounded-md text-gray-800"
          value={sortOption}
          onChange={(e) =>
            setSortOption(
              e.target.value as "none" | "low-to-high" | "high-to-low"
            )
          }
        >
          <option value="none">Sort By</option>
          <option value="low-to-high">Price: Low to High</option>
          <option value="high-to-low">Price: High to Low</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 max-w-7xl mx-auto">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))
        ) : (
          <p className="text-gray-500 text-center mt-10">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default ProductGrid;
