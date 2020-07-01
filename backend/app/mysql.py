from flask import render_template, flash, redirect, url_for, request
from flask import (
    Blueprint, session, jsonify, g)
from app import app, db
from pyorm.databases.mysql import MysqlDatabase
import pymysql
conn = None


def createCol(inputField):
    col = []
    for val in inputField:
        if val['Type'] == 'varchar':
            col.append(
                f'{val["Field"]} {val["Type"]}(255) {(" ").join(val["fieldConstraints"].split("_"))}')
        else:
            col.append(
                f'{val["Field"]} {val["Type"]} {(" ").join(val["fieldConstraints"].split("_"))}')
    return col


def insertData(inputField):
    cols = []
    vals = []
    for val in inputField[0]:
        cols.append(f'{val["Field"]}')
    col = f'({", ".join(cols)})'
    for v in inputField:
        val = []
        for r in v:
            if r['Type'] == "int":
                val.append(f'{r["value"]}')
            else:
                val.append(f'"{r["value"]}"')
        vals.append(f'({", ".join(val)})')
    Rows = f'{", ".join(vals)}'
    query = f'{col} VALUES {Rows}'
    print(query)

    return query


def mysqlConn():
    conn = pymysql.connect(
        host=session['host'], user=session['user'], password=session['password'])
    return conn


@app.route('/db/mysql/connect', methods=['POST', 'GET'])
def MySqlconnect():
    session['host'] = request.get_json()['Endpoint']
    session['database'] = request.get_json()['Database']
    session['user'] = request.get_json()['UserName']
    session['password'] = request.get_json()['Password']
    session['databaseName'] = request.get_json()['DatabaseName']
    if 'conn' not in g:
        conn = mysqlConn()
        cur = conn.cursor()
        cur.execute("CREATE DATABASE {}".format(session['databaseName']))
        conn.commit()
        conn.close()
    else:
        return jsonify({'result': 'OK', 'response': 'database instance already present'})
    return jsonify({'result': "OK"})


@app.route('/db/mysql/create', methods=['POST'])
def MySqlcreate():
    print("create: ", request.get_json())
    data = request.get_json()
    conn = mysqlConn()
    conn.cursor().execute("USE {}".format(session.get('databaseName')))
    columns = createCol(data['inputField'])
    print(columns)
    session['tableName'] = data["tableName"]
    query = f'CREATE TABLE {session["tableName"]}({",".join(columns)})'
    print(query)
    try:
        conn.cursor().execute(query)
        conn.commit()
        conn.close()
    except Exception as e:
        print(e)
        return jsonify({'result': 'Error', 'message': 'Something happend with database'})
    return jsonify({'result': 'OK', 'message': 'Table created properly'})


@ app.route('/db/mysql/insert', methods=['POST'])
def MySqlinsert():
    # print("inserted: ", request.get_json())
    data = request.get_json()
    conn = mysqlConn()
    conn.cursor().execute("USE {}".format(session.get('databaseName')))
    ins = insertData(data['inputField'])
    print(ins)
    query = f'INSERT INTO {session["tableName"]} {ins}'
    print(query)
    try:
        conn.cursor().execute(query)
        conn.commit()
        conn.close()
    except Exception as e:
        print(e)
        return jsonify({'result': 'Error', 'message': 'Something happend with database'})
    return jsonify({'result': 'OK', 'message': 'Data successfully inserted'})


@ app.route('/db/mysql/update', methods=['POST'])
def MySqlupdate():
    print("updated: ", request.get_json())
    return jsonify({'result': "successfully updated"})


@ app.route('/db/mysql/delete', methods=['POST'])
def MySqldelete():
    print("deleted: ", request.get_json())
    return jsonify({'result': "successfully deleted"})
