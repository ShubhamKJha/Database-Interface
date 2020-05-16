import sqlite3
from pymongo import MongoClient
import click
from flask import current_app, g
from flask.cli import with_appcontext

def get_db():
    db = MongoClient('mongodb://hritik:ZeTtaMiNe@cluster0-shard-00-00-gwkzu.gcp.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority')
    return db.zettamine

def close_db(e=None):
    db = g.pop('db', None)

    if db is not None:
        db.close()
