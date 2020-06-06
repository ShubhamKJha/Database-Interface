from . import connect_db
import os
from config import BASE_DIR
from mylogging import log

def connect(db_name, username, password):
    USERNAME = username
    print(USERNAME)
    PATH = os.path.join(BASE_DIR, 'userspaces', USERNAME, 'sqlite.db')
    HOST = os.getenv('HOST') or 'localhost'
    if db_name == 'sqlite':
        return connect_db('sqlite', database=PATH)
    
    elif db_name == 'mysql':
        dd = None
        try:
            dd = connect_db('mysql', user=USERNAME, password=password,
                        host=HOST, database=USERNAME)
        except Exception as e:
            log(f'Failed to connect to Database due to {e}', level='ERROR')

        finally:
            return dd
