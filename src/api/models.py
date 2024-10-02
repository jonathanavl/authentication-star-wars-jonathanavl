from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

favorite_characters = db.Table('favorite_characters',
    db.Column('user_id', db.Integer, db.ForeignKey('user.id')),
    db.Column('character_id', db.Integer, db.ForeignKey('character.id'))
)
favorite_planets = db.Table('favorite_planets',
    db.Column('user_id', db.Integer, db.ForeignKey('user.id')),
    db.Column('planet_id', db.Integer, db.ForeignKey('planet.id'))
)
favorite_vehicles = db.Table('favorite_vehicles',
    db.Column('user_id', db.Integer, db.ForeignKey('user.id')),
    db.Column('vehicle_id', db.Integer, db.ForeignKey('vehicle.id'))
)
class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(250), unique=True, nullable=False)
    email = db.Column(db.String(250), unique=True, nullable=False)
    is_active = db.Column(db.Boolean, nullable=False, default=True)
    password_hash = db.Column(db.String(250), nullable=False)
    favorite_characters = db.relationship('Character', secondary=favorite_characters, backref=db.backref('users_with_favorites', lazy='dynamic'))
    favorite_planets = db.relationship('Planet', secondary=favorite_planets, backref=db.backref('users_with_favorites', lazy='dynamic'))
    favorite_vehicles = db.relationship('Vehicle', secondary=favorite_vehicles, backref=db.backref('users_with_favorites', lazy='dynamic'))

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def __repr__(self):
        return f'<User {self.username}>'

    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "is_active": self.is_active,
            "favorite_characters": [character.serialize() for character in self.favorite_characters],
            "favorite_planets": [planet.serialize() for planet in self.favorite_planets],
            "favorite_vehicles": [vehicle.serialize() for vehicle in self.favorite_vehicles]
        }
class Planet(db.Model):
    __tablename__ = 'planet'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(250), nullable=False)
    climate = db.Column(db.String(250))
    terrain = db.Column(db.String(250))
    population = db.Column(db.Integer)
    image_url = db.Column(db.String(500))
    biography = db.Column(db.Text)

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "climate": self.climate,
            "terrain": self.terrain,
            "population": self.population,
            "image_url": self.image_url,
            "biography": self.biography 
        }
class Character(db.Model):
    __tablename__ = 'character'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(250), nullable=False)
    species = db.Column(db.String(250))
    homeworld = db.Column(db.String(250))
    image_url = db.Column(db.String(500))
    biography = db.Column(db.Text)

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "species": self.species,
            "homeworld": self.homeworld,
            "image_url": self.image_url,
            "biography": self.biography 
        }
class Vehicle(db.Model):
    __tablename__ = 'vehicle'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(250), nullable=False)
    model = db.Column(db.String(250))
    hp = db.Column(db.Integer)
    image_url = db.Column(db.String(500))
    biography = db.Column(db.Text)

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "model": self.model,
            "hp": self.hp,
            "image_url": self.image_url,
            "biography": self.biography 
        }