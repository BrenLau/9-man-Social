import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { getTeamsThunk } from "../store/teams"
import { NavLink } from "react-router-dom"
import "./teamList.css"
import { getPostsThunk } from "../store/post"

const TeamList = ({ upload, setUpload, setCurrentTeam, makePost, setMakePost, setHidden, teamMember, sessionUser, button1, setButton1, button2, setButton2, button3, setButton3 }) => {
    const dispatch = useDispatch()
    const teams = useSelector(state => state.teams)
    const [hover, setHover] = useState(false)
    const [currentHover, setCurrentHover] = useState('')

    useEffect(() => {
        dispatch(getTeamsThunk())
    }, [dispatch])

    return (
        <div id='teamlistind'>
            {sessionUser && teamMember === 'none' && <NavLink onClick={() => {
                setCurrentTeam('')
                setButton1(true)
                setButton2(true)
                setButton3(true)
                setMakePost(false)
                setUpload(false)
            }} className='createteam' to='/createNewTeam'>
                Create a team
            </NavLink>}
            {
                sessionUser && teamMember && teamMember !== 'none' && <NavLink className='createteam' to={`/teams/${teamMember.teamId}`} onClick={(e) => {
                    setCurrentTeam(teams[teamMember.teamId])
                    setButton1(true)
                    setButton2(true)
                    setButton3(true)
                    setMakePost(false)
                    setUpload(false)

                }}>Your Team</NavLink>
            }
            {
                Array.isArray(Object.values(teams)) && <div id='teamdisplay'>
                    {Object.values(teams).map(team => {
                        if (team.image) return (

                            <NavLink onMouseOver={() => {
                                setCurrentHover(team.id)
                                setHover(true)
                            }} onMouseLeave={() => {
                                setCurrentHover('')
                                setHover(false)
                            }} style={{
                                backgroundImage: `url(${team.image})`, backgroundRepeat: 'no-repeat', backgroundSize: '100% 100%'
                            }} onClick={async (e) => {
                                await setCurrentTeam(team)
                                await dispatch(getPostsThunk(team.id))
                                await setButton1(true)
                                await setButton2(true)
                                await setButton3(true)
                                await setMakePost(false)
                                await setUpload(false)

                                await setHidden(false)
                            }} key={team.id} to={`/teams/${team.id}`} activeClassName='activeteam' className="teamcapsules">{hover && currentHover == team.id ? <div className="hoverdiv"><div className="bubblediv">{team.name}</div></div> : ''}</NavLink>
                        )
                        if (team) return (
                            <NavLink onMouseOver={() => {
                                setCurrentHover(team.id)
                                setHover(true)
                            }} onMouseLeave={() => {
                                setCurrentHover('')
                                setHover(false)
                            }} onClick={async (e) => {
                                await setCurrentTeam(team)
                                await dispatch(getPostsThunk(team.id))
                                await setButton1(true)
                                await setButton2(true)
                                await setButton3(true)
                                await setMakePost(false)
                                await setUpload(false)

                                await setHidden(false)
                            }} key={team.id} to={`/teams/${team.id}`} activeClassName='activeteam' className="teamcapsule">{team.name.split(' ').length < 2 && team.name.split(' ')[0][0] || team.name.split(' ')[0][0] + team.name.split(' ')[1][0]}{hover && currentHover == team.id ? <div className="hoverdiv"><div className="bubblediv">{team.name}</div></div> : ''}</NavLink>
                        )
                    })}
                </div>
            }
        </div >
    )
}


export default TeamList
