from pyorm import Column, Model, Integer, Varchar
from pyorm.userfacing import connect

dd = connect('mysql','skjha3', 'abcd')

class Man(Model):
    name = Column(Varchar())
    age = Column(Integer())

dd.create_all()

dd.insert(Man(name='shubham', age=23))
dd.insert(Man(name='rahul', age=22))
dd.insert(Man(name='raj', age=34))

print(dd.query(Man).filter('age < 32').all())
print(dd.query(Man).filter('name == "rahul"').all())

dd.drop_all()

# dd.query(Man).all()
dd.close()
