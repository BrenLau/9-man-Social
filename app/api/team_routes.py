from flask import Blueprint, jsonify, request, redirect
from app.models import User
from app.models.db import Team, db, TeamMember
from flask_login import login_required
from ..forms.createTeamForm import CreateTeamForm
from app import (
    upload_file_to_s3, allowed_file, get_unique_filename)

team_routes = Blueprint('teams', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@team_routes.route('')
@login_required
def allTeams():
    teams = Team.query.all()

    return {"teams": [team.to_dict() for team in teams]}


@team_routes.route('', methods=['POST'])
@login_required
def createTeam():

    form = CreateTeamForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        team = Team(
            name=form.data['name'],
            description = form.data['description'],
            captainId = form.data['captainId']
        )
        db.session.add(team)
        db.session.commit()
        newMember = TeamMember(
            userId=form.data['captainId'],
            teamId=team.id,
            admin=True,
            request=True
        )
        db.session.add(newMember)
        db.session.commit()
        return team.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401






@team_routes.route('/<int:teamId>', methods=['PUT'])
@login_required
def updateTeam(teamId):
    data = request.json
    name = data['name']
    description = data['description']
    captainId = data['captainId']

    team = Team.query.get(teamId)

    team.name = name
    team.description = description
    db.session.commit()
    return team.to_dict()


@team_routes.route('/<int:teamId>', methods=['DELETE'])
@login_required
def deleteTeam(teamId):
    team = Team.query.get(teamId)
    db.session.delete(team)
    db.session.commit()
    return team.to_dict()

@team_routes.route('/member/<int:userId>', methods=['GET'])
@login_required
def findYourTeam(userId):
    teammember = TeamMember.query.filter(TeamMember.userId == userId).all()

    if len(teammember) < 1:

        return {"none":"none"}
    if teammember[0]:
     return teammember[0].to_dict()

@team_routes.route('/members/<int:teamId>', methods=['GET'])
@login_required
def findYourMems(teamId):
    team = Team.query.get(teamId)
    members = team.members

    return {"members": [member.user.to_dict() for member in members]}

@team_routes.route('/apply', methods=['POST'])
@login_required
def applyForMems():
    data = request.json
    newmem = TeamMember(userId = data['userId'], teamId = data['teamId'])
    db.session.add(newmem)
    db.session.commit()

    return newmem.to_dict()


@team_routes.route('/member/<int:userId>/<int:teamId>', methods=['DELETE'])
@login_required
def leaveAsMems(userId, teamId):

    newmem = TeamMember.query.filter(TeamMember.userId == userId, TeamMember.teamId == teamId).all()

    db.session.delete(newmem[0])
    db.session.commit()
    return newmem[0].to_dict()
