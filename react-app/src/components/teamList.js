import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { getTeamsThunk } from "../store/teams"
import { NavLink, useParams } from "react-router-dom"
import "./teamList.css"
import { getPostsThunk } from "../store/post"

const TeamList = ({ setCurrentTeam, setHidden }) => {
    const dispatch = useDispatch()
    const teams = useSelector(state => state.teams)

    const { teamId } = useParams()

    useEffect(() => {
        dispatch(getTeamsThunk())
    }, [dispatch])

    return (
        Array.isArray(Object.values(teams)) && <div className='teamdisplay'>
            {Object.values(teams).map(team => {
                if (team.image) return (
                    <NavLink style={{
                        backgroundImage: `url(${team.image})`, backgroundRepeat: 'no-repeat', backgroundSize: '100% 100%'
                    }} onClick={async (e) => {
                        await setCurrentTeam(team.id)
                        await dispatch(getPostsThunk(team.id))
                        await setHidden(false)
                    }} key={team.id} to={`/teams/${team.id}`} activeClassName='activeteam' className="teamcapsules"></NavLink>
                )
                if (team) return (
                    <NavLink onClick={async (e) => {
                        await setCurrentTeam(team.id)
                        await dispatch(getPostsThunk(team.id))
                        await setHidden(false)
                    }} key={team.id} to={`/teams/${team.id}`} activeClassName='activeteam' className="teamcapsule">{team.name.split(' ').length < 2 && team.name.split(' ')[0][0] || team.name.split(' ')[0][0] + team.name.split(' ')[1][0]}</NavLink>
                )
            })}
        </div>
    )
}


export default TeamList
