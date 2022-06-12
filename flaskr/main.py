from flask import Flask, request, abort, redirect, url_for, jsonify
from setup import init_app
from clientService import ClientService
from orderService import OrderService
from foodService import FoodService
from flask_login import login_user, logout_user, login_required, current_user
import error

app = Flask(__name__)
init_app(app)


@app.route('/login', methods=['POST'])
def login():
    userdata = request.json['login']
    password = request.json['password']

    if not (userdata and password):
        abort(400, 'required field empty')

    cs = ClientService()
    try:
        user = cs.login(userdata, password)
        login_user(user)
    except (error.UseNotFoundException, error.WrongPasswordException) as er:
        abort(401, er.description)

    return jsonify(success=True)


@login_required
@app.route('/logout')
def logout():
    logout_user()
    return jsonify(success=True)


@app.route('/sing-up', methods=['POST'])
def sing_up():
    email = request.json.get('email')
    password = request.json.get('password')
    repeated_password = request.json.get('repeatedpassword')
    first_name = request.json.get('first_name')
    last_name = request.json.get('last_name')
    phone = request.json.get('phone')

    if not (password and repeated_password and first_name and last_name and phone):
        abort(400, 'missing required fields')

    if password != repeated_password:
        abort(400, 'passwords does not match')

    cs = ClientService()
    client = cs.register_new_user(first_name, last_name, phone, password, email)
    login_user(client)
    return redirect(url_for('order/get-places'))  # fixme change to status 200


@login_required
@app.route('/order/get-places')
def get_places():
    fs = FoodService()
    return {
        'places': [place.to_dict() for place in fs.get_food_place_list()]
    }


@login_required
@app.route('/order/get-menu/<int:food_place_id>')
def get_menu_by_place(food_place_id: int):
    fs = FoodService()
    return vars(fs.get_product_list_by_food_place(food_place_id))


@login_required
@app.route('/order/create', methods=['POST'])
def create_order():
    os = OrderService()
    order_items = request.json['items']
    food_place = request.json['place_id']
    os.create_new_order(current_user.id, food_place, order_items)  # fixme: convert dict to object
    return jsonify(success=True)


@login_required
@app.route('/order/history')
def get_order_history():
    os = OrderService()
    return vars(os.get_short_orders_by_user(current_user.id))


@login_required
@app.route('/order/history/<int:order_id>')
def get_order_details(order_id: int):
    os = OrderService()
    return vars(os.get_full_order(order_id))


@login_required
@app.route('/order/complete/<int:order_id>', methods=['POST'])
def complete_order(order_id: int):
    os = OrderService()
    os.complete(order_id)
    return jsonify(success=True)
