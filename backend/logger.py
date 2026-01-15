"""
Logging configuration for AuraTap API
"""
import logging
import os
from logging.handlers import RotatingFileHandler
from datetime import datetime


def setup_logger(app):
    """
    Configure logging for the Flask application
    
    Args:
        app: Flask application instance
    """
    # Create logs directory if it doesn't exist
    if not os.path.exists('logs'):
        os.mkdir('logs')
    
    # Set up file handler with rotation
    file_handler = RotatingFileHandler(
        'logs/auratap.log',
        maxBytes=10240000,  # 10MB
        backupCount=10
    )
    
    # Set log format
    formatter = logging.Formatter(
        '[%(asctime)s] %(levelname)s in %(module)s: %(message)s'
    )
    file_handler.setFormatter(formatter)
    
    # Set log level based on environment
    if app.config.get('DEBUG'):
        file_handler.setLevel(logging.DEBUG)
        app.logger.setLevel(logging.DEBUG)
    else:
        file_handler.setLevel(logging.INFO)
        app.logger.setLevel(logging.INFO)
    
    # Add handler to app logger
    app.logger.addHandler(file_handler)
    
    # Log startup
    app.logger.info('AuraTap API startup')
    
    return app.logger


def log_request(logger, request):
    """Log incoming request details"""
    logger.info(f'{request.method} {request.path} - {request.remote_addr}')


def log_error(logger, error, context=''):
    """Log error with context"""
    logger.error(f'{context}: {str(error)}', exc_info=True)


def log_database_operation(logger, operation, model, success=True):
    """Log database operations"""
    status = 'SUCCESS' if success else 'FAILED'
    logger.info(f'DB {operation} on {model}: {status}')
