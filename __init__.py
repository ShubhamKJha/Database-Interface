import os
from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from . import database

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
static_dir = os.path.dirname(os.path.dirname(__file__)) + "/static"
template_dir = os.path.dirname(os.path.dirname(__file__)) + "/templates"

def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)
    # app.config['JWT_SECRET_KEY'] = 'secret'
    # bcrypt = Bcrypt(app)
    # jwt = JWTManager(app)
    CORS(app)
    # app.app_context()
    @app.route('/', methods=['GET'])
    def index():
        return "success"

    @app.route('/home/sql', methods=['GET', 'POST'])
    def sql():
        return "Hello"
    

    app.register_blueprint(database.bp)
    # from . import auth, profile
    # app.register_blueprint(auth.bp)
    # app.register_blueprint(profile.bp)

    if __name__ == '__main__':
        app.run(debug=True)

    return app
