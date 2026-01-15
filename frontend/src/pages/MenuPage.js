"use client"

import { useEffect, useState } from "react"
import { FiPlus, FiMinus } from "react-icons/fi"
import axios from "axios"
import toast from "react-hot-toast"
import "./MenuPage.css"

const API_URL = "http://localhost:5000"

function MenuPage({ cart, onAddToCart }) {
  const [menuItems, setMenuItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState("All")

  useEffect(() => {
    fetchMenuItems()
  }, [])

  const fetchMenuItems = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${API_URL}/menu`)
      setMenuItems(response.data)
    } catch (error) {
      console.error("Error fetching menu:", error)
      toast.error("Failed to load menu")
    } finally {
      setLoading(false)
    }
  }

  const categories = ["All", ...new Set(menuItems.map((item) => item.category))]
  const filteredItems =
    selectedCategory === "All" ? menuItems : menuItems.filter((item) => item.category === selectedCategory)

  const getCartItemCount = (itemId) => {
    const item = cart.find((c) => c.id === itemId)
    return item ? item.quantity : 0
  }

  if (loading) {
    return (
      <div className="menu-page">
        <div className="loading">Loading menu...</div>
      </div>
    )
  }

  return (
    <div className="menu-page">
      <div className="menu-container">
        <h1>Our Menu</h1>

        <div className="category-filter">
          {categories.map((category) => (
            <button
              key={category}
              className={`category-btn ${selectedCategory === category ? "active" : ""}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="menu-grid">
          {filteredItems.map((item) => (
            <div key={item.id} className="menu-card">
              <div className="card-image">
                <img
                  src={item.image_url || "/placeholder.svg"}
                  alt={item.name}
                  onError={(e) => (e.target.src = "/public/placeholder-logo.svg")}
                />
              </div>
              <div className="card-content">
                <h3>{item.name}</h3>
                <p className="description">{item.description}</p>
                <div className="card-footer">
                  <span className="price">${item.price.toFixed(2)}</span>
                  <div className="quantity-control">
                    {getCartItemCount(item.id) > 0 ? (
                      <div className="quantity-display">
                        <button className="qty-btn" onClick={() => onAddToCart({ ...item, quantity: -1 })}>
                          <FiMinus />
                        </button>
                        <span>{getCartItemCount(item.id)}</span>
                        <button className="qty-btn" onClick={() => onAddToCart(item)}>
                          <FiPlus />
                        </button>
                      </div>
                    ) : (
                      <button className="add-btn" onClick={() => onAddToCart(item)}>
                        <FiPlus /> Add
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MenuPage
