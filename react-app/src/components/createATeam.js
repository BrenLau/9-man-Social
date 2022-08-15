import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { makeTeamThunk } from '../store/teams';
import { yourTeamThunk } from '../store/teammember';
import './Home.css'

const CreateTeam = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const userId = useSelector(state => state.session.user.id)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [errs, setErrs] = useState([])
    const [ers, setErrors] = useState()
    const [submitted, setSubmitted] = useState(false)

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
        if (errs.length) {
            setSubmitted(true)
            return
        }
        const data = {
            name,
            description,
            captainId: userId
        }
        const team = await dispatch(makeTeamThunk(data))
        if (team) {
            const arr = []
            team.forEach(info => {
                const split = info.split(':')
                arr.push(split[1])
            })
            setErrors(arr)
            return
        }


        await dispatch(yourTeamThunk(userId))
        history.push('/')
    }

    return (
        <form onSubmit={handleSubmit} className='createateamform'>
            <div className='creatediv'>

                <h1 id='h1forcreateteam' >Create a Team</h1>
                {ers && ers.map(err => <div className='errorsdivs'>{err}</div>)}
                {submitted && errs && errs.map(err => <div className='errorsdivs'>{err}</div>)}
                <label className='labelforcreateteam'>Team Name*<input className='inputcreate' onChange={(e) => { setName(e.target.value) }} type='text' value={name}></input></label>
                <label className='labelforcreateteam'>Description*<input className='inputcreate' onChange={(e) => { setDescription(e.target.value) }} type='text' value={description}></input></label>
                <button disabled={submitted && errs.length > 0} id='submitcreateteam' >Submit</button>
            </div>
        </form>
    )
}

export default CreateTeam
