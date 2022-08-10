from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password')
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password')
    lobbie = User(
        username='lobbie', email='lobbie@aa.io', password='password')
    jobbie = User(
        username='jobbie', email='jobbie@aa.io', password='password')
    pobbie = User(
        username='pobbie', email='pobbie@aa.io', password='password')
    wobbie = User(
        username='wobbie', email='wobbie@aa.io', password='password')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(lobbie)
    db.session.add(jobbie)
    db.session.add(pobbie)
    db.session.add(wobbie)

    db.session.commit()
    
    demo = User(
        username='Lemo', email='lmo@aa.io', password='password')
    marnie = User(
        username='poopers', email='marie@aa.io', password='password')
    bobbie = User(
        username='boopers', email='bobie@aa.io', password='password')
    lobbie = User(
        username='troopers', email='lobie@aa.io', password='password')
    jobbie = User(
        username='croppers', email='jobie@aa.io', password='password')
    pobbie = User(
        username='koppers', email='pobie@aa.io', password='password')
    wobbie = User(
        username='moppers', email='wbbie@aa.io', password='password')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(lobbie)
    db.session.add(jobbie)
    db.session.add(pobbie)
    db.session.add(wobbie)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
