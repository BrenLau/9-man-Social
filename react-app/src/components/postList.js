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
    console.log(posts)
    console.log(teamMember)

    if (Object.values(posts).length === 0) {
        return (
            <h3 className='posttitle'>No Posts Yet</h3>
        )
    }
    return (
        <>{posts && teamMember.teamId === parseInt(teamId) && Object.values(posts).map(post => (
            <NavLink to={`/post/${post.id}`} key={post.id} className="eachPost">
                <h3 className='posttitle'>{post.title}</h3>
                <div className="desc">{post.content}</div>
            </NavLink>
        ))}
            {posts && teamMember.teamId !== parseInt(teamId) && Object.values(posts).map(post => {
                if (!post.private) {
                    return <NavLink to={`/post/${post.id}`} key={post.id} className="eachPost">
                        <h3 className='posttitle'>{post.title}</h3>
                        <div className="desc">{post.content}</div>
                    </NavLink>
                }
            })}
        </>
    )
}


export default PostList
