from flask import render_template, flash, redirect, url_for, request
from flask import (
    Blueprint, session, jsonify)
from app import app, db
from app.terminal import Shell, set_user_id
from io import StringIO
from flask_jwt_extended import JWTManager, jwt_required, get_jwt_identity

from app.models import User, History

shell = Shell()

@app.route('/', methods=['GET'])
def index():
    return "success"

@app.route('/home/sql', methods=['GET', 'POST'])
def sql():
    return "Hello"


@app.route('/console/history', methods=['POST', 'GET'])
@jwt_required
def get_history():
    user = get_jwt_identity()
    user = User.query.filter_by(username=user['username']).first()

    history = [(h.history_statement, h.history_result) for h in \
        History.query.filter_by(user_id=user.id)]

    return jsonify({'result':'successfull', 'history': history})



@app.route('/console/exec', methods=['POST', 'GET'])
@jwt_required
def execute_command():
    statement = request.get_json()['command']
    user_id = get_jwt_identity()['id']

    set_user_id(user_id)
    
    stream = StringIO()
    shell.evaluate(statement, stream=stream)

    history = History(user_id=user_id, history_statement=statement, history_result=stream.getvalue())
    db.session.add(history)
    db.session.commit()
    return jsonify({'result': "successfully connected", 'value':stream.getvalue()})



@app.route('/db/connect', methods=['POST', 'GET'])
@jwt_required
def connect():
    Endpoint = request.get_json()['Endpoint']
    Database = request.get_json()['Database']
    Userame = request.get_json()['Username']
    Password = request.get_json()['Password']
    return jsonify({'result': "successfully connected"})


@app.route('/db/create', methods=['POST'])
def create():
    print("create: ", request.get_json())
    return jsonify({'result': "successfully created"})


@app.route('/db/insert', methods=['POST'])
def insert():
    print("inserted: ", request.get_json())
    return jsonify({'result': "successfully inserted"})


@app.route('/db/update', methods=['POST'])
def update():
    print("updated: ", request.get_json())
    return jsonify({'result': "successfully updated"})


@app.route('/db/delete', methods=['POST'])
def delete():
    print("deleted: ", request.get_json())
    return jsonify({'result': "successfully deleted"})
