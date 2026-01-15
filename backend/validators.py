"""
Input validation utilities for AuraTap API
"""
from functools import wraps
from flask import request, jsonify


def validate_required_fields(required_fields):
    """Decorator to validate required fields in request JSON"""
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            data = request.get_json()
            if not data:
                return {'error': 'Request body is required'}, 400
            
            missing_fields = [field for field in required_fields if field not in data]
            if missing_fields:
                return {
                    'error': f'Missing required fields: {", ".join(missing_fields)}'
                }, 400
            
            return func(*args, **kwargs)
        return wrapper
    return decorator


def validate_email(email):
    """Validate email format"""
    import re
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None


def validate_price(price):
    """Validate price is a positive number"""
    try:
        price_float = float(price)
        return price_float > 0
    except (ValueError, TypeError):
        return False


def validate_rating(rating):
    """Validate rating is between 1 and 5"""
    try:
        rating_int = int(rating)
        return 1 <= rating_int <= 5
    except (ValueError, TypeError):
        return False


def validate_phone_number(phone):
    """Validate phone number format (Kenyan format)"""
    import re
    # Supports formats: 0712345678, +254712345678, 254712345678
    pattern = r'^(\+?254|0)[17]\d{8}$'
    return re.match(pattern, str(phone)) is not None
