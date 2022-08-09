import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { NavLink, useParams } from "react-router-dom"
import { getTeamsThunk, deleteTeamThunk } from "../store/teams"
import "./teamList.css"
import { yourTeamThunk, applyTeamThunk, ourTeamThunk, leaveTeamThunk } from "../store/teammember"
import PostForm from "./postForm"
import PostList from "./postList"
import { getPostsThunk } from "../store/post"
import UploadTeam from "./uploadImage"

const TeamPage = ({ setCurrentTeam, hidden, setHidden, sessionUser }) => {
    const dispatch = useDispatch()
    const { teamId } = useParams()


    const [makePost, setMakePost] = useState(false)
    const [upload, setUpload] = useState(false)

    const user = useSelector(state => state.session.user)
    const teams = useSelector(state => state.teams)
    const teamMember = useSelector(state => state.members.yourTeam)



    let captain = false
    let team;
    if (teamId) {
        if (teams[teamId]) {
            team = teams[teamId]
            if (team.captainId === user.id) {
                captain = true
            }
        }
    }


    useEffect(() => {
        dispatch(getTeamsThunk())
        if (teamId) {
            setCurrentTeam(teamId)
        }
        if (sessionUser) {
            dispatch(yourTeamThunk(user.id))
        }
    }, [dispatch])
    if (!team) return null


    if (!teamMember) return null

    if (teamMember) return (
        team.id && <div id='teamPage' >
            {team.captainId === user.id && teamMember.teamId === team.id && <div className="upload" >
                {team.captainId === user.id && teamMember.teamId === team.id && <button onClick={() => setUpload(!upload)}>Upload Image</button>}
                {upload && <UploadTeam />}
            </div>}
            {team && <div className="buttondivs">
                {teamId && teamMember && teamMember === 'none' && <button className='teampagebuttons' onClick={async (e) => {
                    await dispatch(applyTeamThunk(user.id, team.id))
                    await dispatch(ourTeamThunk(team.id))
                    await dispatch(getPostsThunk(team.id))
                }}>Join Team</button>}
                {team.captainId !== user.id && team.id === teamMember.teamId && teamMember !== 'none' && <button className='teampagebuttons' onClick={async (e) => {
                    await dispatch(leaveTeamThunk(user.id, team.id))
                    await dispatch(ourTeamThunk(team.id))
                    await dispatch(getPostsThunk((team.id)))
                }}>Leave Team</button>}

                {!hidden && captain && <button className='teampagebuttons' onClick={(e) => {
                    e.preventDefault()
                    setHidden(!hidden)
                }} >Delete Team</button>}

                {captain && <NavLink className='teampagebuttons' to={`/editteam/${team.id}`}>Edit Team</NavLink>}
            </div>}
            {hidden && user && <button onClick={async (e) => {
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
            <div id='postListId' style={{
                backgroundImage: `url(${team.image})`, backgroundRepeat: 'no-repeat'
            }}>
                {team && team.id === teamMember.teamId && teamMember !== 'none' && <button className='teampagebuttons' onClick={() => { setMakePost(!makePost) }}>Make Post</button>}
                <PostList teamMember={teamMember} />
            </div>

        </div>
    )
}


export default TeamPage
