"""empty message

Revision ID: 8c2481a81471
Revises: f8b2f146dd11
Create Date: 2022-08-02 17:08:35.236139

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '8c2481a81471'
down_revision = 'f8b2f146dd11'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_unique_constraint(None, 'teams', ['name'])
    op.create_unique_constraint(None, 'teams', ['captainId'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'teams', type_='unique')
    op.drop_constraint(None, 'teams', type_='unique')
    # ### end Alembic commands ###
