
from .dbconfig import ROOT_PASS, ROOT_HOST, HOST
import pymysql, sqlite3
from backend.config import BASE_DIR
import os


def create_user_mysql(username, password=None):
    with pymysql.connect(HOST, ROOT_HOST, ROOT_PASS,
                         charset='utf8mb4', cursorclass=pymysql.cursors.DictCursor) as cursor:
        try:
            sql_create_user = "CREATE USER '%s'@'%s' IDENTIFIED BY '%s';" % (username, HOST, password)
            cursor.execute(sql_create_user)
            cursor.close()
        except Exception as e:
            print("Error creating MySQL User: %s" % e)


def create_user_sqlite(username, password=None):
    try:
        path = os.path.join(BASE_DIR, 'userspaces', username)
        if not os.path.exists(path):
            os.mkdir(path)
        path = os.path.join(path, 'sqlite.db')
        if not os.path.exists(path):
            f = open(path, 'a+')
            f.close()
        conn = sqlite3.connect(os.path.join(BASE_DIR, 'userspaces', username, 'sqlite.db'))
        conn.close()
        return True
    except Exception as e:
        print(e)


def create_user_postgresql(username, password=None):
    pass


allowed_types = {
    'mysql': {'create': create_user_mysql},
    'sqlite': {'create': create_user_sqlite},
    'postgresql': {'create': create_user_postgresql}
}


def create_user(database_type, username, password=None):

    if database_type not in allowed_types:
        return NotImplementedError

    else:
        try:
            allowed_types[database_type]['create'](username, password)
            print('Created ' + database_type + ' of user ' + username)
            return True
        except Exception as e:
            print('Error happened due to ', e)


def create_all(username, password=None):
    for database_type in allowed_types:
        create_user(database_type, username, password)
