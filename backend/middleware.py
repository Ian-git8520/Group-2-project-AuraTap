"""
Middleware functions for request processing
"""
from flask import request, jsonify
from functools import wraps
import time


def log_request_middleware(logger):
    """Middleware to log all incoming requests"""
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            start_time = time.time()
            logger.info(f"Request: {request.method} {request.path} from {request.remote_addr}")
            
            result = func(*args, **kwargs)
            
            duration = time.time() - start_time
            logger.info(f"Response: {request.method} {request.path} - {duration:.3f}s")
            
            return result
        return wrapper
    return decorator


def validate_json_middleware(func):
    """Middleware to validate JSON content type"""
    @wraps(func)
    def wrapper(*args, **kwargs):
        if request.method in ['POST', 'PUT', 'PATCH']:
            if not request.is_json:
                return jsonify({
                    'error': 'Content-Type must be application/json'
                }), 415
        return func(*args, **kwargs)
    return wrapper


def rate_limit_middleware(max_requests=100, window=60):
    """
    Simple rate limiting middleware
    
    Args:
        max_requests: Maximum requests allowed
        window: Time window in seconds
    """
    request_history = {}
    
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            client_ip = request.remote_addr
            current_time = time.time()
            
            # Clean old requests
            if client_ip in request_history:
                request_history[client_ip] = [
                    req_time for req_time in request_history[client_ip]
                    if current_time - req_time < window
                ]
            else:
                request_history[client_ip] = []
            
            # Check rate limit
            if len(request_history[client_ip]) >= max_requests:
                return jsonify({
                    'error': 'Rate limit exceeded',
                    'message': f'Maximum {max_requests} requests per {window} seconds'
                }), 429
            
            # Add current request
            request_history[client_ip].append(current_time)
            
            return func(*args, **kwargs)
        return wrapper
    return decorator


def cors_headers_middleware(func):
    """Add CORS headers to response"""
    @wraps(func)
    def wrapper(*args, **kwargs):
        response = func(*args, **kwargs)
        
        if isinstance(response, tuple):
            data, status_code = response
            return data, status_code, {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization'
            }
        
        return response
    return wrapper
