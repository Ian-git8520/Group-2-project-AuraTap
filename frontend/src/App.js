"use client"

import { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import MenuPage from "./pages/MenuPage"
import CartPage from "./pages/CartPage"
import PaymentPage from "./pages/PaymentPage"
import OrderTrackingPage from "./pages/OrderTrackingPage"
import FeedbackPage from "./pages/FeedbackPage"
import Navbar from "./components/Navbar"
import "./App.css"

function App() {
  const [customer, setCustomer] = useState(null)
  const [cart, setCart] = useState([])
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const savedCustomer = localStorage.getItem("customer")
    const savedCart = localStorage.getItem("cart")
    if (savedCustomer) setCustomer(JSON.parse(savedCustomer))
    if (savedCart) setCart(JSON.parse(savedCart))
  }, [])

  useEffect(() => {
    localStorage.setItem("customer", JSON.stringify(customer))
  }, [customer])

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  const handleLogin = (customerData) => {
    setCustomer(customerData)
  }

  const handleLogout = () => {
    setCustomer(null)
    setCart([])
  }

  const addToCart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id)
    if (existingItem) {
      setCart(
        cart.map((cartItem) => (cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem)),
      )
    } else {
      setCart([...cart, { ...item, quantity: 1 }])
    }
  }

  const removeFromCart = (itemId) => {
    setCart(cart.filter((item) => item.id !== itemId))
  }

  const updateCartQuantity = (itemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(itemId)
    } else {
      setCart(cart.map((item) => (item.id === itemId ? { ...item, quantity } : item)))
    }
  }

  return (
    <Router>
      <Toaster position="top-right" />
      <Navbar customer={customer} onLogout={handleLogout} cartCount={cart.length} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/menu" element={customer ? <MenuPage cart={cart} onAddToCart={addToCart} /> : <HomePage />} />
        <Route
          path="/cart"
          element={
            customer ? (
              <CartPage cart={cart} onRemoveFromCart={removeFromCart} onUpdateQuantity={updateCartQuantity} />
            ) : (
              <HomePage />
            )
          }
        />
        <Route
          path="/payment"
          element={
            customer ? (
              <PaymentPage
                customer={customer}
                cart={cart}
                onPaymentSuccess={(order) => setOrders([...orders, order])}
                onClearCart={() => setCart([])}
              />
            ) : (
              <HomePage />
            )
          }
        />
        <Route path="/orders" element={customer ? <OrderTrackingPage orders={orders} /> : <HomePage />} />
        <Route path="/feedback/:orderId" element={customer ? <FeedbackPage /> : <HomePage />} />
      </Routes>
    </Router>
  )
}

export default App
