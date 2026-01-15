"use client"
import { Link, useNavigate } from "react-router-dom"
import { FiTrash2, FiArrowRight } from "react-icons/fi"
import "./CartPage.css"

function CartPage({ cart, onRemoveFromCart, onUpdateQuantity }) {
  const navigate = useNavigate()

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-container">
          <div className="empty-cart">
            <span className="empty-icon">🛒</span>
            <h2>Your cart is empty</h2>
            <p>Add items from the menu to get started</p>
            <Link to="/menu" className="continue-btn">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        <h1>Your Cart</h1>

        <div className="cart-layout">
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="item-image">
                  <img
                    src={item.image_url || "/placeholder.svg"}
                    alt={item.name}
                    onError={(e) => (e.target.src = "/placeholder.svg")}
                  />
                </div>
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p className="price">${item.price.toFixed(2)} each</p>
                </div>
                <div className="item-quantity">
                  <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>−</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>+</button>
                </div>
                <div className="item-subtotal">${(item.price * item.quantity).toFixed(2)}</div>
                <button className="remove-btn" onClick={() => onRemoveFromCart(item.id)} title="Remove from cart">
                  <FiTrash2 />
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Order Summary</h2>
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Tax (10%):</span>
              <span>${(total * 0.1).toFixed(2)}</span>
            </div>
            <div className="summary-row total">
              <span>Total:</span>
              <span>${(total * 1.1).toFixed(2)}</span>
            </div>
            <button className="checkout-btn" onClick={() => navigate("/payment")}>
              Proceed to Payment <FiArrowRight />
            </button>
            <Link to="/menu" className="continue-shopping">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage
