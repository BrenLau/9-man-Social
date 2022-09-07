import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { NavLink, useParams, useHistory } from "react-router-dom"
import { editPostThunk, getPostsThunk, getOnePostThunk } from "../store/post"
import './teamList.css'
import './Home.css'

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
        dispatch(getOnePostThunk(parseInt(postId)))
    })

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
                <div className="errorsdivs">{error}</div>
            ))}
            <div><label>Title*<input value={title} onChange={(e) => { setTitle(e.target.value) }} type='text'></input></label></div>
            <div><label>Content*<input value={content} onChange={(e) => { setContent(e.target.value) }} type='text'></input></label></div>
            <button disabled={errors.length > 0} className='teampagebuttons'>Post</button>
            <button className='teampagebuttons' onClick={() => {
                setHidden(false)
                setTitle(post.title)
                setContent(post.content)
            }}>Cancel</button>
        </form>
    )
}


export default EditPostForm
