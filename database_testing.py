from pyorm import connect_db, Model, Engine
from pyorm.settings import DATABASE
from pyorm.databases.mysql import MysqlDatabase
from pyorm.databases.mongodb import MongoDBDatabase
from pyorm.databases.postgresql import PostgreSqlDatabase


class Test(DATABASE, MysqlDatabase, MysqlDatabase, PostgreSqlDatabase):
    def __init__(self, **kwargs):
        super(Test, self).__init__(**kwargs)

    def __new__(cls, *args, **kwargs):
        obj = MysqlDatabase.__new__(cls,
                                    host='localhost',
                                    user='root',
                                    password='chinchi789',
                                    *args, **kwargs)
        return obj

    def MongoDB(self):
        self.connect()
        self.close()
        pass

    def Mysql(self):
        self.connect()
        self.close()
        pass

    def Sqlite(self):
        self.connect()
        self.close()
        pass

    def PostgreSql(self):
        self.connect()
        self.close()
        pass


if __name__ == "__main__":
    test = Test()
    test.MongoDB()
    test.Mysql()
    test.Sqlite()
    test.PostgreSql()
