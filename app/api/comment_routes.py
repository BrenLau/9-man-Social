from flask import Blueprint, jsonify, request, redirect
from app.models import User
from app.models.db import Team, db, TeamMember, Post, Comment
from flask_login import login_required

comment_routes = Blueprint('comments', __name__)

@comment_routes.route('/post/<int:postId>', methods=['POST'])
@login_required
def makeComment(postId):
    data = request.json
    userId = data['userId']
    content= data['content']
    comment = Comment(
        userId= int(userId),
        postId= int(postId),
        content=content
    )
    db.session.add(comment)
    db.session.commit()
    return comment.to_dict()

@comment_routes.route('/post/<int:postId>', methods=['GET'])
@login_required
def getComments(postId):
    comments = Comment.query.filter(Comment.postId == postId)
    return {'comments': [comment.to_dict() for comment in comments]}

@comment_routes.route('/<int:commentId>', methods=['DELETE'])
@login_required
def deleteComment(commentId):
    comment = Comment.query.get(commentId)
    db.session.delete(comment)
    db.session.commit()
    return comment.to_dict()
