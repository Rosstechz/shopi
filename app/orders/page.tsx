"use client";
import { useCartStore } from "@/store/useCartStore";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Orders = () => {
  const { cartItems, placeOrder } = useCartStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleMockCheckout = () => {
    setIsProcessing(true);

    setTimeout(() => {
      placeOrder();
      router.push("/order-success");
    }, 2000);
  };

  if (cartItems.length === 0) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        <img
          src="/empty-cart.png"
          alt="Empty Cart"
          className="mb-6 w-48 h-auto object-contain"
        />
        <h1 className="text-2xl font-bold text-gray-800">Your cart is empty</h1>
        <button
          onClick={() => router.push("/")}
          className="mt-6 px-6 py-3 bg-green-500 text-white font-semibold rounded-md transition hover:bg-green-600"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-100 flex flex-col items-center px-4 py-10">
      <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Checkout
        </h1>

        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b pb-3"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="w-16 h-16 rounded-md object-cover"
                />
                <div>
                  <h3 className="text-gray-800 font-medium">{item.title}</h3>
                  <p className="text-sm text-gray-500">x{item.quantity}</p>
                </div>
              </div>
              <span className="text-gray-700 font-semibold">
                ${(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center font-semibold text-lg mt-6 border-t pt-4">
          <span>Total:</span>
          <span className="text-green-600">${totalPrice.toFixed(2)}</span>
        </div>

        <button
          onClick={handleMockCheckout}
          disabled={isProcessing}
          className={`mt-6 w-full py-3 text-white font-semibold rounded-md transition ${
            isProcessing
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {isProcessing ? "Processing..." : "Place Order"}
        </button>
      </div>
    </div>
  );
};

export default Orders;
