import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { NavLink, useParams, useHistory } from "react-router-dom"
import { getOnePostThunk, deletePostThunk } from "../store/post"
import './postList.css'
import EditPostForm from "./editPost"

const Comments = ({ teamMember, post }) => {
    const dispatch = useDispatch()
    const { postId } = useParams()
    const [hidden, setHidden] = useState(false)

    const user = useSelector(state => state.session.user)



    useEffect(() => {
        dispatch(getOnePostThunk(postId))
    }, [dispatch])

    if (!post) return (<div>No comments</div>)

    return (
        <div className="commentsContainer">
            <h2>Comments</h2>


        </div>
    )
}


export default Comments
