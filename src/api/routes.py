from flask import Flask, request, jsonify, Blueprint, abort
from api.models import db, User, Planet, Character, Vehicle
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import jwt_required, create_access_token, get_jwt_identity, JWTManager
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    if not all(k in data for k in ('username', 'email', 'password')):
        abort(400, description="Missing fields")
    
    if User.query.filter_by(email=data['email']).first() or User.query.filter_by(username=data['username']).first():
        abort(400, description="Email or Username already exists")
    
    user = User(
        username=data['username'],
        email=data['email']
    )
    user.set_password(data['password'])
    db.session.add(user)
    db.session.commit()
    return jsonify(user.serialize()), 201

@api.route('/current_user', methods=['GET'])
@jwt_required()
def get_current_user():
    try:
        user_id = get_jwt_identity()
        print(f"User ID from JWT: {user_id}")  # Agrega esta línea
        
        user = User.query.get_or_404(user_id)
        print(f"Fetched user: {user}")  # Imprimir el usuario
        
        return jsonify(user.serialize()), 200
    except Exception as e:
        print(f"Error fetching current user: {e}")  # Imprimir error
        return jsonify({'error': 'Error fetching user: ' + str(e)}), 500



@api.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(username=data['username']).first()
    
    if user and user.check_password(data['password']):
        access_token = create_access_token(identity=user.id)
        print(f"Generated Access Token: {access_token}")  # Verifica si se genera el token
        return jsonify(access_token=access_token), 200
    return jsonify({'message': 'Invalid credentials'}), 401

@api.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    # El cierre de sesión se maneja en el cliente, aquí podrías invalidar el token si lo deseas
    return jsonify({'message': 'Logged out successfully'}), 200

@api.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    return jsonify({"message": "This is a protected route", "current_user": current_user.username}), 200

@api.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([user.serialize() for user in users])


@api.route('/users/<int:user_id>', methods=['GET'])
def get_user_by_id(user_id):
    user = User.query.get_or_404(user_id)
    return jsonify(user.serialize())


@api.route('/users/favorites', methods=['GET'])
@jwt_required()
def get_user_favorites():
    user_id = get_jwt_identity()
    user = get_current_user()

    favorites = {
        "favorite_planets": [planet.serialize() for planet in user.favorite_planets],
        "favorite_characters": [character.serialize() for character in user.favorite_characters],  # Corregido a "favorite_characters"
        "favorite_vehicles": [vehicle.serialize() for vehicle in user.favorite_vehicles]  # Añadido para vehículos
    }

    return jsonify(favorites), 200


@api.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    if not all(k in data for k in ('username', 'email', 'password', 'name')):
        abort(400, description="Missing fields")
    
    if User.query.filter_by(email=data['email']).first() or User.query.filter_by(username=data['username']).first():
        abort(400, description="Email or Username already exists")
    
    user = User(
        username=data['username'],
        email=data['email'],
        name=data['name']
    )
    user.set_password(data['password'])
    db.session.add(user)
    db.session.commit()
    return jsonify(user.serialize()), 201


@api.route('/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    user = User.query.get_or_404(user_id)
    data = request.get_json()
    
    if 'username' in data:
        user.username = data['username']
    if 'email' in data:
        user.email = data['email']
    if 'password' in data:
        user.set_password(data['password'])
    if 'name' in data:
        user.name = data['name']
    
    db.session.commit()
    return jsonify(user.serialize())


@api.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user = User.query.get_or_404(user_id)
    db.session.delete(user)
    db.session.commit()
    return '', 204


# Planet Endpoints
@api.route('/planets', methods=['GET'])
def get_planets():
    planets = Planet.query.all()
    return jsonify([planet.serialize() for planet in planets])


@api.route('/planets/<int:planet_id>', methods=['GET'])
def get_planet(planet_id):
    planet = Planet.query.get_or_404(planet_id)
    return jsonify(planet.serialize())


@api.route('/planets', methods=['POST'])
def create_planet():
    data = request.get_json()
    if not all(k in data for k in ('name', 'climate', 'terrain', 'population', 'image_url', 'biography')):
        abort(400, description="Missing fields")
    
    planet = Planet(
        name=data['name'],
        climate=data['climate'],
        terrain=data['terrain'],
        population=data['population'],
        image_url=data['image_url'],
        biography=data['biography']
    )
    db.session.add(planet)
    db.session.commit()
    return jsonify(planet.serialize()), 201


@api.route('/planets/<int:planet_id>', methods=['DELETE'])
def delete_planet(planet_id):
    planet = Planet.query.get_or_404(planet_id)
    db.session.delete(planet)
    db.session.commit()
    return '', 204


# Character Endpoints
@api.route('/characters', methods=['GET'])
def get_characters():
    characters = Character.query.all()
    return jsonify([character.serialize() for character in characters])


@api.route('/characters/<int:character_id>', methods=['GET'])
def get_character(character_id):
    character = Character.query.get_or_404(character_id)
    return jsonify(character.serialize())


@api.route('/characters', methods=['POST'])
def create_character():
    data = request.get_json()
    if not all(k in data for k in ('name', 'species', 'homeworld', 'image_url', 'biography')):
        abort(400, description="Missing fields")
    
    character = Character(
        name=data['name'],
        species=data['species'],
        homeworld=data['homeworld'],
        image_url=data['image_url'],
        biography=data['biography']
    )
    db.session.add(character)
    db.session.commit()
    return jsonify(character.serialize()), 201


@api.route('/characters/<int:character_id>', methods=['DELETE'])
def delete_character(character_id):
    character = Character.query.get_or_404(character_id)
    db.session.delete(character)
    db.session.commit()
    return '', 204


# Vehicle Endpoints
@api.route('/vehicles', methods=['GET'])
def get_vehicles():
    vehicles = Vehicle.query.all()
    return jsonify([vehicle.serialize() for vehicle in vehicles])


@api.route('/vehicles/<int:vehicle_id>', methods=['GET'])
def get_vehicle(vehicle_id):
    vehicle = Vehicle.query.get_or_404(vehicle_id)
    return jsonify(vehicle.serialize())


@api.route('/vehicles', methods=['POST'])
def create_vehicle():
    data = request.get_json()
    if not all(k in data for k in ('name', 'model', 'hp', 'image_url', 'biography')):
        abort(400, description="Missing fields")
    
    vehicle = Vehicle(
        name=data['name'],
        model=data['model'],
        hp=data['hp'],
        image_url=data['image_url'],
        biography=data['biography']
    )
    db.session.add(vehicle)
    db.session.commit()
    return jsonify(vehicle.serialize()), 201


@api.route('/vehicles/<int:vehicle_id>', methods=['DELETE'])
def delete_vehicle(vehicle_id):
    vehicle = Vehicle.query.get_or_404(vehicle_id)
    db.session.delete(vehicle)
    db.session.commit()
    return '', 204


@api.route('/favorites/<string:type>/<int:id>', methods=['POST', 'DELETE', 'OPTIONS'])
@jwt_required()
def handle_favorite(type, id):
    if request.method == 'OPTIONS':
        response = jsonify({'message': 'OK'})
        response.headers.add('Access-Control-Allow-Methods', 'POST, DELETE')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        return response

    user_id = get_jwt_identity()
    user = User.query.get_or_404(user_id)

    if type not in ['planets', 'characters', 'vehicles']:
        return jsonify({"error": "Invalid type"}), 400

    if type == 'planets':
        item = Planet.query.get_or_404(id)
        favorite_list = user.favorite_planets
    elif type == 'characters':
        item = Character.query.get_or_404(id)
        favorite_list = user.favorite_characters
    else:  # vehicles
        item = Vehicle.query.get_or_404(id)
        favorite_list = user.favorite_vehicles

    if request.method == 'POST':
        if item not in favorite_list:
            favorite_list.append(item)
            db.session.commit()
            return jsonify({"message": f"{type.capitalize()} added to favorites"}), 200
        else:
            return jsonify({"message": f"{type.capitalize()} already in favorites"}), 200

    elif request.method == 'DELETE':
        if item in favorite_list:
            favorite_list.remove(item)
            db.session.commit()
            return jsonify({"message": f"{type.capitalize()} removed from favorites"}), 200
        else:
            return jsonify({"message": f"{type.capitalize()} not in favorites"}), 200

@api.route('/favorites', methods=['GET'])
@jwt_required()
def get_favorites():
    user_id = get_jwt_identity()
    user = User.query.get_or_404(user_id)

    favorites = {
        "planets": [planet.serialize() for planet in user.favorite_planets],
        "characters": [character.serialize() for character in user.favorite_characters],
        "vehicles": [vehicle.serialize() for vehicle in user.favorite_vehicles]
    }

    return jsonify(favorites), 200