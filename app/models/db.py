from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class Team(db.Model):
    __tablename__ = "teams"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False, unique=True)
    image = db.Column(db.String)
    captainId = db.Column(
        db.Integer, db.ForeignKey("users.id"), nullable=False, unique=True)
    description = db.Column(db.Text, default=False, nullable=False)

    captain = db.relationship("User", back_populates="capping")
    members = db.relationship(
        "TeamMember", back_populates="team", cascade="all, delete")
    posts = db.relationship(
        "Post", back_populates="team", cascade="all, delete")
    tournaments = db.relationship(
        "Tournament", back_populates="team", cascade="all, delete")

    def to_dict(self):
        return{
            "id": self.id,
            "name": self.name,
            "image": self.image,
            "captainId": self.captainId,
            "description": self.description,
            # "captain": self.captain
        }


class TeamMember(db.Model):
    __tablename__ = "teammembers"

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    teamId = db.Column(db.Integer, db.ForeignKey("teams.id"), nullable=False)
    admin = db.Column(db.Boolean, default=False, nullable=False)
    request = db.Column(db.Boolean, default=False, nullable=False)

    user = db.relationship("User", back_populates="team")
    team = db.relationship("Team", back_populates="members")

    def to_dict(self):
        return{
            "id": self.id,
            "userId": self.userId,
            "teamId": self.teamId,
            "admin": self.admin,
            "request": self.request
        }


class Post(db.Model):
    __tablename__ = "posts"

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    teamId = db.Column(db.Integer, db.ForeignKey("teams.id"), nullable=False)
    title = db.Column(db.Text, nullable=False)
    content = db.Column(db.Text, nullable=False)
    private = db.Column(db.Boolean)

    user = db.relationship("User", back_populates="posts")
    team = db.relationship("Team", back_populates="posts")

    def to_dict(self):
        return{
            "id": self.id,
            "userId": self.userId,
            "teamId": self.teamId,
            "title": self.title,
            "content": self.content,
            "private": self.private
        }


class Tournament(db.Model):
    __tablename__ = "tournaments"

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    teamId = db.Column(db.Integer, db.ForeignKey("teams.id"), nullable=False)
    title = db.Column(db.Text, nullable=False)
    description = db.Column(db.Text, nullable=False)
    date = db.Column(db.String, nullable=False)

    user = db.relationship("User", back_populates="tournaments")
    team = db.relationship("Team", back_populates="tournaments")

    def to_dict(self):
        return{
            "id": self.id,
            "userId": self.userId,
            "teamId": self.teamId,
            "title": self.title,
            "description": self.description,
            "date": self.date
        }
