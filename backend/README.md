# AuraTap Backend API

Restaurant management system backend built with Flask and SQLAlchemy.

## Features

- Customer management
- Table reservation and status tracking
- Menu item management
- Order processing
- Payment handling (M-Pesa, Card, Cash, Wallet)
- Feedback system
- Staff management

## Tech Stack

- **Framework**: Flask
- **Database**: SQLite (Development) / PostgreSQL (Production)
- **ORM**: SQLAlchemy
- **API**: Flask-RESTful
- **CORS**: Flask-CORS

## Setup

1. Install dependencies:
   ```bash
   pipenv install
   ```

2. Configure environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. Run the application:
   ```bash
   pipenv run python app.py
   ```

## Project Structure

```
backend/
├── app.py              # Main application file
├── constants.py        # Application constants
├── validators.py       # Input validation utilities
├── error_handlers.py   # Error handling middleware
├── db_utils.py         # Database helper functions
├── logger.py           # Logging configuration
├── seed_data.py        # Database seeding script
├── API_DOCS.md         # API documentation
└── test_validators.py  # Unit tests
```

## Running Tests

```bash
pipenv run python -m pytest test_validators.py
```

## API Documentation

See [API_DOCS.md](API_DOCS.md) for complete API documentation.

## Database Models

- **Customer**: User accounts
- **Table**: Restaurant tables
- **MenuItem**: Menu items
- **Order**: Customer orders
- **OrderItem**: Individual items in orders
- **Payment**: Payment transactions
- **Feedback**: Customer feedback
- **Staff**: Staff members
