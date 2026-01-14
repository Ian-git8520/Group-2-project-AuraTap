#!/usr/bin/env python3

from flask import Flask
from models import db, Customer, Staff, Table, Menu, Order, OrderItem, Payment, Finance

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///restaurant.db'  # Adjust as needed
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

def seed_database():
    with app.app_context():
        # Clear existing data
        Finance.query.delete()
        Payment.query.delete()
        OrderItem.query.delete()
        Order.query.delete()
        Menu.query.delete()
        Table.query.delete()
        Staff.query.delete()
        Customer.query.delete()

        # Create customers
        customers = [
            Customer(username="njeri_wanjiku"),
            Customer(username="koinange_mwangi"),
            Customer(username="amina_ali"),
            Customer(username="simon_chege"),
            Customer(username="grace_nyambura")
        ]
        db.session.add_all(customers)
        db.session.commit()

        # Create staff
        staff_members = [
            Staff(staff_name="Wanjiku Njoroge", role="waiter"),
            Staff(staff_name="Jomo Kiprop", role="chef"),
            Staff(staff_name="Fatuma Hassan", role="manager")
        ]
        db.session.add_all(staff_members)
        db.session.commit()

        # Create tables
        tables = [
            Table(status="available"),
            Table(status="occupied"),
            Table(status="reserved"),
            Table(status="available"),
            Table(status="occupied"),
            Table(status="available"),
            Table(status="reserved"),
            Table(status="available"),
            Table(status="occupied"),
            Table(status="available")
        ]
        db.session.add_all(tables)
        db.session.commit()

        # Create menu items
        menu_items = [
            Menu(meal_name="Ugali na Nyama", price=15.99, description="Maize meal served with grilled meat and vegetables"),
            Menu(meal_name="Chapati na Kuku", price=12.99, description="Flatbread served with spiced chicken curry"),
            Menu(meal_name="Sukuma Wiki", price=8.99, description="Sautéed collard greens with tomatoes and onions"),
            Menu(meal_name="Mandazi", price=4.99, description="Sweet fried dough, perfect with tea"),
            Menu(meal_name="Pilau", price=14.99, description="Spiced rice dish with meat, carrots, and peas"),
            Menu(meal_name="Samusa", price=6.99, description="Crispy pastries filled with spiced potatoes and peas"),
            Menu(meal_name="Nyama Choma", price=18.99, description="Grilled goat meat served with kachumbari"),
            Menu(meal_name="Matoke", price=11.99, description="Steamed plantains cooked with spices"),
            Menu(meal_name="Kachumbari", price=7.99, description="Fresh tomato and onion salad with cilantro"),
            Menu(meal_name="Mahamri", price=5.99, description="Cardamom-flavored sweet bread")
        ]
        db.session.add_all(menu_items)
        db.session.commit()

        # Create orders
        orders = [
            Order(customer_id=1, staff_id=1, table_id=2, status="completed"),
            Order(customer_id=2, staff_id=2, table_id=5, status="preparing"),
            Order(customer_id=3, staff_id=1, table_id=8, status="served"),
            Order(customer_id=4, staff_id=3, table_id=3, status="pending"),
            Order(customer_id=5, staff_id=1, table_id=9, status="completed")
        ]
        db.session.add_all(orders)
        db.session.commit()

        # Create order items
        order_items = [
            OrderItem(order_id=1, meal_id=1, quantity=2),
            OrderItem(order_id=1, meal_id=3, quantity=1),
            OrderItem(order_id=2, meal_id=2, quantity=1),
            OrderItem(order_id=2, meal_id=6, quantity=1),
            OrderItem(order_id=3, meal_id=4, quantity=1),
            OrderItem(order_id=3, meal_id=7, quantity=1),
            OrderItem(order_id=4, meal_id=5, quantity=1),
            OrderItem(order_id=4, meal_id=9, quantity=2),
            OrderItem(order_id=5, meal_id=8, quantity=1),
            OrderItem(order_id=5, meal_id=10, quantity=1)
        ]
        db.session.add_all(order_items)
        db.session.commit()

        # Create payments
        payments = [
            Payment(order_id=1, total_amount=40.97, payment_method="card", status="completed"),
            Payment(order_id=2, total_amount=31.98, payment_method="cash", status="completed"),
            Payment(order_id=3, total_amount=11.98, payment_method="mobile_money", status="pending"),
            Payment(order_id=4, total_amount=30.97, payment_method="credit", status="pending"),
            Payment(order_id=5, total_amount=17.98, payment_method="card", status="completed")
        ]
        db.session.add_all(payments)
        db.session.commit()

        # Create finances
        finances = [
            Finance(payment_id=1, total_income=40.97),
            Finance(payment_id=2, total_income=31.98),
            Finance(payment_id=3, total_income=11.98),
            Finance(payment_id=4, total_income=30.97),
            Finance(payment_id=5, total_income=17.98)
        ]
        db.session.add_all(finances)
        db.session.commit()

        print("Database seeded successfully!")

if __name__ == "__main__":
    seed_database()