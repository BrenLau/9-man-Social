from app.models.db import db, Team, TeamMember, Post


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
    team1 = Team(
        name='San Fran Man', captainId=8, image='https://brutalgamer.com/wp-content/uploads/2015/09/Amazing_Spider_Man_2_Camuncoli_Variant.jpg', description='San Fran\'s #1 9-man volleyball team'
    )
    team2 = Team(
        name='Philly Flyers', captainId=9, description='Toronto\'s #1 9-man volleyball team'
    )
    team3 = Team(
        name='La Hamburgers', captainId=10, image='https://www.atablefullofjoy.com/wp-content/uploads/2018/06/Hamburger-Sliders-Featured.jpg', description='Toronto\'s #1 9-man volleyball team'
    )
    team4 = Team(
        name='New York Unicorns', captainId=11, image='https://nationaltoday.com/wp-content/uploads/2020/04/unicorn-1-1.jpg', description='Toronto\'s #1 9-man volleyball team'
    )
    team5 = Team(
        name='Montreal Monsters', captainId=12, image='https://cdna.artstation.com/p/assets/images/images/018/763/408/large/melvin-maurel-peinture.jpg?1560624228', description='Toronto\'s #1 9-man volleyball team'
    )
    team6 = Team(
        name='DC Monuments', captainId=13, image='https://u4d2z7k9.rocketcdn.me/wp-content/uploads/2020/07/Webp.net-resizeimage-2020-07-22T094322.857.jpg', description='Toronto\'s #1 9-man volleyball team'
    )
   

    db.session.add(Kirin)
    db.session.add(Dragons)
    db.session.add(Convicts)
    db.session.add(team1)
    db.session.add(team2)
    db.session.add(team3)
    db.session.add(team4)
    db.session.add(team5)
    db.session.add(team6)


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

    first = TeamMember(
        userId=8, teamId=4, admin=True, request=True
    )
    sec = TeamMember(
        userId=9, teamId=5, admin=True, request=True
    )
    third = TeamMember(
        userId=10, teamId=6, admin=True, request=True
    )
    four = TeamMember(
        userId=11, teamId=7, admin=False, request=True
    )
    five = TeamMember(
        userId=12, teamId=8, admin=True, request=True
    )
    six = TeamMember(
        userId=13, teamId=9, admin=True, request=True
    )

    db.session.add(first)
    db.session.add(sec)
    db.session.add(third)
    db.session.add(four)
    db.session.add(five)
    db.session.add(six)
    db.session.commit()

    post1 = Post(
        userId = 2,
        teamId = 1,
        title = 'This is a post',
        content= 'This is the description'
    )
    post2 = Post(
        userId = 3,
        teamId = 1,
        title = 'This is a post',
        content= 'This is the description'
    )
    post3 = Post(
        userId = 4,
        teamId = 1,
        title = 'This is a post',
        content= 'This is the description'
    )
    post4 = Post(
        userId = 5,
        teamId = 1,
        title = 'This is a post',
        content= 'This is the description'
    )
    post5 = Post(
        userId = 6,
        teamId = 1,
        title = 'This is a post',
        content= 'This is the description'
    )
    post6 = Post(
        userId = 7,
        teamId = 1,
        private=True,
        title = 'This is a post',
        content= 'This is the description'
    )
    db.session.add(post1)
    db.session.add(post2)
    db.session.add(post3)
    db.session.add(post4)
    db.session.add(post5)
    db.session.add(post6)
    db.session.commit()
    
    post1 = Post(
        userId = 2,
        teamId = 2,
        title = 'This is a post',
        content= 'This is the description'
    )
    post2 = Post(
        userId = 3,
        teamId = 2,
        title = 'This is a post',
        content= 'This is the description'
    )
    post3 = Post(
        userId = 4,
        teamId = 2,
        title = 'This is a post',
        content= 'This is the description'
    )
    post4 = Post(
        userId = 5,
        teamId = 2,
        title = 'This is a post',
        content= 'This is the description'
    )
    post5 = Post(
        userId = 6,
        teamId = 2,
        title = 'This is a post',
        content= 'This is the description'
    )    
    post6 = Post(
        userId = 7,
        teamId = 2,
        private=True,

        title = 'This is a post',
        content= 'This is the description'
    )
    db.session.add(post1)
    db.session.add(post2)
    db.session.add(post3)
    db.session.add(post4)
    db.session.add(post5)
    db.session.add(post6)
    db.session.commit()

    post1 = Post(
        userId = 2,
        teamId = 3,
        title = 'This is a post',
        content= 'This is the description'
    )
    post2 = Post(
        userId = 3,
        teamId = 3,
        title = 'This is a post',
        content= 'This is the description'
    )
    post3 = Post(
        userId = 4,
        teamId = 3,
        title = 'This is a post',
        content= 'This is the description'
    )
    post4 = Post(
        userId = 5,
        teamId = 3,
        title = 'This is a post',
        content= 'This is the description'
    )
    post5 = Post(
        userId = 6,
        teamId = 3,
        title = 'This is a post',
        content= 'This is the description'
    )    
    post6 = Post(
        userId = 7,
        teamId = 3,
        private=True,
        title = 'This is a post',
        content= 'This is the description'
    )
    db.session.add(post1)
    db.session.add(post2)
    db.session.add(post3)
    db.session.add(post4)
    db.session.add(post5)
    db.session.add(post6)
    db.session.commit()

    post1 = Post(
        userId = 2,
        teamId = 4,
        title = 'This is a post',
        content= 'This is the description'
    )
    post2 = Post(
        userId = 3,
        teamId = 4,
        title = 'This is a post',
        content= 'This is the description'
    )
    post3 = Post(
        userId = 4,
        teamId = 4,
        title = 'This is a post',
        content= 'This is the description'
    )
    post4 = Post(
        userId = 5,
        teamId = 4,
        title = 'This is a post',
        content= 'This is the description'
    )
    post5 = Post(
        userId = 6,
        teamId = 4,
        title = 'This is a post',
        content= 'This is the description'
    )    
    post6 = Post(
        userId = 7,
        teamId = 4,
        private=True,
        title = 'This is a post',
        content= 'This is the description'
    )
    db.session.add(post1)
    db.session.add(post2)
    db.session.add(post3)
    db.session.add(post4)
    db.session.add(post5)
    db.session.add(post6)
    db.session.commit()

    post1 = Post(
        userId = 2,
        teamId = 5,
        title = 'This is a post',
        content= 'This is the description'
    )
    post2 = Post(
        userId = 3,
        teamId = 5,
        title = 'This is a post',
        content= 'This is the description'
    )
    post3 = Post(
        userId = 4,
        teamId = 5,
        title = 'This is a post',
        content= 'This is the description'
    )
    post4 = Post(
        userId = 5,
        teamId = 5,
        title = 'This is a post',
        content= 'This is the description'
    )
    post5 = Post(
        userId = 6,
        teamId = 5,
        title = 'This is a post',
        content= 'This is the description'
    )    
    post6 = Post(
        userId = 7,
        teamId = 5,
        private=True,
        title = 'This is a post',
        content= 'This is the description'
    )
    db.session.add(post1)
    db.session.add(post2)
    db.session.add(post3)
    db.session.add(post4)
    db.session.add(post5)
    db.session.add(post6)
    db.session.commit()


    post1 = Post(
        userId = 2,
        teamId = 6,
        title = 'This is a post',
        content= 'This is the description'
    )
    post2 = Post(
        userId = 3,
        teamId = 6,
        title = 'This is a post',
        content= 'This is the description'
    )
    post3 = Post(
        userId = 4,
        teamId = 6,
        title = 'This is a post',
        content= 'This is the description'
    )
    post4 = Post(
        userId = 5,
        teamId = 6,
        title = 'This is a post',
        content= 'This is the description'
    )
    post5 = Post(
        userId = 6,
        teamId = 6,
        title = 'This is a post',
        content= 'This is the description'
    )    
    post6 = Post(
        userId = 7,
        teamId = 6,
        private=True,
        title = 'This is a post',
        content= 'This is the description'
    )
    db.session.add(post1)
    db.session.add(post2)
    db.session.add(post3)
    db.session.add(post4)
    db.session.add(post5)
    db.session.add(post6)
    db.session.commit()

    post1 = Post(
        userId = 2,
        teamId = 7,
        title = 'This is a post',
        content= 'This is the description'
    )
    post2 = Post(
        userId = 3,
        teamId = 7,
        title = 'This is a post',
        content= 'This is the description'
    )
    post3 = Post(
        userId = 4,
        teamId = 7,
        title = 'This is a post',
        content= 'This is the description'
    )
    post4 = Post(
        userId = 5,
        teamId = 7,
        title = 'This is a post',
        content= 'This is the description'
    )
    post5 = Post(
        userId = 6,
        teamId = 7,
        title = 'This is a post',
        content= 'This is the description'
    )    
    post6 = Post(
        userId = 7,
        teamId = 7,
        private=True,
        title = 'This is a post',
        content= 'This is the description'
    )
    db.session.add(post1)
    db.session.add(post2)
    db.session.add(post3)
    db.session.add(post4)
    db.session.add(post5)
    db.session.add(post6)
    db.session.commit()

    post1 = Post(
        userId = 2,
        teamId = 8,
        title = 'This is a post',
        content= 'This is the description'
    )
    post2 = Post(
        userId = 3,
        teamId = 8,
        title = 'This is a post',
        content= 'This is the description'
    )
    post3 = Post(
        userId = 4,
        teamId = 8,
        title = 'This is a post',
        content= 'This is the description'
    )
    post4 = Post(
        userId = 5,
        teamId = 8,
        title = 'This is a post',
        content= 'This is the description'
    )
    post5 = Post(
        userId = 6,
        teamId = 8,
        title = 'This is a post',
        content= 'This is the description'
    )    
    post6 = Post(
        userId = 7,
        teamId = 8,
        private=True,
        title = 'This is a post',
        content= 'This is the description'
    )
    db.session.add(post1)
    db.session.add(post2)
    db.session.add(post3)
    db.session.add(post4)
    db.session.add(post5)
    db.session.add(post6)
    db.session.commit()

    post1 = Post(
        userId = 2,
        teamId = 9,
        title = 'This is a post',
        content= 'This is the description'
    )
    post2 = Post(
        userId = 3,
        teamId = 9,
        title = 'This is a post',
        content= 'This is the description'
    )
    post3 = Post(
        userId = 4,
        teamId = 9,
        title = 'This is a post',
        content= 'This is the description'
    )
    post4 = Post(
        userId = 5,
        teamId = 9,
        title = 'This is a post',
        content= 'This is the description'
    )
    post5 = Post(
        userId = 6,
        teamId = 9,
        title = 'This is a post',
        content= 'This is the description'
    )    
    post6 = Post(
        userId = 7,
        teamId = 9,
        private=True,
        title = 'This is a post',
        content= 'This is the description'
    )
    db.session.add(post1)
    db.session.add(post2)
    db.session.add(post3)
    db.session.add(post4)
    db.session.add(post5)
    db.session.add(post6)
    db.session.commit()


def undo_teams():
    db.session.execute('TRUNCATE teams RESTART IDENTITY CASCADE;')
    db.session.execute('TRUNCATE teammembers RESTART IDENTITY CASCADE;')
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')

    db.session.commit()
