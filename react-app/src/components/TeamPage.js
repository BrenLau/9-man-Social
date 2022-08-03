import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { NavLink, useParams } from "react-router-dom"
import { getTeamsThunk } from "../store/teams"
import "./teamList.css"
const TeamPage = () => {
    const dispatch = useDispatch()
    const { teamId } = useParams()
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
    }, [dispatch])

    return (
        <div>
            {captain && <NavLink to={`/editteam/${team.id}`}>Edit Team</NavLink>}

            {team && <h1>{team.name}</h1>}
            {team && <div>{team.description}</div>}
        </div>
    )
}


export default TeamPage
