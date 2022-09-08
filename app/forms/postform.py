from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField
from wtforms.validators import DataRequired, Email, ValidationError, Length, Email, EqualTo
from ..models.db import Team


class CreatePostForm(FlaskForm):
    title = StringField('title', validators=[DataRequired(), Length(1, 40)])
    content = StringField('content', validators=[DataRequired(), Length(1, 10000)])
    userId = IntegerField('userId')
    teamId = IntegerField('teamId')
    private = BooleanField('private')
