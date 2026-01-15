"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import "./OrderTrackingPage.css"

const API_URL = "http://localhost:5000"

function OrderTrackingPage({ orders: initialOrders }) {
  const navigate = useNavigate()
  const [orders, setOrders] = useState(initialOrders)
  const [loading, setLoading] = useState(true)
  const customer = JSON.parse(localStorage.getItem("customer"))

  useEffect(() => {
    fetchOrders()
    const interval = setInterval(fetchOrders, 3000) // Poll every 3 seconds
    return () => clearInterval(interval)
  }, [])

  const fetchOrders = async () => {
    try {
      if (customer) {
        const response = await axios.get(`${API_URL}/orders`)
        const customerOrders = response.data.filter((order) => order.customer_id === customer.id)
        setOrders(customerOrders)
      }
    } catch (error) {
      console.error("Error fetching orders:", error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "#f39c12"
      case "preparing":
        return "#3498db"
      case "ready":
        return "#27ae60"
      case "served":
        return "#2ecc71"
      default:
        return "#95a5a6"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return "⏳"
      case "preparing":
        return "👨‍🍳"
      case "ready":
        return "✅"
      case "served":
        return "🎉"
      default:
        return "📦"
    }
  }

  if (loading) {
    return (
      <div className="order-tracking-page">
        <div className="loading">Loading your orders...</div>
      </div>
    )
  }

  return (
    <div className="order-tracking-page">
      <div className="tracking-container">
        <h1>Your Orders</h1>

        {orders.length === 0 ? (
          <div className="no-orders">
            <span className="empty-icon">📭</span>
            <h2>No orders yet</h2>
            <p>Start ordering to track your meals</p>
            <button onClick={() => navigate("/menu")} className="menu-btn">
              Go to Menu
            </button>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <div key={order.id} className="order-card">
                <div className="order-header">
                  <div className="order-info">
                    <h3>Order #{order.id}</h3>
                    <p className="order-date">{new Date(order.created_at).toLocaleString()}</p>
                  </div>
                  <div className="order-status" style={{ borderColor: getStatusColor(order.status) }}>
                    <span style={{ color: getStatusColor(order.status) }}>
                      {getStatusIcon(order.status)} {order.status.toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="order-items">
                  <h4>Items:</h4>
                  {order.items.map((item) => (
                    <div key={item.id} className="item-row">
                      <span>
                        {item.menu_item_name} x {item.quantity}
                      </span>
                      <span className="item-price">${item.subtotal.toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="order-footer">
                  <div className="total">
                    <span>Total:</span>
                    <span className="price">${order.total_amount.toFixed(2)}</span>
                  </div>
                  <button
                    onClick={() => navigate(`/feedback/${order.id}`)}
                    className="feedback-btn"
                    disabled={order.status !== "served"}
                    title={order.status !== "served" ? "Available after order is served" : "Give feedback"}
                  >
                    ⭐ Leave Feedback
                  </button>
                </div>

                <div className="status-timeline">
                  <div
                    className={`timeline-step ${["pending", "preparing", "ready", "served"].indexOf(order.status) >= 0 ? "active" : ""}`}
                  >
                    <span>Pending</span>
                  </div>
                  <div
                    className={`timeline-step ${["preparing", "ready", "served"].indexOf(order.status) >= 0 ? "active" : ""}`}
                  >
                    <span>Preparing</span>
                  </div>
                  <div className={`timeline-step ${["ready", "served"].indexOf(order.status) >= 0 ? "active" : ""}`}>
                    <span>Ready</span>
                  </div>
                  <div className={`timeline-step ${order.status === "served" ? "active" : ""}`}>
                    <span>Served</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default OrderTrackingPage
