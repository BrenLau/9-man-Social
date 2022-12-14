import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { editTeamThunk } from '../store/teams';

const UpdateTeam = ({ nam, desc }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const userId = useSelector(state => state.session.user.id)
    const teams = useSelector(state => state.teams)

    const [errs, setErrs] = useState([])
    const { teamId } = useParams()
    const team = teams[parseInt(teamId)]
    let captainId;
    if (team) {
        captainId = team.captainId
    }

    if (team) {
        if (userId !== team.captainId) {
            history.push('/')
        }
    }
    const [name, setName] = useState(team.name)
    const [description, setDescription] = useState(team.description)

    useEffect(() => {
        const errors = []
        if (!name.length) errors.push('Team Name must have a value')
        if (name.length > 0 && name.length < 5) errors.push('Team Name must have at least 5 characters')
        if (name.length > 21) errors.push('Team Name must have less than 20 characters')
        if (!description.length) errors.push('Description cannot be empty')
        if (description.length > 250) errors.push('Description cannot have more than 250 characters')
        setErrs(errors)
    }, [name, description])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = {
            name,
            description,
            captainId: userId
        }
        await dispatch(editTeamThunk(data, teamId))
        history.push(`/teams/${teamId}`)
    }

    return (
        captainId === userId && <form onSubmit={handleSubmit} className='createateamform'>
            <div className='creatediv'>

                <h1 id='h1forcreateteam' >Edit Team</h1>
                {errs && errs.map(err => <div className='errorsdivs'>{err}</div>)}
                <label className='labelforcreateteam'>Team Name<input className='inputcreate' onChange={(e) => { setName(e.target.value) }} type='text' value={name}></input></label>
                <label className='labelforcreateteam'>Description<input className='inputcreate' onChange={(e) => { setDescription(e.target.value) }} type='text' value={description}></input></label>
                <button disabled={errs.length > 0} id='submitcreateteam' >Submit</button>
            </div>
        </form>
    )
}

export default UpdateTeam
