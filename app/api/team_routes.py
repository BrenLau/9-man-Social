from flask import Blueprint, jsonify, request, redirect
from app.models import User
from app.models.db import Team, db, TeamMember
from flask_login import login_required

team_routes = Blueprint('teams', __name__)


@team_routes.route('')
@login_required
def allTeams():
    teams = Team.query.all()
    print('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%',teams)
    return {"teams": [team.to_dict() for team in teams]}


@team_routes.route('', methods=['POST'])
@login_required
def createTeam():
    data = request.json
    name = data['name']
    description = data['description']
    captainId = data['captainId']

    newTeam = Team(name=name, description=description, captainId=captainId)
    db.session.add(newTeam)
    db.session.commit()

    newMember = TeamMember(
        userId=captainId,
        teamId=newTeam.id,
        admin=True,
        request=True
    )
    db.session.add(newMember)
    db.session.commit()

    return newTeam.to_dict()


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
    # print('no team member presented$$$$$$$$$$$$$$$$')
    print('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@', teammember)

    # db.session.delete()
    # db.session.commit()
    if len(teammember) < 1:
        print('no team member presented$$$$$$$$$$$$$$$$')
        return {"none":"none"}
    if teammember[0]:
     return teammember[0].to_dict()

@team_routes.route('/members/<int:teamId>', methods=['GET'])
@login_required
def findYourMems(teamId):
    team = Team.query.get(teamId)
    members = team.members
    print('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$',members)
    return {"members": [member.user.to_dict() for member in members]}
