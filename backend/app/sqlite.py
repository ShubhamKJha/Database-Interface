from flask import render_template, flash, redirect, url_for, request
from flask import (
    Blueprint, session, jsonify)
from app import app, db


@app.route('/db/sqlite/connect', methods=['POST', 'GET'])
def Sqliteconnect():
    Endpoint = request.get_json()['Endpoint']
    Database = request.get_json()['Database']
    Userame = request.get_json()['Username']
    Password = request.get_json()['Password']
    return jsonify({'result': "successfully connected"})


@app.route('/db/sqlite/create', methods=['POST'])
def Sqlitecreate():
    print("create: ", request.get_json())
    return jsonify({'result': "successfully created"})


@app.route('/db/sqlite/insert', methods=['POST'])
def Sqliteinsert():
    print("inserted: ", request.get_json())
    return jsonify({'result': "successfully inserted"})


@app.route('/db/sqlite/update', methods=['POST'])
def Sqliteupdate():
    print("updated: ", request.get_json())
    return jsonify({'result': "successfully updated"})


@app.route('/db/sqlite/delete', methods=['POST'])
def Sqlitedelete():
    print("deleted: ", request.get_json())
    return jsonify({'result': "successfully deleted"})
