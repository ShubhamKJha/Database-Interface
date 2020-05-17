from .terminal import Shell
from io import StringIO

from flask import (
    Blueprint, redirect, render_template,
    request, session, url_for, jsonify)
from pymongo import MongoClient

shell = Shell()

console_bp = Blueprint('database', __name__, url_prefix="/")

@console_bp.route('/console/exec', methods=['POST', 'GET'])
def execute_command():
    print("connect: ", request.get_json())
    statement = request.get_json()['command']
    stream = StringIO()
    print("Statemet: ",statement)
    shell.evaluate(statement, stream=stream)
    print("Stream: ",stream.getvalue())
    return jsonify({'result': "successfully connected", 'value':stream.getvalue()})
