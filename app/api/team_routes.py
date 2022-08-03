from flask import Blueprint, jsonify
from app.models import User
from app.models.db import Team

team_routes = Blueprint('teams', __name__)


@team_routes.route('')
def allTeams():
    teams = Team.query.all()
    print('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@', teams)
    return {"teams": [team.to_dict() for team in teams]}
