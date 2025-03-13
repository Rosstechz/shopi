"use client";
import { FaSearch } from "react-icons/fa";
import { useProductStore } from "../store/useProductStore";

const Searchbar = () => {
  const { searchTerm, setSearchTerm } = useProductStore();

  return (
    <div className="flex justify-center mt-4">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex items-center w-full max-w-lg bg-green-100 border border-gray-300 rounded-full px-4 py-2 shadow-md"
      >
        <input
          type="text"
          placeholder="Search for products..."
          className="w-full px-3 py-2 outline-none text-gray-800 placeholder:text-gray-700"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <button type="submit" className="text-green-500 hover:text-green-700">
          <FaSearch size={18} className="cursor-pointer" />
        </button>
      </form>
    </div>
  );
};

export default Searchbar;
