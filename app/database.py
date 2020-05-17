from flask import (
    Blueprint, redirect, render_template,
    request, session, url_for, jsonify)
# from pymongo import MongoClient


database_bp = Blueprint('console', __name__, url_prefix="/")

@database_bp.route('/db/connect', methods=['POST', 'GET'])
def connect():
    print("connect: ", request.get_json())
    Endpoint = request.get_json()['Endpoint']
    Database = request.get_json()['Database']
    Userame = request.get_json()['Username']
    Password = request.get_json()['Password']
    db = MongoClient()
    return jsonify({'result': "successfully connected"})


@database_bp.route('/db/create', methods=['POST'])
def create():
    print("create: ", request.get_json())
    return jsonify({'result': "successfully created"})


@database_bp.route('/db/insert', methods=['POST'])
def insert():
    print("inserted: ", request.get_json())
    return jsonify({'result': "successfully inserted"})


@database_bp.route('/db/update', methods=['POST'])
def update():
    print("updated: ", request.get_json())
    return jsonify({'result': "successfully updated"})


@database_bp.route('./db/delete', methods=['POST'])
def delete():
    print("deleted: ", request.get_json())
    return jsonify({'result': "successfully deleted"})
