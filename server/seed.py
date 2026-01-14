from app import app
from models import (
    db,
    Customer,
    Staff,
    Table,
    Menu,
    Order,
    OrderItem,
    Payment
    
)
from datetime import datetime
from decimal import Decimal


def seed_data():
    with app.app_context():

        print("Clearing existing data...")

        
        Payment.query.delete()
        OrderItem.query.delete()
        Order.query.delete()
        Menu.query.delete()
        Table.query.delete()
        Staff.query.delete()
        Customer.query.delete()

        db.session.commit()

        print("Database cleared")

       
        customers = [
            Customer(username="Ali Hassan"),
            Customer(username="Fatuma Noor"),
            Customer(username="Abdirahman Ahmed")
        ]

        db.session.add_all(customers)
        db.session.commit()

        
        staff_members = [
            Staff(staff_name="John Waiter", role="waiter"),
            Staff(staff_name="Mary Chef", role="chef"),
            Staff(staff_name="Ahmed Manager", role="manager")
        ]

        db.session.add_all(staff_members)
        db.session.commit()

        
        tables = [
            Table(status="available"),
            Table(status="occupied"),
            Table(status="reserved")
        ]

        db.session.add_all(tables)
        db.session.commit()

       
        menu_items = [
            Menu(
                meal_name="Chicken Biryani",
                price=Decimal("850.00"),
                description="Spicy rice with chicken"
            ),
            Menu(
                meal_name="Beef Burger",
                price=Decimal("600.00"),
                description="Grilled beef burger with fries"
            ),
            Menu(
                meal_name="Vegetable Pizza",
                price=Decimal("900.00"),
                description="Pizza topped with fresh vegetables"
            )
        ]

        db.session.add_all(menu_items)
        db.session.commit()

       
        order1 = Order(
            customer_id=customers[0].id,
            staff_id=staff_members[0].id,
            table_id=tables[1].id,
            status="preparing",
            created_at=datetime.utcnow()
        )

        db.session.add(order1)
        db.session.commit()

       
        order_items = [
            OrderItem(
                order_id=order1.id,
                meal_id=menu_items[0].id,
                quantity=2
            ),
            OrderItem(
                order_id=order1.id,
                meal_id=menu_items[1].id,
                quantity=1
            )
        ]

        db.session.add_all(order_items)
        db.session.commit()

        
        payment = Payment(
            order_id=order1.id,
            total_amount=Decimal("2300.00"),
            payment_method="cash",
            status="completed",
            created_at=datetime.utcnow()
        )

        db.session.add(payment)
        db.session.commit()

       
       

        print(" Seeding completed successfully!")


if __name__ == "__main__":
    seed_data()
