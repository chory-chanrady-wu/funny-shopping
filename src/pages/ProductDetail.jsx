import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Star, Check } from "lucide-react";
import { useCart } from "../context/CartContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import toast from "react-hot-toast";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRelatedLoading, setIsRelatedLoading] = useState(false);
  const [error, setError] = useState(null);
  const { cartItems, addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        let url;
        let isNormalized = false;

        if (id.startsWith("dummy-")) {
          url = `https://dummyjson.com/products/${id.replace("dummy-", "")}`;
          isNormalized = true;
        } else {
          url = `https://fakestoreapi.com/products/${id}`;
        }

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        let data = await response.json();

        // Normalize data if it's from a different API
        if (isNormalized) {
          if (id.startsWith("dummy-")) {
            data = {
              ...data,
              id: `dummy-${data.id}`,
              image: data.thumbnail,
              rating: { rate: data.rating, count: data.stock || 0 },
            };
          }
        }

        setProduct(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (product) {
      const fetchRelatedProducts = async () => {
        try {
          setIsRelatedLoading(true);
          let relatedUrl;
          // Determine which API to use for related products
          if (product.id.toString().startsWith("dummy-")) {
            relatedUrl = `https://dummyjson.com/products/category/${product.category}`;
          } else {
            relatedUrl = `https://fakestoreapi.com/products/category/${product.category}`;
          }

          const response = await fetch(relatedUrl);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          let data = await response.json();
          // The dummyjson API returns products in a 'products' object
          let related = data.products || data;

          // Normalize dummyjson related products
          if (product.id.toString().startsWith("dummy-")) {
            related = related.map((p) => ({
              ...p,
              id: `dummy-${p.id}`,
              image: p.thumbnail,
              rating: { rate: p.rating, count: p.stock || 0 },
            }));
          }

          // Filter out the current product and limit to 4 related products
          related = related.filter((p) => p.id !== product.id).slice(0, 4);
          setRelatedProducts(related);
        } catch (e) {
          console.error("Failed to fetch related products:", e);
        } finally {
          setIsRelatedLoading(false);
        }
      };

      fetchRelatedProducts();
    }
  }, [product]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <p className="text-2xl text-gray-500">Loading product details...</p>
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

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <p className="text-2xl text-gray-500">Product not found.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen pt-24">
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 p-8 flex items-center justify-center bg-white">
              <img
                src={product.image}
                alt={product.title}
                className="max-h-96 object-contain"
              />
            </div>
            <div className="md:w-1/2 p-8 flex flex-col justify-center">
              <h1 className="text-3xl font-bold text-blue-900 mb-2">
                {product.title}
              </h1>
              <p className="text-gray-500 text-sm mb-4 capitalize">
                {product.category}
              </p>
              <p className="text-gray-700 mb-4">{product.description}</p>
              <div className="flex items-center mb-4">
                <div className="flex items-center text-yellow-500">
                  <Star size={20} fill="currentColor" />
                  <span className="text-gray-700 font-bold ml-2">
                    {product.rating.rate}
                  </span>
                </div>
                <span className="text-gray-500 ml-2">
                  ({product.rating.count} reviews)
                </span>
              </div>
              <p className="text-4xl font-extrabold text-blue-800 mb-6">
                ${product.price.toFixed(2)}
              </p>
              <div className="flex space-x-4 ">
                {cartItems.some((item) => item.id === product.id) ? (
                  <button
                    disabled
                    className="flex-1 bg-green-500 text-white py-3 rounded-md font-semibold flex items-center justify-center gap-2 cursor-not-allowed"
                  >
                    <Check size={20} /> Added to Cart
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      if (isAuthenticated) {
                        addToCart(product);
                      } else {
                        toast.error("Please log in to add items to your cart.");
                        navigate("/login");
                      }
                    }}
                    className="flex-1 bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors font-semibold"
                  >
                    Add to Cart
                  </button>
                )}
                <Link
                  to="/"
                  className="flex-1 text-center bg-gray-200 text-gray-800 py-3 rounded-md hover:bg-gray-300 transition-colors font-semibold"
                >
                  Go Back
                </Link>
              </div>
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-blue-900 mb-6">
              Related Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  to={`/products/${relatedProduct.id}`}
                  key={relatedProduct.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col transform hover:scale-105 transition-transform duration-300"
                >
                  <div className="h-48 w-full flex items-center justify-center p-4">
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.title}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-md font-semibold text-gray-800 truncate flex-grow">
                      {relatedProduct.title}
                    </h3>
                    <p className="text-xl font-bold text-blue-800 mt-2">
                      ${relatedProduct.price.toFixed(2)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetail;
