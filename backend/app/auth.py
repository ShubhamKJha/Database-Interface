from flask import (
    request, jsonify, session, Response, json
)
from datetime import datetime, timedelta
from werkzeug.security import check_password_hash, generate_password_hash
from flask_jwt_extended import create_access_token
from flask_bcrypt import Bcrypt
from app import app, db
from app.models import User
import os
from config import BASE_DIR

from pyorm.superadmin.dbcreate import create_all

bcrypt = Bcrypt()


@app.route("/auth/logout", methods=['GET'])
def Logout():
    print("request ", request.get_json()[
          'Email'], request.get_json()['Password'])
    return jsonify({"response": "successfull"})


@app.route("/auth/login", methods=['POST'])
def Login():
    email = request.get_json()['email']
    password = request.get_json()['password']
    # u = User.query.all()
    # print(u[0].email)
    response = User.query.filter_by(email=email).first()
    print(response, response.password)
    if response:
        if bcrypt.check_password_hash(response.password, password):
            expires = timedelta(days=1)
            access_token = create_access_token(identity={
                'id': response.id,
                'username': response.username,
                'email': response.email
            }, expires_delta=expires)
            # print(access_token)
            data = {
                'UserName': response.username,
                'Email': response.email,
                'Password': password
            }
            message = json.dumps(
                {"result": "successfully created", "access_token": access_token, "data": data})
            print(message)
            resp = jsonify(message)
            return resp
    return jsonify({"response": "Invalid username or password", "success": "false"})


@app.route("/auth/signup", methods=['POST'])
def Signup():
    email = request.get_json()['email']
    password = request.get_json()['password']
    username = request.get_json()['username']

    password_hash = bcrypt.generate_password_hash(password).decode('utf-8')

    user_email, user_username = User.query.filter_by(email=email).first(), \
                                User.query.filter_by(username=username).first()
    if user_email or user_username:
        return jsonify({'success': 'false', 'response': 'Username/Email already exists'})
    else:
        u = User(email=email, password=password_hash, username=username)
        db.session.add(u)
        db.session.commit()

        # create user space
        os.mkdir(os.path.join(BASE_DIR, 'userspaces', username))

        # create user databases
        create_all(username, password)

        return jsonify({'success': 'true', "response": "User created"})

