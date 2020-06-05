from . import connect_db
import os
from config import BASE_DIR

def connect(db_name, password):
    USERNAME = globals().get('USERNAME', None)
    PATH = os.path.join(BASE_DIR, 'userspaces', 'sqlite.db')
    HOST = os.getenv('HOST') or 'localhost'
    if db_name == 'sqlite':
        return connect_db('sqlite', database=PATH)
    
    elif db_name == 'mysql':
        return connect_db('mysql', user=USERNAME,
               password=password, host=HOST)
