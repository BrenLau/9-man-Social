import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { getTeamsThunk } from "../store/teams"
import "./teamList.css"
const TeamPage = () => {
    const dispatch = useDispatch()
    const { teamId } = useParams()

    const teams = useSelector(state => state.teams)

    let team;
    if (teams[teamId]) {
        team = teams[teamId]
    }

    useEffect(() => {
        dispatch(getTeamsThunk())
    }, [dispatch])

    return (
        <div>
            {team && <h1>{team.name}</h1>}
            {team && <div>{team.description}</div>}
        </div>
    )
}


export default TeamPage
