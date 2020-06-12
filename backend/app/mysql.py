from flask import render_template, flash, redirect, url_for, request
from flask import (
    Blueprint, session, jsonify, g)
from app import app, db
from pyorm.databases.mysql import MysqlDatabase
from pyorm.userfacing import connect_db

import pymysql

conn = None


@app.route('/db/mysql/connect', methods=['POST', 'GET'])
def MySqlconnect():
    global conn
    endpoint = request.get_json()['Endpoint']
    username = request.get_json()['UserName']
    password = request.get_json()['Password']

    conn = pymysql.connect(host='localhost', user=username, password=password, database=username)

    return jsonify({'result': "OK"})


@app.route('/db/mysql/create', methods=['POST'])
def MySqlcreate():
    print("create: ", request.get_json())

    data = request.get_json()

    columns = [f'{val["Field"]} {val["Type"]}' for val in data["inputField"]]
    query = f'CREATE TABLE {data["tableName"]} ({",".join(columns)})'

    try:
        conn.cursor().execute(query)
    except Exception as e:
        print(e)
        return jsonify({'result': 'Error', 'message':'Something happend with database'})

    return jsonify({'result':'OK', 'message':'Table created properly'})


@app.route('/db/mysql/insert', methods=['POST'])
def MySqlinsert():
    print("inserted: ", request.get_json())
    return jsonify({'result': "successfully inserted"})


@ app.route('/db/mysql/update', methods=['POST'])
def MySqlupdate():
    print("updated: ", request.get_json())
    return jsonify({'result': "successfully updated"})


@ app.route('/db/mysql/delete', methods=['POST'])
def MySqldelete():
    print("deleted: ", request.get_json())
    return jsonify({'result': "successfully deleted"})
