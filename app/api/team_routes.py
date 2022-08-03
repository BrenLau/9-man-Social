from flask import Blueprint, jsonify, request, redirect
from app.models import User
from app.models.db import Team, db

team_routes = Blueprint('teams', __name__)


@team_routes.route('')
def allTeams():
    teams = Team.query.all()
    print('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@', teams)
    return {"teams": [team.to_dict() for team in teams]}


@team_routes.route('', methods=['POST'])
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
