"use client";
import { useCartStore } from "@/store/useCartStore";
import { useRouter } from "next/navigation";

const OrderSuccess = () => {
  const { lastOrder } = useCartStore();
  const router = useRouter();

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-green-600">
        🎉 Order Placed Successfully!
      </h1>
      <p className="text-lg text-gray-600 mt-2">
        Thank you for shopping with us!
      </p>

      <div className="w-full max-w-3xl bg-white p-6 mt-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Order Summary
        </h2>
        {lastOrder ? (
          <div className="space-y-4">
            {lastOrder.map((item) => (
              <div key={item.id} className="flex justify-between border-b pb-2">
                <span>
                  {item.title} (x{item.quantity})
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No recent orders found.</p>
        )}
      </div>

      <button
        onClick={() => router.push("/")}
        className="mt-6 px-6 py-3 bg-green-500 text-white font-semibold rounded-md transition hover:bg-green-600"
      >
        Continue Shopping
      </button>
    </div>
  );
};

export default OrderSuccess;
