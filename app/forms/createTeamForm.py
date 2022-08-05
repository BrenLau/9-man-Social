from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError, Length, Email, EqualTo
from ..models.db import Team

def uniqueTeam(form, field):
    name = field.data
    team = Team.query.filter(Team.name == name).first()
    if team:
        raise ValidationError('Team name already exists')


class CreateTeamForm(FlaskForm):
    name = StringField('name', validators=[DataRequired(), Length(5, 20), uniqueTeam])
    description = StringField('description', validators=[DataRequired(), Length(1, 250)])
    captainId = IntegerField('captainId')
