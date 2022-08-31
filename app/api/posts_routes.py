from flask import Blueprint, jsonify, request, redirect
from app.models import User
from app.models.db import Team, db, TeamMember, Post
from flask_login import login_required
from ..forms.postform import CreatePostForm

post_routes = Blueprint('posts', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@post_routes.route('', methods=['POST'])
@login_required
def makeAPost():
    # data = request.json
    # userId = data['userId']
    # teamId = data['teamId']
    # title = data['title']
    # content = data['content']
    # private = data['private']
    # newPost = Post(userId = userId, teamId = teamId, title = title, content = content, private = private)
    # db.session.add(newPost)
    # db.session.commit()
    # return {"post": [(newPost.to_dict(), newPost.user.to_dict())]}
    form = CreatePostForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        post = Post(
            title=form.data['title'],
            content = form.data['content'],
            userId = form.data['userId'],
            teamId = form.data['teamId'],
            private=form.data['private']
        )
        db.session.add(post)
        db.session.commit()

        return {"post": [(post.to_dict(), post.user.to_dict(), post.team.to_dict())]}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401



@post_routes.route('/<int:teamId>', methods=['GET'])
@login_required
def getPosts(teamId):
    posts = Post.query.filter(Post.teamId == teamId).all()



    return {"posts": [(post.to_dict(), post.user.to_dict(), post.team.to_dict()) for post in posts]}

@post_routes.route('/one/<int:postId>', methods=['GET'])
@login_required
def getOnePost(postId):
    post = Post.query.get(postId)

    return {"post": [(post.to_dict(), post.user.to_dict(), post.team.to_dict())]}

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
