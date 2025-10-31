import { useCart } from "../context/CartContext.jsx";
import { Link } from "react-router-dom";
import { Plus, Minus, Trash2 } from "lucide-react";

function Cart() {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 pt-20">
        <h1 className="text-4xl font-bold text-blue-900 mb-4">
          Your Cart is Empty
        </h1>
        <p className="text-gray-600 mb-8">
          Looks like you haven't added anything to your cart yet.
        </p>
        <Link
          to="/"
          className="bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors font-semibold"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen pt-24">
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 ">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-blue-900">
            Your Shopping Cart
          </h1>
          <button
            onClick={() => {
              if (window.confirm("Are you sure you want to clear the cart?")) {
                clearCart();
              }
            }}
            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors font-semibold flex items-center gap-2"
          >
            <Trash2 size={18} /> Clear Cart
          </button>
        </div>
        <div className="bg-white rounded-lg shadow-md">
          <ul className="divide-y divide-gray-200">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="p-4 sm:p-6 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-24 h-24 object-contain rounded-md"
                />
                <div className="flex-1 sm:ml-6 text-center sm:text-left">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {item.title}
                  </h2>
                  <p className="text-gray-600">${item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border border-gray-300 rounded-md">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-2 text-gray-600 hover:bg-gray-100"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="px-4 font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-2 text-gray-600 hover:bg-gray-100"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 text-red-500 hover:bg-red-100 rounded-md"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="p-6 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <p className="text-xl font-semibold text-gray-800">Subtotal</p>
              <p className="text-2xl font-bold text-blue-800">
                ${subtotal.toFixed(2)}
              </p>
            </div>
            <button className="w-full mt-6 bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors font-semibold">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
