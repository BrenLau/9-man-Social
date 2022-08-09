import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { makeTeamThunk, getTeamsThunk } from '../store/teams';
import { yourTeamThunk } from '../store/teammember';
import { uploadTeamImageThunk } from '../store/teams';

const UploadTeam = ({ setUpload, setButton2, setButton3 }) => {
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
        if (image) {

            formData.append("image", image[0]);
        }



        const res = await fetch(`/api/images/team/${parseInt(teamId)}`, {
            method: "POST",
            body: formData,
        });
        if (res) {
            const data = await res.json()
            setErrs(data.errors)
        }

        if (res.ok) {
            dispatch(getTeamsThunk())
            setUpload(false)
            setButton2(true)
            setButton3(true)
        }


    }

    return (
        <form onSubmit={handleSubmit} className='createateamform'>
            <h3 id='h3forupload' >Upload Image</h3>
            {errs && <div className='errorsdivs'>{errs}</div>}
            <label className='labelforcreateteam'>Image<input type='file' accept="image/*" className='inputcreate' onChange={(e) => { setImage(e.target.files) }}></input></label>
            <button id='submitcreateteam' >Submit</button>
        </form>
    )
}

export default UploadTeam
