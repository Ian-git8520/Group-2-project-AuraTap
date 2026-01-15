# Restaurant Ordering App - Project Structure

## Overview
This is a combined full-stack project with clearly separated frontend and backend folders.

```
restaurant-ordering-app/
├── frontend/                    # React Frontend Application
│   ├── public/
│   │   ├── index.html
│   │   └── manifest.json
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   └── Navbar.css
│   │   ├── pages/
│   │   │   ├── HomePage.js
│   │   │   ├── LoginPage.js
│   │   │   ├── MenuPage.js
│   │   │   ├── CartPage.js
│   │   │   ├── PaymentPage.js
│   │   │   ├── OrderTrackingPage.js
│   │   │   └── FeedbackPage.js
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   ├── package.json
│   ├── run.sh                   # Unix startup script
│   └── run.bat                  # Windows startup script
│
├── backend/                     # Flask Backend Application
│   ├── app.py                   # Flask app with all API endpoints
│   ├── seed_data.py            # Database seeding script
│   ├── requirements.txt         # Python dependencies
│   ├── run.sh                   # Unix startup script
│   └── run.bat                  # Windows startup script
│
├── README.md                    # Main project documentation
├── QUICK_START.md              # Quick setup guide
├── DEPLOYMENT.md               # Deployment instructions
├── PROJECT_SUMMARY.md          # Project details and learning objectives
└── PROJECT_STRUCTURE.md        # This file

## Folder Separation

### Frontend (React)
- **Location**: `./frontend/`
- **Port**: http://localhost:3000
- **Technology**: React.js, Axios, CSS3
- **Start**: `npm start` (inside frontend folder)

### Backend (Flask)
- **Location**: `./backend/`
- **Port**: http://localhost:5000
- **Technology**: Flask, SQLAlchemy, SQLite
- **Start**: `python app.py` (inside backend folder)

## Quick Start

### 1. Start Backend
```bash
cd backend
python -m venv venv
# Windows: venv\Scripts\activate
# Mac/Linux: source venv/bin/activate
pip install -r requirements.txt
python seed_data.py
python app.py
```

The backend runs on **http://localhost:5000**

### 2. Start Frontend (in a new terminal)
```bash
cd frontend
npm install
npm start
```

The frontend runs on **http://localhost:3000**

## API Communication

The frontend communicates with the backend using these endpoints:

- `GET /` - Home/health check
- `GET /customers` - Get all customers
- `POST /customers` - Create new customer
- `GET /tables` - Get all tables
- `GET /menu` - Get menu items
- `POST /orders` - Create order
- `GET /orders/<id>` - Get order details
- `POST /payments` - Process payment
- `POST /feedbacks` - Submit feedback

## Database

- **Type**: SQLite
- **Location**: `backend/restaurant.db` (auto-created)
- **Tables**: 
  - customers
  - tables
  - menu_items
  - orders
  - order_items
  - payments
  - feedback

## File Descriptions

### Frontend Files
| File | Purpose |
|------|---------|
| `App.js` | Main app routing and state management |
| `LoginPage.js` | Customer login with name and table selection |
| `MenuPage.js` | Display menu items with descriptions |
| `CartPage.js` | Shopping cart with add/remove items |
| `PaymentPage.js` | Payment processing with multiple methods |
| `OrderTrackingPage.js` | Track order status in real-time |
| `FeedbackPage.js` | Rate and comment on completed orders |

### Backend Files
| File | Purpose |
|------|---------|
| `app.py` | Flask app with all API resources and routes |
| `seed_data.py` | Initialize database with sample data |
| `requirements.txt` | Python package dependencies |

## No Mixed Files

- **Next.js files** (app/, components/, hooks/, lib/, etc.) are NOT used
- **This is a React + Flask project**, not Next.js
- Frontend is pure React.js with axios for API calls
- Backend is pure Flask with SQLAlchemy ORM

## Important Notes

1. **Keep them separate**: Always run backend and frontend in separate terminals
2. **Backend first**: Start backend before frontend to avoid connection errors
3. **Ports matter**: Frontend talks to backend on `http://localhost:5000`
4. **Database**: Backend creates SQLite database automatically
5. **CORS enabled**: Backend allows frontend requests from localhost:3000

---

For detailed setup instructions, see [QUICK_START.md](./QUICK_START.md)
For deployment guide, see [DEPLOYMENT.md](./DEPLOYMENT.md)
