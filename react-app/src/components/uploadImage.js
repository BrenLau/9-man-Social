import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { makeTeamThunk } from '../store/teams';
import { yourTeamThunk } from '../store/teammember';
import { uploadTeamImageThunk } from '../store/teams';

const UploadTeam = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const userId = useSelector(state => state.session.user.id)
    const { teamId } = useParams()

    const [image, setImage] = useState()
    const [errs, setErrs] = useState([])

    useEffect(() => {

    }, [image])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append("image", image[0]);


        const res = await fetch(`/api/images/team/${parseInt(teamId)}`, {
            method: "POST",
            body: formData,
        });
        if (res) {
            console.log(await res.json())
        }
    }

    return (
        <form onSubmit={handleSubmit} className='createateamform'>
            <h3 id='h3forupload' >Upload Image</h3>
            {errs && errs.map(err => <div className='errorsdivs'>{err}</div>)}
            <label className='labelforcreateteam'>Image<input type='file' accept="image/*" className='inputcreate' onChange={(e) => { setImage(e.target.files) }}></input></label>
            <button disabled={errs.length > 0} id='submitcreateteam' >Submit</button>
        </form>
    )
}

export default UploadTeam
