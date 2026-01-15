# Deployment Guide

## Deploying to Production

### Backend Deployment (Heroku Example)

1. Create `Procfile`:
```
web: gunicorn app:app
```

2. Add production dependencies to `requirements.txt`:
```
gunicorn==20.1.0
python-dotenv==0.20.0
```

3. Deploy to Heroku:
```bash
heroku create your-app-name
heroku config:set FLASK_ENV=production
git push heroku main
```

### Frontend Deployment (Vercel Example)

1. Update API URL in `.env`:
```
REACT_APP_API_URL=https://your-backend.herokuapp.com
```

2. Deploy to Vercel:
```bash
npm install -g vercel
vercel
```

### Environment Variables

Create `.env` files in both frontend and backend:

**Backend .env:**
```
FLASK_ENV=production
DATABASE_URL=sqlite:///restaurant.db
```

**Frontend .env:**
```
REACT_APP_API_URL=https://your-api-url.com
