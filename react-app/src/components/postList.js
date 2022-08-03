import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { NavLink, useParams } from "react-router-dom"
import { getPostsThunk } from "../store/post"
const PostList = ({ teamMember }) => {
    const dispatch = useDispatch()
    const { teamId } = useParams()



    const user = useSelector(state => state.session.user)
    const teams = useSelector(state => state.teams)
    const posts = useSelector(state => state.posts)
    useEffect(() => {
        dispatch(getPostsThunk(teamId))
    }, [dispatch, teamId])



    return (
        Object.values(posts) && Object.values(posts).map(post => (
            <div className="eachPost">
                <div>{post.title}</div>
                <div>{post.content}</div>
            </div>
        ))
    )
}


export default PostList
