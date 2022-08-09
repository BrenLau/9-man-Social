from app.models.db import db, Team, TeamMember


def seed_teams():
    Kirin = Team(
        name='Brooklyn Kirin', captainId=2, image='https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/31a92255-861d-40f4-ad78-a2efd309b0d2/da8feyo-6a4e39e0-adb9-40cc-b7ca-69b86f724e0d.jpg/v1/fill/w_738,h_1083,q_70,strp/kirin_by_sandara_da8feyo-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI0NyIsInBhdGgiOiJcL2ZcLzMxYTkyMjU1LTg2MWQtNDBmNC1hZDc4LWEyZWZkMzA5YjBkMlwvZGE4ZmV5by02YTRlMzllMC1hZGI5LTQwY2MtYjdjYS02OWI4NmY3MjRlMGQuanBnIiwid2lkdGgiOiI8PTg1MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.5xs1P2qGPcjuBHNB_1niTzN94LPhiKVANckDlt_T3ek', description='Brooklyn\'s #1 9-man volleyball team'
    )
    Dragons = Team(
        name='Chicago Dragons', captainId=3, image='https://i.pinimg.com/originals/72/a0/fa/72a0faa36ed1f338578ea00d36ed9350.jpg', description='Chicago\'s #1 9-man volleyball team'
    )

    Convicts = Team(
        name='Toronto Convicts', captainId=4, image='https://i.pinimg.com/736x/d7/cd/bf/d7cdbfd7fda041ef4967338246b0bc3b--australian-art-historical-romance.jpg', description='Toronto\'s #1 9-man volleyball team'
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


def undo_teams():
    db.session.execute('TRUNCATE teams RESTART IDENTITY CASCADE;')
    db.session.execute('TRUNCATE teammembers RESTART IDENTITY CASCADE;')
    db.session.commit()
