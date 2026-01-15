"""
Database utility functions for AuraTap
"""
from datetime import datetime


def serialize_datetime(dt):
    """Convert datetime to ISO format string"""
    if dt is None:
        return None
    return dt.isoformat()


def get_or_404(model, id, error_message=None):
    """Get object by ID or return 404 error"""
    obj = model.query.get(id)
    if not obj:
        error_msg = error_message or f'{model.__name__} not found'
        return None, {'error': error_msg}, 404
    return obj, None, None


def paginate_query(query, page=1, per_page=20):
    """
    Paginate a SQLAlchemy query
    
    Args:
        query: SQLAlchemy query object
        page: Page number (default: 1)
        per_page: Items per page (default: 20)
    
    Returns:
        dict: Pagination metadata and results
    """
    pagination = query.paginate(page=page, per_page=per_page, error_out=False)
    
    return {
        'items': pagination.items,
        'total': pagination.total,
        'page': pagination.page,
        'per_page': pagination.per_page,
        'pages': pagination.pages,
        'has_next': pagination.has_next,
        'has_prev': pagination.has_prev
    }


def calculate_order_total(order_items):
    """Calculate total amount for order items"""
    total = 0
    for item in order_items:
        total += item.quantity * item.unit_price
    return round(total, 2)


def update_table_status(table, status):
    """
    Update table status with validation
    
    Args:
        table: Table object
        status: New status ('available' or 'occupied')
    
    Returns:
        bool: True if updated, False if invalid status
    """
    valid_statuses = ['available', 'occupied']
    if status not in valid_statuses:
        return False
    
    table.status = status
    return True


def update_order_status(order, status):
    """
    Update order status with validation
    
    Args:
        order: Order object
        status: New status ('pending', 'preparing', 'ready', 'served')
    
    Returns:
        bool: True if updated, False if invalid status
    """
    valid_statuses = ['pending', 'preparing', 'ready', 'served']
    if status not in valid_statuses:
        return False
    
    order.status = status
    return True


def get_daily_revenue(db, date=None):
    """
    Calculate total revenue for a specific date
    
    Args:
        db: Database instance
        date: Date to calculate revenue for (default: today)
    
    Returns:
        float: Total revenue
    """
    from models import Payment
    
    if date is None:
        date = datetime.utcnow().date()
    
    start_datetime = datetime.combine(date, datetime.min.time())
    end_datetime = datetime.combine(date, datetime.max.time())
    
    payments = Payment.query.filter(
        Payment.created_at >= start_datetime,
        Payment.created_at <= end_datetime,
        Payment.status == 'completed'
    ).all()
    
    total = sum(payment.amount for payment in payments)
    return round(total, 2)
