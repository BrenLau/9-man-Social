import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { NavLink, useParams } from "react-router-dom"
import { getTeamsThunk, deleteTeamThunk } from "../store/teams"
import "./teamList.css"
import { yourTeamThunk, applyTeamThunk, ourTeamThunk, leaveTeamThunk } from "../store/teammember"
import PostForm from "./postForm"
import PostList from "./postList"
import { getPostsThunk } from "../store/post"

const TeamPage = ({ setCurrentTeam, teamMember }) => {
    const dispatch = useDispatch()
    const { teamId } = useParams()


    const [hidden, setHidden] = useState(false)
    const [makePost, setMakePost] = useState(false)

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
    if (!teamId) return null
    return (
        teamId && <div id='teamPage'>
            {team && <div className="buttondivs">
                {teamMember === 'none' && <button className='teampagebuttons' onClick={async (e) => {
                    await dispatch(applyTeamThunk(user.id, parseInt(teamId)))
                    await dispatch(ourTeamThunk(parseInt(teamId)))
                    await dispatch(getPostsThunk(parseInt(teamId)))
                }}>Join Team</button>}
                {team.id === teamMember.teamId && teamMember !== 'none' && <button className='teampagebuttons' onClick={async (e) => {
                    await dispatch(leaveTeamThunk(user.id, parseInt(teamId)))
                    await dispatch(ourTeamThunk(parseInt(teamId)))
                    await dispatch(getPostsThunk(parseInt(teamId)))
                }}>Leave Team</button>}
                {!hidden && captain && <button className='teampagebuttons' onClick={(e) => {
                    e.preventDefault()
                    setHidden(!hidden)
                }} >Delete Team</button>}
                {captain && <NavLink to={`/editteam/${team.id}`}>Edit Team</NavLink>}
            </div>}
            {hidden && <button onClick={async (e) => {
                e.preventDefault()
                setHidden(false)
                await dispatch(deleteTeamThunk(parseInt(teamId)))
                await dispatch(yourTeamThunk(user.id))
                await dispatch(getPostsThunk(parseInt(teamId)))
            }} >Confirm delete</button>}
            {hidden && <button onClick={(e) => {
                e.preventDefault()
                setHidden(false)

            }} >Cancel</button>}

            {team && <h1>{team.name}</h1>}
            {team && <div>{team.description}</div>}
            {makePost && <PostForm setMakePost={setMakePost} />}
            <div id='postListId'>
                {team.id === teamMember.teamId && teamMember !== 'none' && <button className='teampagebuttons' onClick={() => { setMakePost(!makePost) }}>Make Post</button>}
                <PostList teamMember={teamMember} />
            </div>

        </div>
    )
}


export default TeamPage
