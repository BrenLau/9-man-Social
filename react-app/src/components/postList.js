import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { NavLink, useParams } from "react-router-dom"
import { getPostsThunk } from "../store/post"
import './postList.css'
import EditPostForm from "./editPost"

const PostList = ({ teamMember }) => {
    const dispatch = useDispatch()
    const { teamId } = useParams()



    const user = useSelector(state => state.session.user)
    const teams = useSelector(state => state.teams)
    const posts = useSelector(state => state.posts)
    useEffect(() => {
        dispatch(getPostsThunk(teamId))
    }, [dispatch, teamId])
    console.log(teamMember)


    return (
        Object.values(posts) && Object.values(posts).map(post => (
            <NavLink to={`/post/${post.id}`} key={post.id} className="eachPost">
                {/* {teamMember.teamId === parseInt(teamId) && user.id === post.userId && <EditPostForm />} */}

                {/* {teamMember.teamId === parseInt(teamId) && user.id === post.userId && <NavLink to={`/editpost/${post.id}`}>Edit</NavLink>} */}
                <h3>{post.title}</h3>
                <div>{post.content}</div>
            </NavLink>
        ))
    )
}


export default PostList
