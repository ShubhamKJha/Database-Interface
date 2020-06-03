# import os
# from flask import Flask, jsonify, request
# from flask_cors import CORS, cross_origin
# from .database import database_bp
# from .console import console_bp
# from flask_sqlalchemy import SQLAlchemy
# from flask_migrate import Migrate

# db = SQLAlchemy(app)

# def create_app(test_config=None):
#     app = Flask(__name__, instance_relative_config=True)
#     app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/test.db'
#     db.init_app(app)
#     migrate = Migrate(app, db)
#     # app.config['JWT_SECRET_KEY'] = 'secret'
#     # bcrypt = Bcrypt(app)
#     # jwt = JWTManager(app)
#     CORS(app)
#     # app.app_context()
#     @app.route('/', methods=['GET'])
#     def index():
#         return "success"

#     @app.route('/home/sql', methods=['GET', 'POST'])
#     def sql():
#         return "Hello"


#     app.register_blueprint(database_bp)
#     app.register_blueprint(console_bp)

#     if __name__ == '__main__':
#         app.run(debug=True)

#     return app

# from flask import Flask
# from flask_sqlalchemy import SQLAlchemy
#
# db = SQLAlchemy()
#
# def create_app():
#     app = Flask(__name__)
#     db.init_app(app)
#     app.register_blueprint(console_bp)
#
#     return app
