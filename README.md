# AuraTap

AuraTap is a comprehensive restaurant ordering system that enables customers to place meal orders directly from their tables using QR codes. The system provides a seamless experience for managing customers, staff, tables, menus, orders, and payments through a RESTful API backend.

## Live Demo

Frontend Application: [https://v0-addmealstomenu.vercel.app/](https://v0-addmealstomenu.vercel.app/)

## Features

- **Customer Management**: Create and manage customer profiles
- **Staff Management**: Handle restaurant staff with role assignments
- **Table Management**: Track table availability and status (available, occupied, reserved)
- **Menu Management**: Maintain restaurant menu with meal details, pricing, and images
- **Order Processing**: Create and manage customer orders with multiple items
- **Order Status Tracking**: Monitor order progress (pending, preparing, served, completed, cancelled)
- **Payment Processing**: Handle payments with multiple methods (cash, card, mobile money, credit)
- **Real-time Updates**: RESTful API for seamless integration with frontend applications

## Tech Stack

- **Backend**: Python Flask
- **Database**: SQLite with SQLAlchemy ORM
- **Migrations**: Flask-Migrate (Alembic)
- **Serialization**: SQLAlchemy-Serializer
- **Dependency Management**: Pipenv

## Installation

### Prerequisites

- Python 3.12 or higher
- Pipenv

### Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd Group-2-project-AuraTap
   ```

2. Install dependencies:
   ```bash
   pipenv install
   ```

3. Activate the virtual environment:
   ```bash
   pipenv shell
   ```

4. Set up the database:
   ```bash
   flask db upgrade
   ```

5. (Optional) Seed the database with initial data:
   ```bash
   python server/seed.py
   ```

## Usage

### Running the Application

Start the Flask development server:
```bash
python server/app.py
```

The API will be available at `http://localhost:5000`

### API Endpoints

#### Customers
- `GET /customers` - Retrieve all customers
- `POST /customers` - Create a new customer
  ```json
  {
    "username": "customer_name"
  }
  ```

#### Staff
- `GET /staff` - Retrieve all staff members
- `POST /staff` - Create a new staff member
  ```json
  {
    "staff_name": "staff_name",
    "role": "waiter"
  }
  ```

#### Tables
- `GET /tables` - Retrieve all tables
- `PATCH /tables/<id>` - Update table status
  ```json
  {
    "status": "occupied"
  }
  ```

#### Menu
- `GET /menu` - Retrieve all menu items
- `POST /menu` - Create a new menu item
  ```json
  {
    "meal_name": "Burger",
    "image_url": "https://example.com/burger.jpg",
    "price": 15.99,
    "description": "Delicious beef burger"
  }
  ```

#### Orders
- `POST /orders` - Create a new order
  ```json
  {
    "customer_id": 1,
    "staff_id": 2,
    "table_id": 3,
    "items": [
      {
        "meal_id": 1,
        "quantity": 2
      }
    ]
  }
  ```
- `GET /orders/<id>` - Retrieve a specific order
- `PATCH /orders/<id>` - Update order status
  ```json
  {
    "status": "preparing"
  }
  ```

#### Payments
- `POST /payments` - Process a payment
  ```json
  {
    "order_id": 1,
    "total_amount": 31.98,
    "payment_method": "card"
  }
  ```
- `GET /payments/<order_id>` - Retrieve payment for an order

## Database Models

- **Customer**: User profiles with order history
- **Staff**: Restaurant employees with roles
- **Table**: Restaurant tables with availability status
- **Menu**: Food items with pricing and descriptions
- **Order**: Customer orders with status tracking
- **OrderItem**: Individual items within orders
- **Payment**: Payment records with multiple methods

## Project Structure

```
server/
├── app.py              # Main Flask application
├── models.py           # Database models
├── seed.py             # Database seeding script
├── instance/
│   └── app.db          # SQLite database
└── migrations/         # Database migration files
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests (if available)
5. Submit a pull request

## License

This project is licensed under the MIT License.
