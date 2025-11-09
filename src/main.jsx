import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Navigation from "./components/navigation.jsx";
import Product from "./pages/products";
import Login from "./pages/login";
import Services from "./pages/services";
import Contact from "./pages/contact";
import About from "./pages/about";
import Cart from "./pages/cart";
import SignUp from "./pages/signup";
import Footer from "./components/footer"; // Assuming Footer component is in src/components/footer.jsx
import ProductDetail from "./pages/ProductDetail";
import ScrollToTop from "./components/ScrollToTop";
import Profile from "./pages/Profile.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Toaster position="top-center" />
          <Navigation />
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Product />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/services" element={<Services />} />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route path="/products/:id" element={<ProductDetail />} />
          </Routes>
          <Footer />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
