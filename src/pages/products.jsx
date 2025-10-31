import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { Check } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";
import toast from "react-hot-toast";

function Product() {
  const [products, setProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { cartItems, addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("default");
  const [filterCategory, setFilterCategory] = useState("all");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const [res1, res2] = await Promise.all([
          fetch("https://fakestoreapi.com/products"),
          fetch("https://dummyjson.com/products"),
        ]);

        if (!res1.ok)
          throw new Error(`Fake Store API error! status: ${res1.status}`);
        if (!res2.ok)
          throw new Error(`DummyJSON API error! status: ${res2.status}`);

        const fakeStoreProducts = await res1.json();
        const dummyJSONProducts = (await res2.json()).products;

        // Normalize data from the new APIs
        const normalizedDummyJSONProducts = dummyJSONProducts.map((p) => ({
          id: `dummy-${p.id}`,
          title: p.title,
          price: p.price,
          description: p.description,
          category: p.category,
          image: p.thumbnail,
          rating: { rate: p.rating, count: p.stock || 0 }, // Using stock for count as an example
        }));

        // Combine and shuffle all products
        const combinedProducts = [
          ...fakeStoreProducts,
          ...normalizedDummyJSONProducts,
        ];
        combinedProducts.sort(() => Math.random() - 0.5);

        setProducts(combinedProducts);

        // Extract unique categories for the filter dropdown
        const uniqueCategories = [
          ...new Set(combinedProducts.map((p) => p.category)),
        ];
        setCategories(uniqueCategories.sort());
      } catch (e) {
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let processedProducts = [...products];

    // 1. Filter by category
    if (filterCategory !== "all") {
      processedProducts = processedProducts.filter(
        (p) => p.category === filterCategory
      );
    }

    // 2. Filter by search term
    if (searchTerm) {
      processedProducts = processedProducts.filter((p) =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 3. Sort
    if (sortOrder === "price-asc") {
      processedProducts.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "price-desc") {
      processedProducts.sort((a, b) => b.price - a.price);
    } else if (sortOrder === "name-asc") {
      processedProducts.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOrder === "name-desc") {
      processedProducts.sort((a, b) => b.title.localeCompare(a.title));
    }

    setDisplayedProducts(processedProducts);
  }, [products, searchTerm, sortOrder, filterCategory]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <p className="text-2xl text-gray-500">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <p className="text-2xl text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen pt-20">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center text-blue-900 mb-12">
          Our Products
        </h1>

        {/* Controls: Search, Filter, Sort */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 p-4 bg-white rounded-lg shadow-md">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category} className="capitalize">
                {category}
              </option>
            ))}
          </select>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="default">Sort by</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Name: A to Z</option>
            <option value="name-desc">Name: Z to A</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {displayedProducts.length > 0 ? (
            displayedProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-white rounded-lg shadow-md overflow-hidden flex flex-col transform transition-all duration-300 hover:shadow-xl hover:scale-105"
              >
                <div className="p-4 flex flex-col flex-grow">
                  <Link to={`/products/${product.id}`} className="flex-grow">
                    <div className="h-64 w-full flex items-center justify-center p-4">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <div className="relative h-12 flex overflow-x-hidden mt-2">
                      <h2 className="absolute whitespace-nowrap text-lg font-semibold text-gray-800 animate-marquee group-hover:[animation-play-state:paused]">
                        {product.title}
                      </h2>
                    </div>
                  </Link>
                  <div className="mt-auto">
                    <p className="text-2xl font-bold text-blue-800 my-2">
                      ${product.price.toFixed(2)}
                    </p>
                    {cartItems.some((item) => item.id === product.id) ? (
                      <button
                        disabled
                        className="w-full bg-green-500 text-white py-2 rounded-md flex items-center justify-center gap-2 cursor-not-allowed"
                      >
                        <Check size={18} /> Added
                      </button>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent navigating to product detail
                          if (isAuthenticated) {
                            addToCart(product);
                          } else {
                            toast.error(
                              "Please log in to add items to your cart."
                            );
                            navigate("/login");
                          }
                        }}
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-800 transition-colors"
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500 text-lg">
              No products found matching your criteria.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Product;
