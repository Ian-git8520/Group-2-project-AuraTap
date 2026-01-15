from app import app, db, MenuItem, Table, Staff

def seed_database():
    with app.app_context():
        # Clear existing data
        db.drop_all()
        db.create_all()
        
        # Create tables
        tables = [
            Table(table_number=1, capacity=2),
            Table(table_number=2, capacity=4),
            Table(table_number=3, capacity=4),
            Table(table_number=4, capacity=6),
            Table(table_number=5, capacity=2),
        ]
        db.session.add_all(tables)
        
        # Create menu items
        menu_items = [
            MenuItem(
                name="Grilled Salmon",
                description="Fresh Atlantic salmon with lemon butter sauce",
                price=25.99,
                image_url="http://localhost:5000/images/salmon-meal.jpg",
                category="Main Course"
            ),
            MenuItem(
                name="Beef Steak",
                description="Premium tenderloin steak cooked to perfection",
                price=32.99,
                image_url="http://localhost:5000/images/beef-steak.jpg",
                category="Main Course"
            ),
            MenuItem(
                name="Pasta Carbonara",
                description="Classic Italian pasta with creamy sauce",
                price=15.99,
                image_url="http://localhost:5000/images/pasta-Carbonara.jpg",
                category="Main Course"
            ),
            MenuItem(
                name="Caesar Salad",
                description="Fresh romaine lettuce with Caesar dressing",
                price=9.99,
                image_url="http://localhost:5000/images/caesar-salad.jpg",
                category="Starter"
            ),
            MenuItem(
                name="Margherita Pizza",
                description="Traditional pizza with fresh mozzarella",
                price=18.99,
                image_url="http://localhost:5000/images/Margherita-pizza.jpg",
                category="Main Course"
            ),
            MenuItem(
                name="Chocolate Cake",
                description="Decadent chocolate cake with ganache",
                price=8.99,
                image_url="http://localhost:5000/images/chocolate-cake.jpg",
                category="Dessert"
            ),
            MenuItem(
                name="Fresh Orange Juice",
                description="Freshly squeezed orange juice",
                price=5.99,
                image_url="http://localhost:5000/images/Fresh-orange-juice.jpg",
                category="Beverage"
            ),
            MenuItem(
                name="Iced Coffee",
                description="Cold brew coffee with ice",
                price=4.99,
                image_url="http://localhost:5000/images/Iced-coffee.jpg",
                category="Beverage"
            ),
        ]
        db.session.add_all(menu_items)
        
        # Create staff
        staff = [
            Staff(name="Jacob Jele", role="Waiter", email="jacob@restaurant.com"),
            Staff(name="Jane Opondo", role="Chef", email="jane@restaurant.com"),
            Staff(name="Ben O Teke", role="Manager", email="bob@restaurant.com"),
        ]
        db.session.add_all(staff)
        
        db.session.commit()
        print("Database seeded successfully!")

if __name__ == '__main__':
    seed_database()
