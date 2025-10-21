"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";

function Cart() {
  // Sample cart items (replace with real data or fetch from context/state)
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Product A", price: 25, qty: 5 },
    { id: 2, name: "Product B", price: 40, qty: 5 },
    { id: 3, name: "Product C", price: 15, qty: 5 },
  ]);

  // Remove item from cart
  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  // Calculate total
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <section id="cart" className="py-20 min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Your Cart</h1>

        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        ) : (
          <>
            <ul className="space-y-4">
              {cartItems.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between items-center pb-2"
                >
                  <span>{item.name}</span>
                  <span>${item.price}</span>
                  <span>{item.qty}</span>
                  <span>${item.price * item.qty}</span>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={20} />
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex justify-between items-center text-xl font-semibold">
              <span>Total:</span>
              <span>${totalPrice}</span>
            </div>

            <button className="mt-6 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
              Checkout
            </button>
          </>
        )}
      </div>
    </section>
  );
}

export default Cart;
