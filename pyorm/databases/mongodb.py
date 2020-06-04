from pymongo import MongoClient
from pyorm.databases.base import BaseDatabase, DatabaseException


class MongoDBDatabase(BaseDatabase):
    def __new__(cls, db, *args, **kwargs):
        obj = BaseDatabase.__new__(cls, db, *args, **kwargs)
        obj.name = 'mongo'
        obj.connect()
        obj.cursor = obj.engine
        return obj

    def connect(self):
        if self.connected:
            return self.engine

        try:
            self.kwargs['database'] = self.db
            self.engine = MongoClient(
                host="localhost", database="hritik", user="postgres", password="chinchi789")
            self._connected = True
            return self.engine
        except pymongo.OperationalError as e:
            raise DatabaseException(e)

    def close(self):
        if self.connected:
            self.cursor.close()
            self.engine.close()
        self._connected = False

    def commit(self):
        self.engine.commit()

    def execute(self, query, *args, **kwargs):
        self.cursor.execute(query, *args)
