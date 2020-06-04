import pickle
from datetime import datetime
from hashlib import md5
from app import db
from werkzeug.security import generate_password_hash, check_password_hash
from io import StringIO


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(64), index=True, unique=True)
    username = db.Column(db.String(64), index=True, unique=True)
    password = db.Column(db.String(128))

    def __repr__(self):
        return '<User> {}'.format(self.username)


class Picklables(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    global_name = db.Column(db.Text)
    global_ = db.Column(db.BLOB)

    def __repr__(self):
        return '<Picklable {}>'.format(self.global_name)


class UnPicklables(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    unpicklable = db.Column(db.Text)

    def __repr__(self):
        return '<UnPicklable {}>'.format(self.unpicklable)


class UnPicklableNames(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    unpicklable_name = db.Column(db.Text)

    def __repr__(self):
        return '<UnPicklableName {}>'.format(self.unpicklable_name)


class History(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    history_statement = db.Column(db.Text)
    history_result = db.Column(db.Text)

    def __str__(self):
        return '>>> {}\n...{}'.format(self.history_statement, self.history_result)

    def __repr__(self):
        return '<History {}>'.format(self.id)

    def pack_history(self):
        return self.history_statement.split('\n'), self.history_result.split('\n')
