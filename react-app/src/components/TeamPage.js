import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { NavLink, useParams } from "react-router-dom"
import { getTeamsThunk, deleteTeamThunk } from "../store/teams"
import "./teamList.css"
import { yourTeamThunk } from "../store/teammember"

const TeamPage = ({ setCurrentTeam }) => {
    const dispatch = useDispatch()
    const { teamId } = useParams()

    const [hidden, setHidden] = useState(false)

    const user = useSelector(state => state.session.user)
    const teams = useSelector(state => state.teams)

    let captain = false
    let team;
    if (teams[teamId]) {
        team = teams[teamId]
        if (team.captainId === user.id) {
            captain = true
        }
    }


    useEffect(() => {
        dispatch(getTeamsThunk())
        setCurrentTeam(teamId)
    }, [dispatch])

    return (
        <div>

            <div>
                {!hidden && captain && <button onClick={(e) => {
                    e.preventDefault()
                    setHidden(!hidden)
                }} >Delete Team</button>}
                {captain && <NavLink to={`/editteam/${team.id}`}>Edit Team</NavLink>}
            </div>
            {hidden && <button onClick={async (e) => {
                e.preventDefault()
                setHidden(false)
                await dispatch(deleteTeamThunk(teamId))
                await dispatch(yourTeamThunk(user.id))
            }} >Confirm delete</button>}
            {hidden && <button onClick={(e) => {
                e.preventDefault()
                setHidden(false)

            }} >Cancel</button>}

            {team && <h1>{team.name}</h1>}
            {team && <div>{team.description}</div>}
        </div>
    )
}


export default TeamPage
