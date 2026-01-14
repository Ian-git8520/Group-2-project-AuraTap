from flask import Flask
from flask_restful import Api, Resource, reqparse, abort
from flask_migrate import Migrate
from datetime import datetime
from models import db, Customer, Staff, Table, Menu, Order, OrderItem, Payment

app = Flask(__name__)
api = Api(app)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)
migrate = Migrate(app, db)


class HomeResource(Resource):
    def get(self):
        return {"message": "QR Restaurant API running"}, 200

api.add_resource(HomeResource, "/")



customer_parser = reqparse.RequestParser()
customer_parser.add_argument("username", type=str, required=True, help="Username cannot be blank")

class CustomerListResource(Resource):
    def get(self):
        return [c.to_dict() for c in Customer.query.all()], 200

    def post(self):
        args = customer_parser.parse_args()
        customer = Customer(username=args["username"], created_at=datetime.utcnow())
        db.session.add(customer)
        db.session.commit()
        return customer.to_dict(), 201

api.add_resource(CustomerListResource, "/customers")



staff_parser = reqparse.RequestParser()
staff_parser.add_argument("staff_name", type=str, required=True, help="Staff name cannot be blank")
staff_parser.add_argument("role", type=str, required=True, help="Role cannot be blank")

class StaffListResource(Resource):
    def get(self):
        return [s.to_dict() for s in Staff.query.all()], 200

    def post(self):
        args = staff_parser.parse_args()
        staff = Staff(staff_name=args["staff_name"], role=args["role"], created_at=datetime.utcnow())
        db.session.add(staff)
        db.session.commit()
        return staff.to_dict(), 201

api.add_resource(StaffListResource, "/staff")



table_parser = reqparse.RequestParser()
table_parser.add_argument("status", type=str, required=True, choices=("available", "occupied", "reserved"))

class TableListResource(Resource):
    def get(self):
        return [t.to_dict() for t in Table.query.all()], 200

class TableResource(Resource):
    def patch(self, table_id):
        args = table_parser.parse_args()
        table = Table.query.get_or_404(table_id)
        table.status = args["status"]
        db.session.commit()
        return table.to_dict(), 200

api.add_resource(TableListResource, "/tables")
api.add_resource(TableResource, "/tables/<int:table_id>")



menu_parser = reqparse.RequestParser()
menu_parser.add_argument("meal_name", type=str, required=True)
menu_parser.add_argument("price", type=float, required=True)
menu_parser.add_argument("image_url", type=str)
menu_parser.add_argument("description", type=str)

class MenuListResource(Resource):
    def get(self):
        return [m.to_dict() for m in Menu.query.all()], 200


    def post(self):
        args = menu_parser.parse_args()
        meal = Menu(
            meal_name=args["meal_name"],
            price=args["price"],
            image_url=args.get("image_url"),
            description=args.get("description")

        )
        db.session.add(meal)
        db.session.commit()
        return meal.to_dict(), 201

api.add_resource(MenuListResource, "/menu")



order_parser = reqparse.RequestParser()
order_parser.add_argument("customer_id", type=int, required=True)
order_parser.add_argument("table_id", type=int, required=True)
order_parser.add_argument("staff_id", type=int)
order_parser.add_argument("items", type=list, location="json", required=True, help="Items list required")

order_status_parser = reqparse.RequestParser()
order_status_parser.add_argument("status", type=str, required=True, choices=("pending","preparing","served","completed","cancelled"))

class OrderListResource(Resource):
    def post(self):
        args = order_parser.parse_args()

        
        if not Customer.query.get(args["customer_id"]):
            abort(404, message="Customer not found")
        if not Table.query.get(args["table_id"]):
            abort(404, message="Table not found")
        if args.get("staff_id") and not Staff.query.get(args["staff_id"]):
            abort(404, message="Staff not found")

        order = Order(
            customer_id=args["customer_id"],
            staff_id=args.get("staff_id"),
            table_id=args["table_id"],
            status="pending",
            created_at=datetime.utcnow()
        )
        db.session.add(order)
        db.session.commit()

       
        for item in args["items"]:
            if not Menu.query.get(item["meal_id"]):
                abort(404, message=f"Meal with id {item['meal_id']} not found")
            order_item = OrderItem(
                order_id=order.id,
                meal_id=item["meal_id"],
                quantity=item["quantity"]
            )
            db.session.add(order_item)

        db.session.commit()
        return order.to_dict(), 201

class OrderResource(Resource):
    def get(self, order_id):
        order = Order.query.get_or_404(order_id)
        return order.to_dict(), 200

    def patch(self, order_id):
        args = order_status_parser.parse_args()
        order = Order.query.get_or_404(order_id)
        order.status = args["status"]
        db.session.commit()
        return order.to_dict(), 200

api.add_resource(OrderListResource, "/orders")
api.add_resource(OrderResource, "/orders/<int:order_id>")



payment_parser = reqparse.RequestParser()
payment_parser.add_argument("order_id", type=int, required=True)
payment_parser.add_argument("total_amount", type=float, required=True)
payment_parser.add_argument("payment_method", type=str, required=True, choices=("cash","card","mobile_money","credit"))

class PaymentListResource(Resource):
    def post(self):
        args = payment_parser.parse_args()
        if not Order.query.get(args["order_id"]):
            abort(404, message="Order not found")
        payment = Payment(
            order_id=args["order_id"],
            total_amount=args["total_amount"],
            payment_method=args["payment_method"],
            status="completed",
            created_at=datetime.utcnow()
        )
        db.session.add(payment)
        db.session.commit()
        return payment.to_dict(), 201

class PaymentResource(Resource):
    def get(self, order_id):
        payment = Payment.query.filter_by(order_id=order_id).first_or_404()
        return payment.to_dict(), 200

api.add_resource(PaymentListResource, "/payments")
api.add_resource(PaymentResource, "/payments/<int:order_id>")



if __name__ == "__main__":
    app.run(debug=True)
