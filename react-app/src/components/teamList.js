import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { getTeamsThunk } from "../store/teams"
import { NavLink } from "react-router-dom"
import "./teamList.css"

const TeamList = ({ setCurrentTeam }) => {
    const dispatch = useDispatch()
    const teams = useSelector(state => state.teams)

    useEffect(() => {
        dispatch(getTeamsThunk())
    }, [dispatch])

    return (
        Array.isArray(Object.values(teams)) && <div className='teamdisplay'>
            {Object.values(teams).map(team => {
                return (

                    <NavLink onClick={(e) => { setCurrentTeam(team.id) }} key={team.id} to={`/teams/${team.id}`} activeClassName='activeteam' className="teamcapsule">{team.name}</NavLink>
                )
            })}
        </div>
    )
}


export default TeamList
