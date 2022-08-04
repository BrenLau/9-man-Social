from flask import Blueprint, jsonify, request, redirect
from app.models import User
from app.models.db import Team, db, TeamMember, Post
from flask_login import login_required

post_routes = Blueprint('posts', __name__)

@post_routes.route('', methods=['POST'])
@login_required
def makeAPost():
    data = request.json
    userId = data['userId']
    teamId = data['teamId']
    title = data['title']
    content = data['content']
    private = data['private']
    newPost = Post(userId = userId, teamId = teamId, title = title, content = content, private = private)
    db.session.add(newPost)
    db.session.commit()
    return newPost.to_dict()


@post_routes.route('/<int:teamId>', methods=['GET'])
@login_required
def getPosts(teamId):
    posts = Post.query.filter(Post.teamId == teamId).all()

    return {"posts": [post.to_dict() for post in posts]}
