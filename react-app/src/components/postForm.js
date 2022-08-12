import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { NavLink, useParams } from "react-router-dom"
import { makePostThunk } from "../store/post"
import './teamList.css'
import './postList.css'
import './Home.css'
const PostForm = ({ setMakePost }) => {
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
        if (reg.length > 50) err.push('Title must not contain over 50 characters')
        if (!content.replaceAll(' ', '').length) err.push('Content must not be empty')
        setErrors(err)
    }, [title, content, publicc])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (errors.length){
         setSubmitted(true)   
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
            <div><label>Title*<input value={title} onChange={(e) => { setTitle(e.target.value) }} type='text'></input></label></div>
            <div><label>Content*<input value={content} onChange={(e) => { setContent(e.target.value) }} type='text'></input></label></div>
            <div><label>Private<input onChange={(e) => { setPublicc(e.target.checked) }} type='checkbox'></input></label></div>
            <button className='teampagebuttons' disabled={submitted && errors.length > 0}  >Post</button>
        </form>
    )
}


export default PostForm
