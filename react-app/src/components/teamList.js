import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { getTeamsThunk } from "../store/teams"
import "./teamList.css"
const TeamList = () => {
    const dispatch = useDispatch()
    const teams = useSelector(state => state.teams.teams)
    console.log(teams)

    useEffect(() => {
        dispatch(getTeamsThunk())
    }, [dispatch])
    // if (!teams) {
    //     return null
    // }
    return (
        Array.isArray(teams) && <ul className='teamdisplay'>
            {teams.map(team => {
                return (

                    <li className="teamcapsule">{team.name}</li>
                )
            })}
        </ul>
    )
}


export default TeamList
