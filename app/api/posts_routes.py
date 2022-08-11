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



    return {"posts": [(post.to_dict(), post.user.to_dict()) for post in posts]}

@post_routes.route('/one/<int:postId>', methods=['GET'])
@login_required
def getOnePost(postId):
    post = Post.query.get(postId)

    return {"post": [(pot.to_dict(), pot.user.to_dict()) for pot in post]}

@post_routes.route('/each/<int:postId>', methods=['PUT'])
@login_required
def editOnePost(postId):
    post = Post.query.get(postId)
    post.title = request.json['title']
    post.content = request.json['content']
    db.session.commit()

    return post.to_dict()

@post_routes.route('/each/<int:postId>', methods=['DELETE'])
@login_required
def delOnePost(postId):
    post = Post.query.get(postId)
    db.session.delete(post)
    db.session.commit()
    return post.to_dict()
