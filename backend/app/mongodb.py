from flask import render_template, flash, redirect, url_for, request
from flask import (
    Blueprint, session, jsonify)
from app import app, db


@app.route('/db/mongodb/connect', methods=['POST', 'GET'])
def MongoDBconnect():
    Endpoint = request.get_json()['Endpoint']
    Database = request.get_json()['Database']
    Userame = request.get_json()['Username']
    Password = request.get_json()['Password']
    return jsonify({'result': "successfully connected"})


@app.route('/db/mongodb/create', methods=['POST'])
def MongoDBcreate():
    print("create: ", request.get_json())
    return jsonify({'result': "successfully created"})


@app.route('/db/mongodb/insert', methods=['POST'])
def MongoDBinsert():
    print("inserted: ", request.get_json())
    return jsonify({'result': "successfully inserted"})


@app.route('/db/mongodb/update', methods=['POST'])
def MongoDBupdate():
    print("updated: ", request.get_json())
    return jsonify({'result': "successfully updated"})


@app.route('/db/mongodb/delete', methods=['POST'])
def MongoDBdelete():
    print("deleted: ", request.get_json())
    return jsonify({'result': "successfully deleted"})
