from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_restful import Api, Resource
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from flask_migrate import Migrate
from flask import send_from_directory
import os
from dotenv import load_dotenv


load_dotenv()

app = Flask(__name__)


app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///restaurant.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'dev-secret-key')
app.config['DEBUG'] = os.getenv('FLASK_ENV', 'development') == 'development'

db = SQLAlchemy(app)
migrate = Migrate(app, db)
api = Api(app)
CORS(app, origins=os.getenv('CORS_ORIGINS', '*').split(','))






class Customer(db.Model):
    __tablename__ = 'customers'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), nullable=False, unique=True)
    table_id = db.Column(db.Integer, db.ForeignKey('tables.id'))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    table = db.relationship('Table', back_populates='customers')
    orders = db.relationship('Order', back_populates='customer', cascade='all, delete-orphan')
    
    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'table_id': self.table_id,
            'created_at': self.created_at.isoformat()
        }

class Table(db.Model):
    __tablename__ = 'tables'
    id = db.Column(db.Integer, primary_key=True)
    table_number = db.Column(db.Integer, nullable=False, unique=True)
    capacity = db.Column(db.Integer, default=4)
    status = db.Column(db.String(20), default='available')  # available, occupied
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    customers = db.relationship('Customer', back_populates='table', cascade='all, delete-orphan')
    orders = db.relationship('Order', back_populates='table', cascade='all, delete-orphan')
    
    def to_dict(self):
        return {
            'id': self.id,
            'table_number': self.table_number,
            'capacity': self.capacity,
            'status': self.status,
            'created_at': self.created_at.isoformat()
        }

class MenuItem(db.Model):
    __tablename__ = 'menu_items'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    price = db.Column(db.Float, nullable=False)
    image_url = db.Column(db.String(255))
    category = db.Column(db.String(50))
    available = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    order_items = db.relationship('OrderItem', back_populates='menu_item', cascade='all, delete-orphan')
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'price': self.price,
            'image_url': self.image_url,
            'category': self.category,
            'available': self.available,
            'created_at': self.created_at.isoformat()
        }

class Order(db.Model):
    __tablename__ = 'orders'
    id = db.Column(db.Integer, primary_key=True)
    customer_id = db.Column(db.Integer, db.ForeignKey('customers.id'), nullable=False)
    table_id = db.Column(db.Integer, db.ForeignKey('tables.id'), nullable=False)
    total_amount = db.Column(db.Float, default=0)
    status = db.Column(db.String(20), default='pending')  # pending, preparing, ready, served
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    customer = db.relationship('Customer', back_populates='orders')
    table = db.relationship('Table', back_populates='orders')
    items = db.relationship('OrderItem', back_populates='order', cascade='all, delete-orphan')
    payment = db.relationship('Payment', back_populates='order', uselist=False, cascade='all, delete-orphan')
    feedback = db.relationship('Feedback', back_populates='order', uselist=False, cascade='all, delete-orphan')
    
    def to_dict(self):
        return {
            'id': self.id,
            'customer_id': self.customer_id,
            'table_id': self.table_id,
            'total_amount': self.total_amount,
            'status': self.status,
            'created_at': self.created_at.isoformat(),
            'items': [item.to_dict() for item in self.items]
        }

class OrderItem(db.Model):
    __tablename__ = 'order_items'
    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey('orders.id'), nullable=False)
    menu_item_id = db.Column(db.Integer, db.ForeignKey('menu_items.id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    unit_price = db.Column(db.Float, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    order = db.relationship('Order', back_populates='items')
    menu_item = db.relationship('MenuItem', back_populates='order_items')
    
    def to_dict(self):
        return {
            'id': self.id,
            'order_id': self.order_id,
            'menu_item_id': self.menu_item_id,
            'menu_item_name': self.menu_item.name,
            'quantity': self.quantity,
            'unit_price': self.unit_price,
            'subtotal': self.quantity * self.unit_price,
            'created_at': self.created_at.isoformat()
        }

class Payment(db.Model):
    __tablename__ = 'payments'
    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey('orders.id'), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    method = db.Column(db.String(50), nullable=False)  # mpesa, card, wallet, cash
    status = db.Column(db.String(20), default='pending')  # pending, completed, failed
    transaction_id = db.Column(db.String(100))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    order = db.relationship('Order', back_populates='payment')
    
    def to_dict(self):
        return {
            'id': self.id,
            'order_id': self.order_id,
            'amount': self.amount,
            'method': self.method,
            'status': self.status,
            'transaction_id': self.transaction_id,
            'created_at': self.created_at.isoformat()
        }

class Feedback(db.Model):
    __tablename__ = 'feedbacks'
    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey('orders.id'), nullable=False)
    rating = db.Column(db.Integer)  # 1-5 stars
    comment = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    order = db.relationship('Order', back_populates='feedback')
    
    def to_dict(self):
        return {
            'id': self.id,
            'order_id': self.order_id,
            'rating': self.rating,
            'comment': self.comment,
            'created_at': self.created_at.isoformat()
        }

class Staff(db.Model):
    __tablename__ = 'staff'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    role = db.Column(db.String(50))  # waiter, chef, manager
    email = db.Column(db.String(100), unique=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'role': self.role,
            'email': self.email,
            'created_at': self.created_at.isoformat()
        }


class HomeResource(Resource):
    def get(self):
        return {
            'message': 'Welcome to Restaurant Ordering System API',
            'version': '1.0'
        }

class CustomerListResource(Resource):
    def get(self):
        customers = Customer.query.all()
        return [customer.to_dict() for customer in customers], 200
    
    def post(self):
        data = request.get_json()
        if not data or not data.get('username'):
            return {'error': 'Username is required'}, 400
        
        if Customer.query.filter_by(username=data['username']).first():
            return {'error': 'Username already exists'}, 400
        
        table_id = data.get('table_id')
        if table_id:
            table = Table.query.get(table_id)
            if not table:
                return {'error': 'Table not found'}, 404
            table.status = 'occupied'
        
        customer = Customer(username=data['username'], table_id=table_id)
        db.session.add(customer)
        db.session.commit()
        return customer.to_dict(), 201

class StaffListResource(Resource):
    def get(self):
        staff = Staff.query.all()
        return [s.to_dict() for s in staff], 200
    
    def post(self):
        data = request.get_json()
        staff = Staff(name=data.get('name'), role=data.get('role'), email=data.get('email'))
        db.session.add(staff)
        db.session.commit()
        return staff.to_dict(), 201

class TableListResource(Resource):
    def get(self):
        tables = Table.query.all()
        return [table.to_dict() for table in tables], 200
    
    def post(self):
        data = request.get_json()
        table = Table(table_number=data.get('table_number'), capacity=data.get('capacity', 4))
        db.session.add(table)
        db.session.commit()
        return table.to_dict(), 201

class TableResource(Resource):
    def get(self, table_id):
        table = Table.query.get(table_id)
        if not table:
            return {'error': 'Table not found'}, 404
        return table.to_dict(), 200
    
    def put(self, table_id):
        table = Table.query.get(table_id)
        if not table:
            return {'error': 'Table not found'}, 404
        
        data = request.get_json()
        if 'status' in data:
            table.status = data['status']
        db.session.commit()
        return table.to_dict(), 200

class MenuListResource(Resource):
    def get(self):
        items = MenuItem.query.all()
        return [item.to_dict() for item in items], 200
    
    def post(self):
        data = request.get_json()
        item = MenuItem(
            name=data.get('name'),
            description=data.get('description'),
            price=data.get('price'),
            image_url=data.get('image_url'),
            category=data.get('category')
        )
        db.session.add(item)
        db.session.commit()
        return item.to_dict(), 201

class OrderListResource(Resource):
    def get(self):
        orders = Order.query.all()
        return [order.to_dict() for order in orders], 200
    
    def post(self):
        data = request.get_json()
        customer_id = data.get('customer_id')
        table_id = data.get('table_id')
        items = data.get('items', [])
        
        customer = Customer.query.get(customer_id)
        if not customer:
            return {'error': 'Customer not found'}, 404
        
        order = Order(customer_id=customer_id, table_id=table_id)
        total = 0
        
        for item in items:
            menu_item = MenuItem.query.get(item['menu_item_id'])
            if not menu_item:
                return {'error': f"Menu item {item['menu_item_id']} not found"}, 404
            
            order_item = OrderItem(
                menu_item_id=item['menu_item_id'],
                quantity=item['quantity'],
                unit_price=menu_item.price
            )
            order.items.append(order_item)
            total += menu_item.price * item['quantity']
        
        order.total_amount = total
        db.session.add(order)
        db.session.commit()
        return order.to_dict(), 201

class OrderResource(Resource):
    def get(self, order_id):
        order = Order.query.get(order_id)
        if not order:
            return {'error': 'Order not found'}, 404
        return order.to_dict(), 200
    
    def put(self, order_id):
        order = Order.query.get(order_id)
        if not order:
            return {'error': 'Order not found'}, 404
        
        data = request.get_json()
        if 'status' in data:
            order.status = data['status']
        db.session.commit()
        return order.to_dict(), 200

class PaymentListResource(Resource):
    def get(self):
        payments = Payment.query.all()
        return [payment.to_dict() for payment in payments], 200

class PaymentResource(Resource):
    def get(self, order_id):
        payment = Payment.query.filter_by(order_id=order_id).first()
        if not payment:
            return {'error': 'Payment not found'}, 404
        return payment.to_dict(), 200
    
    def post(self, order_id):
        order = Order.query.get(order_id)
        if not order:
            return {'error': 'Order not found'}, 404
        
        data = request.get_json()
        payment = Payment(
            order_id=order_id,
            amount=data.get('amount', order.total_amount),
            method=data.get('method'),
            status='completed',
            transaction_id=data.get('transaction_id', f'TXN_{order_id}_{datetime.utcnow().timestamp()}')
        )
        db.session.add(payment)
        order.status = 'preparing'
        db.session.commit()
        return payment.to_dict(), 201
    
    def put(self, order_id):
        payment = Payment.query.filter_by(order_id=order_id).first()
        if not payment:
            return {'error': 'Payment not found'}, 404
        
        data = request.get_json()
        if 'status' in data:
            payment.status = data['status']
        db.session.commit()
        return payment.to_dict(), 200

class FeedbackResource(Resource):
    def post(self):
        data = request.get_json()
        order_id = data.get('order_id')
        
        order = Order.query.get(order_id)
        if not order:
            return {'error': 'Order not found'}, 404
        
        feedback = Feedback(
            order_id=order_id,
            rating=data.get('rating'),
            comment=data.get('comment')
        )
        db.session.add(feedback)
        db.session.commit()
        return feedback.to_dict(), 201



api.add_resource(HomeResource, "/")
api.add_resource(CustomerListResource, "/customers")
api.add_resource(StaffListResource, "/staff")
api.add_resource(TableListResource, "/tables")
api.add_resource(TableResource, "/tables/<int:table_id>")
api.add_resource(MenuListResource, "/menu")
api.add_resource(OrderListResource, "/orders")
api.add_resource(OrderResource, "/orders/<int:order_id>")
api.add_resource(PaymentListResource, "/payments")
api.add_resource(PaymentResource, "/payments/<int:order_id>")
api.add_resource(FeedbackResource, "/feedbacks")


@app.route('/images/<filename>')
def get_image(filename):
    return send_from_directory(os.path.join(os.path.dirname(__file__), 'images'), filename)
                               
if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True, port=5000)
