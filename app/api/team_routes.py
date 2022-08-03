from flask import Blueprint, jsonify, request, redirect
from app.models import User
from app.models.db import Team, db
from flask_login import login_required

team_routes = Blueprint('teams', __name__)


@team_routes.route('')
@login_required
def allTeams():
    teams = Team.query.all()
    print('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@', teams)
    return {"teams": [team.to_dict() for team in teams]}


@team_routes.route('', methods=['POST'])
@login_required
def createTeam():
    data = request.json
    name = data['name']
    description = data['description']
    captainId = data['captainId']
    print('##########################################',
          name, description, captainId)
    newTeam = Team(name=name, description=description, captainId=captainId)
    db.session.add(newTeam)
    db.session.commit()
    return newTeam.to_dict()


@team_routes.route('/<int:teamId>', methods=['PUT'])
@login_required
def updateTeam(teamId):
    data = request.json
    name = data['name']
    description = data['description']
    captainId = data['captainId']
    print('##########################################',
          name, description, captainId)
    team = Team.query.get(teamId)
    print('##########################################',
          team)
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
