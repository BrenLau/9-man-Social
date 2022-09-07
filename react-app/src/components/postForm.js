import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { NavLink, useParams } from "react-router-dom"
import { makePostThunk } from "../store/post"
import './teamList.css'
import './postList.css'
import './Home.css'
const PostForm = ({ setMakePost, upload, setUpload, setCurrentTeam, makePost, setHidden, teamMember, sessionUser, button1, setButton1, button2, setButton2, button3, setButton3 }) => {
    const dispatch = useDispatch()
    const { teamId } = useParams()
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [publicc, setPublicc] = useState(false)
    const [errors, setErrors] = useState([])
    const [submitted, setSubmitted] = useState(false)


    const user = useSelector(state => state.session.user)


    useEffect(() => {
        const err = []
        const reg = title.replaceAll(' ', '')

        if (!reg.length) err.push('Title must not be empty')
        if (title.length > 40) err.push('Title must not contain over 40 characters')
        if (!content.replaceAll(' ', '').length) err.push('Content must not be empty')
        setErrors(err)
    }, [title, content, publicc])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (errors.length) {
            setSubmitted(true)
            return
        }
        const data = {
            title,
            content,
            private: publicc,
            userId: user.id,
            teamId
        }
        await dispatch(makePostThunk(data))
        setTitle('')
        setContent('')
        setMakePost(false)
    }

    return (
        <form className="editPostForm" onSubmit={handleSubmit}>
            {submitted && errors.length > 0 && errors.map(error => (
                <div className='errorsdivs' key={error}>{error}</div>
            ))}
            <div><label>Title*<input className='inputcreate' value={title} onChange={(e) => { setTitle(e.target.value) }} type='text'></input></label></div>
            <div><label>Content*<input className='inputcreate' value={content} onChange={(e) => { setContent(e.target.value) }} type='text'></input></label></div>
            <div><label>Private<input onChange={(e) => { setPublicc(e.target.checked) }} type='checkbox'></input></label></div>
            <div className="postbuttons">

                <button className='teampagebuttons' disabled={submitted && errors.length > 0}  >Post</button>
                <button className='teampagebuttons' onClick={() => {
                    setMakePost(false)
                    setHidden(false)
                    setButton1(true)
                    setButton2(true)
                    setButton3(true)
                    setMakePost(false)
                }}>Cancel</button>

            </div>
        </form>
    )
}


export default PostForm
