"use client";
import { IoMdClose } from "react-icons/io";
import { FaPlus, FaMinus } from "react-icons/fa";
import { useCartStore } from "../store/useCartStore";
import { useRouter } from "next/navigation";

const CartSidebar = () => {
  const {
    cartItems,
    isCartOpen,
    toggleCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCartStore();
  const router = useRouter();

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transition-transform duration-300 ${
        isCartOpen ? "translate-x-0" : "translate-x-full"
      } z-50`}
    >
      <div className="flex justify-between items-center p-4 border-b border-gray-400 ">
        <h2 className="text-lg font-semibold">Cart</h2>
        <button
          onClick={toggleCart}
          className="text-red-500 text-lg cursor-pointer "
        >
          <IoMdClose />
        </button>
      </div>

      <div className="p-4 flex flex-col gap-4 max-h-[65vh] overflow-y-auto">
        {cartItems.length === 0 ? (
          <p className="text-gray-500 text-center">No items in cart</p>
        ) : (
          cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 border-b border-gray-400 py-2"
            >
              <img
                src={item.images[0]}
                alt={item.title}
                className="w-14 h-14 object-cover rounded-md"
              />
              <div className="flex-1">
                <h3 className="text-sm font-medium">{item.title}</h3>
                <p className="text-gray-600">${item.price}</p>

                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    className="px-2 py-1 bg-red-500 text-white rounded-md cursor-pointer"
                  >
                    <FaMinus />
                  </button>
                  <span className="text-sm">{item.quantity}</span>
                  <button
                    onClick={() => increaseQuantity(item.id)}
                    className="px-2 py-1 bg-green-500 text-white rounded-md cursor-pointer"
                  >
                    <FaPlus />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {cartItems.length > 0 && (
        <div className="p-4 border-t">
          <div className="flex justify-between font-semibold text-lg mb-3">
            <span>Total:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <button
            onClick={() => {
              toggleCart();
              router.push("/orders");
            }}
            className="w-full py-3 bg-green-500 text-white font-semibold rounded-md transition hover:bg-green-600 cursor-pointer"
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default CartSidebar;
