"""
Centralized error handling for AuraTap API
"""
from flask import jsonify
from sqlalchemy.exc import IntegrityError, SQLAlchemyError


def register_error_handlers(app):
    """Register error handlers with the Flask app"""
    
    @app.errorhandler(400)
    def bad_request(error):
        return jsonify({
            'error': 'Bad Request',
            'message': str(error)
        }), 400
    
    @app.errorhandler(404)
    def not_found(error):
        return jsonify({
            'error': 'Not Found',
            'message': 'The requested resource was not found'
        }), 404
    
    @app.errorhandler(500)
    def internal_server_error(error):
        return jsonify({
            'error': 'Internal Server Error',
            'message': 'An unexpected error occurred'
        }), 500
    
    @app.errorhandler(IntegrityError)
    def handle_integrity_error(error):
        return jsonify({
            'error': 'Database Integrity Error',
            'message': 'The operation violates database constraints. Possible duplicate entry.'
        }), 409
    
    @app.errorhandler(SQLAlchemyError)
    def handle_sqlalchemy_error(error):
        return jsonify({
            'error': 'Database Error',
            'message': 'A database error occurred'
        }), 500
    
    @app.errorhandler(ValueError)
    def handle_value_error(error):
        return jsonify({
            'error': 'Invalid Value',
            'message': str(error)
        }), 400
