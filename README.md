# AURATAP Restaurant Ordering System

A full-stack restaurant ordering application built with React and Flask, featuring menu browsing, order management, payments, and customer feedback.

## Features

- **Customer Registration**: Enter username and table number to start ordering
- **Menu Browsing**: Browse dishes by category with images and descriptions
- **Shopping Cart**: Add/remove items and manage quantities
- **Multiple Payment Methods**: Support for M-Pesa, Card, Wallet, and Cash
- **Order Tracking**: Real-time order status updates (pending → preparing → ready → served)
- **Feedback System**: Rate meals and leave comments after order completion
- **Responsive Design**: Works on desktop and mobile devices


## Database Schema

### Models (with relationships):

**Customer** (One-to-Many with Orders, Many-to-One with Table)
- id, username, table_id, created_at

**Table** (One-to-Many with Customers and Orders)
- id, table_number, capacity, status, created_at

**MenuItem** (One-to-Many with OrderItems)
- id, name, description, price, image_url, category, available, created_at

**Order** (Many-to-One with Customer/Table, One-to-Many with OrderItems/Payment/Feedback)
- id, customer_id, table_id, total_amount, status, created_at

**OrderItem** (Many-to-Many association with extra attribute 'quantity')
- id, order_id, menu_item_id, quantity, unit_price, created_at

**Payment** (One-to-One with Order)
- id, order_id, amount, method, status, transaction_id, created_at

**Feedback** (One-to-One with Order)
- id, order_id, rating, comment, created_at

**Staff** (Standalone)
- id, name, role, email, created_at


## Setup Instructions

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Create virtual environment:**
   ```bash
   python -m venv venv
   source venv/bin/activate  
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Initialize database with sample data:**
   ```bash
   python seed_data.py
   ```

5. **Run Flask server:**
   ```bash
   python app.py
   ```
   The API will be available at `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm start
   ```
   The application will open at `http://localhost:3000`

## Usage

1. **Start the app** - Navigate to the home page
2. **Login** - Enter your name and select a table
3. **Browse Menu** - Filter by category and view dishes
4. **Add to Cart** - Select quantity and add items
5. **View Cart** - Review items and adjust quantities
6. **Payment** - Choose payment method and complete transaction
7. **Track Order** - Monitor real-time order status
8. **Leave Feedback** - Rate and comment on your experience

## Validation Features

- Username validation (2-50 characters, unique)
- Phone number format validation for M-Pesa (must start with 254)
- Card number validation (16 digits for card payments)
- CVV validation (3 digits)
- Comment length validation (max 500 characters)
- Rating validation (1-5 stars)

## Technologies Used

### Backend
- **Flask**: Web framework
- **Flask-RESTful**: REST API extension
- **Flask-SQLAlchemy**: ORM and database management
- **Flask-CORS**: Cross-origin resource sharing
- **SQLite**: Database

### Frontend
- **React**: UI library
- **React Router**: Client-side routing
- **Formik**: Form management
- **Yup**: Form validation
- **Axios**: HTTP client
- **React Hot Toast**: Notifications
- **React Icons**: Icon library
- **CSS3**: Styling

## Payment Methods

### Mock Payment System
All payment methods are simulated for demo purposes:
- **M-Pesa**: Phone number (254XXXXXXXXX)
- **Card**: 16-digit card number with CVV
- **Wallet**: Direct debit
- **Cash**: Pay at counter

## Future Enhancements

- Real payment gateway integration (M-Pesa API, Stripe)
- Admin dashboard for staff
- Order history and analytics
- Notification system (SMS/Email)
- User authentication and accounts
- Menu management interface
- Kitchen management system
- Receipt printing
- Loyalty rewards program

## Troubleshooting

**CORS errors:** Ensure Flask is running on port 5000
**Database errors:** Delete `restaurant.db` and run `seed_data.py` again
**API errors:** Check that backend server is running
**Port conflicts:** Change the port in `app.py` or frontend env variables

## License

This project is created as a learning exercise for full-stack web development.

## OWNERS
- ABIUD      -RUTH
- IAN        -ABDIRAHMAN
- FAITH      -CASTRO
