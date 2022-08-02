from app.models.db import db, Team, TeamMember


def seed_teams():
    Kirin = Team(
        name='Brooklyn Kirin', captainId=2, description='Brooklyn\'s #1 9-man volleyball team'
    )
    Dragons = Team(
        name='Chicago Dragons', captainId=3, description='Chicago\'s #1 9-man volleyball team'
    )

    Convicts = Team(
        name='Toronto Convicts', captainId=4, description='Toronto\'s #1 9-man volleyball team'
    )

    db.session.add(Kirin)
    db.session.add(Dragons)
    db.session.add(Convicts)
    db.session.commit()

    first = TeamMember(
        userId=2, teamId=1, admin=True, request=True
    )
    sec = TeamMember(
        userId=3, teamId=2, admin=True, request=True
    )
    third = TeamMember(
        userId=4, teamId=3, admin=True, request=True
    )
    four = TeamMember(
        userId=5, teamId=1, admin=False, request=True
    )
    five = TeamMember(
        userId=6, teamId=2, admin=False, request=True
    )
    six = TeamMember(
        userId=7, teamId=3, admin=False, request=True
    )

    db.session.add(first)
    db.session.add(sec)
    db.session.add(third)
    db.session.add(four)
    db.session.add(five)
    db.session.add(six)
    db.session.commit()


def undo_users():
    db.session.execute('TRUNCATE teams RESTART IDENTITY CASCADE;')
    db.session.execute('TRUNCATE teammembers RESTART IDENTITY CASCADE;')
    db.session.commit()
