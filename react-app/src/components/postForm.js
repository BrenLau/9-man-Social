import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { NavLink, useParams } from "react-router-dom"
import { makePostThunk } from "../store/post"

const PostForm = ({ setMakePost }) => {
    const dispatch = useDispatch()
    const { teamId } = useParams()
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [publicc, setPublicc] = useState(false)
    const [errors, setErrors] = useState([])


    const user = useSelector(state => state.session.user)
    const teams = useSelector(state => state.teams)

    useEffect(() => {
        const err = []
        if (!title.length) err.push('Title must not be empty')
        if (title.length > 50) err.push('Title must not contain over 50 characters')
        if (!content.length) err.push('Content must not be empty')
        setErrors(err)
    }, [title, content, publicc])

    const handleSubmit = async (e) => {
        e.preventDefault()
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
        <form onSubmit={handleSubmit}>
            {errors.length > 0 && errors.map(error => (
                <div>{error}</div>
            ))}
            <div><label>Title*<input value={title} onChange={(e) => { setTitle(e.target.value) }} type='text'></input></label></div>
            <div><label>Content*<input value={content} onChange={(e) => { setContent(e.target.value) }} type='text'></input></label></div>
            <div><label>Public<input onChange={(e) => { setPublicc(e.target.checked) }} type='checkbox'></input></label></div>
            <button disabled={errors.length > 0}  >Post</button>
        </form>
    )
}


export default PostForm
