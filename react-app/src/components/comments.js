import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { NavLink, useParams, useHistory } from "react-router-dom"
import { getOnePostThunk, deletePostThunk } from "../store/post"
import './postList.css'
import EditPostForm from "./editPost"
import { getCommentsThunk, makeCommentThunk } from "../store/comments"

const Comments = ({ teamMember, post }) => {
    const dispatch = useDispatch()
    const { postId } = useParams()
    const [comment, setComment] = useState('')
    const [disabled, setDisabled] = useState(true)

    const user = useSelector(state => state.session.user)
    const comments = useSelector(state => state.comments)


    useEffect(() => {
        dispatch(getCommentsThunk(postId))
    }, [dispatch])

    useEffect(() => {
        const reg = comment.replaceAll(' ', '')
        if (comment.length > 300) setDisabled(true)
        if (reg.length < 1) setDisabled(true)
        else setDisabled(false)

    }, [comment])

    const onSubmit = async (e) => {
        e.preventDefault()
        const data = {
            'postId': postId,
            'content': comment,
            'userId': user.id
        }
        await dispatch(makeCommentThunk(data))
        await setComment('')
    }
    // if (!post) return (<div>No comments</div>)

    return (
        <div className="commentsContainer">
            <h2 id='commentsh2'>Comments</h2>
            <ul className="thecomments">
                {comments && Object.values(comments).map(comment => (
                    <div className="eachCommentDiv">
                        <div className="commentcontent">
                            {comment?.content}
                        </div>
                        <div className="commentuser">{comment?.user?.username}</div>
                    </div>)
                )}
                {comments && !Object.values(comments).length && <h2 id='commentsh2'>No comments yet</h2>}
            </ul>
            <form onSubmit={onSubmit} className="commentform">
                <input value={comment} onChange={(e) => { setComment(e.target.value) }} placeholder="Type Comment Here" className='commentinput'></input>
                <button className='commentbutton' disabled={disabled}>Submit<div>({comment?.length}/500)</div></button>
            </form>

        </div>
    )
}


export default Comments
