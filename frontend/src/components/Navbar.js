"use client"

import React from "react"
import { Link } from "react-router-dom"
import { FiShoppingCart, FiLogOut, FiMenu } from "react-icons/fi"
import "./Navbar.css"

function Navbar({ customer, onLogout, cartCount }) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-text">AURATAP</span>
        </Link>

        <button className="mobile-menu-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <FiMenu size={24} />
        </button>

        <div className={`nav-menu ${mobileMenuOpen ? "active" : ""}`}>
          {customer && (
            <>
              <div className="nav-item">
                <span className="customer-name">Welcome, {customer.username}</span>
              </div>
              <Link to="/menu" className="nav-item">
                Menu
              </Link>
              <Link to="/cart" className="nav-item cart-link">
                <FiShoppingCart size={20} />
                {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
              </Link>
              <Link to="/orders" className="nav-item">
                Orders
              </Link>
              <button
                className="nav-item logout-btn"
                onClick={() => {
                  onLogout()
                  setMobileMenuOpen(false)
                }}
              >
                <FiLogOut size={20} /> Logout
              </button>
            </>
          )}
          {!customer && (
            <Link to="/login" className="nav-item login-btn">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
