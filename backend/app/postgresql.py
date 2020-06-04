from flask import render_template, flash, redirect, url_for, request
from flask import (
    Blueprint, session, jsonify)
from app import app, db


@app.route('/db/postgresql/connect', methods=['POST', 'GET'])
def postgreSqlconnect():
    Endpoint = request.get_json()['Endpoint']
    Database = request.get_json()['Database']
    Userame = request.get_json()['Username']
    Password = request.get_json()['Password']
    return jsonify({'result': "successfully connected"})


@app.route('/db/postgresql/create', methods=['POST'])
def postgreSqlcreate():
    print("create: ", request.get_json())
    return jsonify({'result': "successfully created"})


@app.route('/db/postgresql/insert', methods=['POST'])
def postgreSqlinsert():
    print("inserted: ", request.get_json())
    return jsonify({'result': "successfully inserted"})


@app.route('/db/postgresql/update', methods=['POST'])
def postgreSqlupdate():
    print("updated: ", request.get_json())
    return jsonify({'result': "successfully updated"})


@app.route('/db/postgresql/delete', methods=['POST'])
def postgreSqldelete():
    print("deleted: ", request.get_json())
    return jsonify({'result': "successfully deleted"})
