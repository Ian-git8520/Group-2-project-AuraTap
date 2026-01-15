# AuraTap API Documentation

## Base URL
```
http://localhost:5000
```

## Authentication
Currently, the API does not require authentication (to be implemented).

---

## Endpoints

### Home
**GET** `/`
- Description: Health check endpoint
- Response: `{ "message": "Welcome to AuraTap Restaurant Management API" }`

---

### Customers

#### Get All Customers
**GET** `/customers`
- Description: Retrieve all customers
- Response: Array of customer objects

#### Create Customer
**POST** `/customers`
- Description: Create a new customer
- Request Body:
  ```json
  {
    "username": "string (required)"
  }
  ```
- Response: Created customer object (201)

---

### Tables

#### Get All Tables
**GET** `/tables`
- Description: Retrieve all tables
- Response: Array of table objects

#### Create Table
**POST** `/tables`
- Description: Create a new table
- Request Body:
  ```json
  {
    "table_number": "integer (required)",
    "capacity": "integer (optional, default: 4)"
  }
  ```
- Response: Created table object (201)

#### Get Table
**GET** `/tables/<table_id>`
- Description: Get specific table by ID
- Response: Table object (200) or error (404)

#### Update Table
**PUT** `/tables/<table_id>`
- Description: Update table status
- Request Body:
  ```json
  {
    "status": "available | occupied"
  }
  ```
- Response: Updated table object (200)

---

### Menu Items

#### Get All Menu Items
**GET** `/menu`
- Description: Retrieve all menu items
- Response: Array of menu item objects

#### Create Menu Item
**POST** `/menu`
- Description: Create a new menu item
- Request Body:
  ```json
  {
    "name": "string (required)",
    "description": "string (optional)",
    "price": "float (required)",
    "image_url": "string (optional)",
    "category": "string (optional)"
  }
  ```
- Response: Created menu item object (201)

---

### Orders

#### Get All Orders
**GET** `/orders`
- Description: Retrieve all orders
- Response: Array of order objects

#### Create Order
**POST** `/orders`
- Description: Create a new order
- Request Body:
  ```json
  {
    "customer_id": "integer (required)",
    "table_id": "integer (required)",
    "items": [
      {
        "menu_item_id": "integer",
        "quantity": "integer"
      }
    ]
  }
  ```
- Response: Created order object with calculated total (201)

#### Get Order
**GET** `/orders/<order_id>`
- Description: Get specific order by ID
- Response: Order object with items (200) or error (404)

#### Update Order
**PUT** `/orders/<order_id>`
- Description: Update order status
- Request Body:
  ```json
  {
    "status": "pending | preparing | ready | served"
  }
  ```
- Response: Updated order object (200)

---

### Payments

#### Get All Payments
**GET** `/payments`
- Description: Retrieve all payments
- Response: Array of payment objects

#### Get Payment
**GET** `/payments/<order_id>`
- Description: Get payment for specific order
- Response: Payment object (200) or error (404)

#### Create Payment
**POST** `/payments/<order_id>`
- Description: Process payment for an order
- Request Body:
  ```json
  {
    "method": "mpesa | card | wallet | cash (required)",
    "amount": "float (optional, defaults to order total)",
    "transaction_id": "string (optional)"
  }
  ```
- Response: Created payment object (201)

#### Update Payment
**PUT** `/payments/<order_id>`
- Description: Update payment status
- Request Body:
  ```json
  {
    "status": "pending | completed | failed"
  }
  ```
- Response: Updated payment object (200)

---

### Feedback

#### Submit Feedback
**POST** `/feedbacks`
- Description: Submit feedback for an order
- Request Body:
  ```json
  {
    "order_id": "integer (required)",
    "rating": "integer 1-5 (required)",
    "comment": "string (optional)"
  }
  ```
- Response: Created feedback object (201)

---

### Staff

#### Get All Staff
**GET** `/staff`
- Description: Retrieve all staff members
- Response: Array of staff objects

#### Create Staff
**POST** `/staff`
- Description: Create a new staff member
- Request Body:
  ```json
  {
    "name": "string (required)",
    "role": "string (required)",
    "email": "string (optional)"
  }
  ```
- Response: Created staff object (201)

---

## Error Responses

All error responses follow this format:
```json
{
  "error": "Error Type",
  "message": "Detailed error message"
}
```

### HTTP Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `404` - Not Found
- `409` - Conflict (Duplicate Entry)
- `500` - Internal Server Error
