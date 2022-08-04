import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { NavLink, useParams, useHistory } from "react-router-dom"
import { getOnePostThunk, deletePostThunk } from "../store/post"
import './postList.css'
import EditPostForm from "./editPost"

const Post = ({ teamMember }) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const { postId } = useParams()

    const [hidden, setHidden] = useState(false)

    const user = useSelector(state => state.session.user)

    const posts = useSelector(state => state.posts)
    const post = posts[postId]



    useEffect(() => {
        dispatch(getOnePostThunk(parseInt(postId)))
    }, [dispatch])



    return (
        <div className="postContainer">
            {post && <h1>{post.title}</h1>}
            {post && <div>{post.content}</div>}


            {post && teamMember && teamMember.teamId === post.teamId && user.id === post.userId && <button onClick={() => { setHidden(!hidden) }}>Edit</button>}
            {post && teamMember && teamMember.teamId === post.teamId && user.id === post.userId && <button onClick={async () => {
                await dispatch(deletePostThunk(post.id))
                setHidden(!hidden)
                history.push(`/teams/${post.teamId}`)
            }}>Delete</button>}

            {hidden && post && teamMember && teamMember.teamId === post.teamId && user.id === post.userId && <EditPostForm titl={post.title} conten={post.content} setHidden={setHidden} />}

        </div>
    )
}


export default Post
