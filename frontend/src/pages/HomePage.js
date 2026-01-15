import { Link } from "react-router-dom"
import { FiArrowRight } from "react-icons/fi"
import "./HomePage.css"

function HomePage() {
  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-content">
          <h1>Experience Culinary Excellence</h1>
          <p>From the finest ingredients to your table. Order now and taste the difference.</p>
          <Link to="/login" className="cta-button">
            Start Ordering <FiArrowRight />
          </Link>
        </div>
        <div className="hero-image">
          <div className="featured-dish">
            <div className="dish-placeholder">
              <span>🍽️</span>
            </div>
            <h3>Chef's Special</h3>
            <p>Premium Grilled Salmon with seasonal vegetables</p>
          </div>
        </div>
      </section>

      <section className="features">
        <h2>Why Choose Us?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🚀</div>
            <h3>Quick Service</h3>
            <p>Fast and efficient ordering and delivery right to your table</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>Quality Food</h3>
            <p>Fresh ingredients and expert preparation in every dish</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💳</div>
            <h3>Easy Payment</h3>
            <p>Multiple payment methods including M-Pesa, Card, and Wallet</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⭐</div>
            <h3>Great Reviews</h3>
            <p>Rated 4.8/5 by our satisfied customers</p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2>Ready to Order?</h2>
        <p>Join us for a memorable dining experience</p>
        <Link to="/login" className="cta-button-secondary">
          Get Started
        </Link>
      </section>
    </div>
  )
}

export default HomePage
