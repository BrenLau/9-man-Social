import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { NavLink, useParams, useHistory } from "react-router-dom"
import { editPostThunk, getPostsThunk } from "../store/post"
import './teamList.css'

const EditPostForm = ({ titl, conten, setHidden }) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const [title, setTitle] = useState(titl)
    const [content, setContent] = useState(conten)
    const [publicc, setPublicc] = useState(false)
    const [errors, setErrors] = useState([])
    const posts = useSelector(state => state.posts)

    const { postId } = useParams()
    const post = posts[parseInt(postId)]


    const user = useSelector(state => state.session.user)

    if (post) {
        if (post.userId !== user.id) history.push('/')
    }

    useEffect(() => {
        dispatch(getPostsThunk())
    })

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
        }
        await dispatch(editPostThunk(data, post.id))
        setHidden(false)
        // setMakePost(false)
    }

    return (
        <form className='editPostForm' onSubmit={handleSubmit}>
            {errors.length > 0 && errors.map(error => (
                <div>{error}</div>
            ))}
            <div><label>Title*<input value={title} onChange={(e) => { setTitle(e.target.value) }} type='text'></input></label></div>
            <div><label>Content*<input value={content} onChange={(e) => { setContent(e.target.value) }} type='text'></input></label></div>
            {/* <div><label>Public<input onChange={(e) => { setPublicc(e.target.checked) }} type='checkbox'></input></label></div> */}
            <button disabled={errors.length > 0} className='teampagebuttons'>Post</button>
        </form>
    )
}


export default EditPostForm
