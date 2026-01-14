from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from datetime import datetime

from models import db, Customer, Staff, Table, Menu, Order, OrderItem, Payment

app = Flask(__name__)


app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False


db.init_app(app)
migrate = Migrate(app, db)



@app.route("/")
def home():
    return jsonify({"message": "QR Restaurant API running"})



@app.route("/customers", methods=["GET"])
def get_customers():
    customers = Customer.query.all()
    return jsonify([c.to_dict() for c in customers])



@app.route("/customers", methods=["POST"])
def create_customer():
    data = request.get_json()
    customer = Customer(
        username=data["username"],
        created_at=datetime.utcnow()
    )
    db.session.add(customer)
    db.session.commit()
    return jsonify(customer.to_dict()), 201



@app.route("/staff", methods=["GET"])
def get_staff():
    staff = Staff.query.all()
    return jsonify([s.to_dict() for s in staff])




@app.route("/staff", methods=["POST"])
def create_staff():
    data = request.get_json()
    staff = Staff(
        staff_name=data["staff_name"],
        role=data["role"],
        created_at=datetime.utcnow()
    )
    db.session.add(staff)
    db.session.commit()
    return jsonify(staff.to_dict()), 201



@app.route("/tables", methods=["GET"])
def get_tables():
    tables = Table.query.all()
    return jsonify([t.to_dict() for t in tables])




@app.route("/tables/<int:id>", methods=["PATCH"])
def update_table_status(id):
    table = Table.query.get_or_404(id)
    table.status = request.json["status"]
    db.session.commit()
    return jsonify(table.to_dict())




@app.route("/menu", methods=["GET"])
def get_menu():
    meals = Menu.query.all()
    return jsonify([m.to_dict() for m in meals])



@app.route("/menu", methods=["POST"])
def create_menu_item():
    data = request.get_json()
    meal = Menu(
        meal_name=data["meal_name"],
        image_url=data.get("image_url"),
        price=data["price"],
        description=data.get("description")
    )
    db.session.add(meal)
    db.session.commit()
    return jsonify(meal.to_dict()), 201



@app.route("/orders", methods=["POST"])
def create_order():
    data = request.get_json()

    order = Order(
        customer_id=data["customer_id"],
        staff_id=data.get("staff_id"),  # opti
        table_id=data["table_id"],
        status="pending",
        created_at=datetime.utcnow()
    )
    db.session.add(order)
    db.session.commit()

    for item in data.get("items", []):
        order_item = OrderItem(
            order_id=order.id,
            meal_id=item["meal_id"],
            quantity=item["quantity"]
        )
        db.session.add(order_item)

    db.session.commit()
    return jsonify(order.to_dict()), 201


@app.route("/orders/<int:id>", methods=["GET"])
def get_order(id):
    order = Order.query.get_or_404(id)
    return jsonify(order.to_dict())


@app.route("/orders/<int:id>", methods=["PATCH"])
def update_order_status(id):
    order = Order.query.get_or_404(id)
    order.status = request.json["status"]
    db.session.commit()
    return jsonify(order.to_dict())



@app.route("/payments", methods=["POST"])
def create_payment():
    data = request.get_json()

    payment = Payment(
        order_id=data["order_id"],
        total_amount=data["total_amount"],
        payment_method=data["payment_method"],
        status="completed",
        created_at=datetime.utcnow()
    )
    db.session.add(payment)
    db.session.commit()

    return jsonify(payment.to_dict()), 201


@app.route("/payments/<int:order_id>", methods=["GET"])
def get_payment(order_id):
    payment = Payment.query.filter_by(order_id=order_id).first_or_404()
    return jsonify(payment.to_dict())



if __name__ == "__main__":
    app.run(debug=True)
