"use client";
import { IoIosCart } from "react-icons/io";
import { UserButton, useUser } from "@clerk/nextjs";
import { FiMenu, FiX } from "react-icons/fi";
import { useState } from "react";
import NavLink from "./Navlink";
import { useCartStore } from "../store/useCartStore";

const Navbar = () => {
  const { user } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { toggleCart, totalItems } = useCartStore();

  return (
    <nav className="py-5 border-b-2 border-green-400 bg-gradient-to-r from-green-400 to-green-200 relative">
      <div className="flex justify-between items-center mx-6 md:mx-10">
        <div className="flex items-center gap-5">
          <span className="font-semibold text-xl">Shopi</span>

          <div className="hidden md:flex gap-4">
            <NavLink href="/" label="All" />
            <NavLink href="/clothes" label="Clothes" />
            <NavLink href="/electronics" label="Electronics" />
            <NavLink href="/furniture" label="Furniture" />
            <NavLink href="/toys" label="Toys" />
          </div>
        </div>

        <div className="flex gap-4 items-center">
          {user && (
            <>
              <NavLink href="/orders" label="My Orders" />

              <button
                onClick={toggleCart}
                className="relative text-green-700 hover:text-green-900 focus:outline-none"
              >
                <IoIosCart size={28} />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                    {totalItems}
                  </span>
                )}
              </button>
            </>
          )}

          <div className="hidden md:flex">
            {user ? (
              <UserButton fallback="/" />
            ) : (
              <NavLink href="/sign-in" label="Login" />
            )}
          </div>

          <button
            className="md:hidden text-2xl focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden flex flex-col bg-green-100 shadow-md absolute w-full left-0 top-16 z-50 p-5">
          <NavLink href="/" label="All" />
          <NavLink href="/clothes" label="Clothes" />
          <NavLink href="/electronics" label="Electronics" />
          <NavLink href="/furniture" label="Furniture" />
          <NavLink href="/toys" label="Toys" />

          {user && (
            <>
              <NavLink href="/orders" label="My Orders" />
            </>
          )}

          <div className="mt-4 border-t pt-4">
            {user ? (
              <UserButton fallback="/" />
            ) : (
              <NavLink href="/sign-in" label="Login" />
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
