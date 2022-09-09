import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { NavLink, useParams, useHistory } from "react-router-dom"
import { getTeamsThunk, deleteTeamThunk } from "../store/teams"
import "./teamList.css"
import { yourTeamThunk, applyTeamThunk, ourTeamThunk, leaveTeamThunk } from "../store/teammember"
import PostForm from "./postForm"
import PostList from "./postList"
import { getPostsThunk } from "../store/post"
import UploadTeam from "./uploadImage"

const TeamPage = ({ upload, setUpload, makePost, setMakePost, setCurrentTeam, hidden, setHidden, sessionUser, thisTeamMembers, setButton1, button1, setButton2, button2, setButton3, button3 }) => {
    const dispatch = useDispatch()
    const { teamId } = useParams()
    const history = useHistory()

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
            setCurrentTeam(teams[teamId])
        }
        if (sessionUser) {
            dispatch(yourTeamThunk(user.id))
        }
        dispatch(getPostsThunk(parseInt(teamId)))
    }, [dispatch])
    if (!team) return null


    if (!teamMember) return null

    if (teamMember) return (
        team.id && <div id='teamPage' >
            {team && <div className="buttondivs">
                {button1 && team.captainId === user.id && teamMember.teamId === team.id && <div className={upload ? "upload" : null} >
                    {team.captainId === user.id && teamMember.teamId === team.id && <button className='teampagebuttons' onClick={() => {
                        setUpload(!upload)
                        setButton2(!button2)
                        setButton3(!button3)
                        setMakePost(false)
                    }}>Upload Image</button>}
                    {upload && <UploadTeam setUpload={setUpload} setButton2={setButton2} setButton3={setButton3} />}
                </div>}

                {button2 && !hidden && captain && <button className='teampagebuttons' onClick={(e) => {
                    e.preventDefault()
                    setHidden(!hidden)
                    setButton1(!button1)
                    setButton3(!button3)
                    setMakePost(false)

                }} >Delete Team</button>}

                {button3 && captain && <NavLink className='teampagebuttons' to={`/editteam/${team.id}`}>Edit Team</NavLink>}
            </div>}
            {hidden && user && <button className='teampagebuttons' onClick={async (e) => {
                e.preventDefault()
                setHidden(false)
                await dispatch(deleteTeamThunk(parseInt(teamId)))
                await dispatch(yourTeamThunk(user.id))
                await dispatch(getPostsThunk(parseInt(teamId)))
                setMakePost(false)

                history.push('/')
            }} >Confirm delete</button>}
            {hidden && <button className='teampagebuttons' onClick={(e) => {
                e.preventDefault()
                setHidden(false)
                setButton1(true)
                setButton3(true)
                setMakePost(false)


            }} >Cancel</button>}

            {makePost && <PostForm setMakePost={setMakePost} setHidden={setHidden} setButton1={setButton1} setButton2={setButton2} setButton3={setButton3} />}
            {team.image && <div className='postListId' style={{
                backgroundImage: `url(${team.image})`, backgroundRepeat: 'no-repeat', backgroundSize: '100% 100%'
            }}>
                {team && team.id === teamMember.teamId && teamMember !== 'none' && <button className='teampagebuttonsmakepost' onClick={() => {
                    setMakePost(true)
                    setButton1(false)
                    setButton2(false)
                    setButton3(false)
                    setHidden(false)
                }}>Make Post</button>}
                <PostList thisTeamMembers={thisTeamMembers} teamMember={teamMember} />
            </div>}
            {!team.image && <div className='postListId' style={{
                backgroundImage: 'none', backgroundRepeat: 'no-repeat'
            }}>
                {team && team.id === teamMember.teamId && teamMember !== 'none' && <button className='teampagebuttons' onClick={() => {
                    setMakePost(true)
                    setButton1(false)
                    setButton2(false)
                    setButton3(false)
                    setHidden(false)

                }}>Make Post</button>}
                <PostList teamMember={teamMember} />
            </div>}

        </div>
    )
}


export default TeamPage
