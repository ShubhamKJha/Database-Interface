from flask import render_template, flash, redirect, url_for, request
from flask import (
    Blueprint, session, jsonify)
from app import app, db
from app.terminal import Shell
from io import StringIO

shell = Shell()

@app.route('/', methods=['GET'])
def index():
    return "success"

@app.route('/home/sql', methods=['GET', 'POST'])
def sql():
    return "Hello"


@app.route('/console/exec', methods=['POST', 'GET'])
def execute_command():
    statement = request.get_json()['command']
    stream = StringIO()
    shell.evaluate(statement, stream=stream)
    return jsonify({'result': "successfully connected", 'value':stream.getvalue()})



@app.route('/db/connect', methods=['POST', 'GET'])
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
