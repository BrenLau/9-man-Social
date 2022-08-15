import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { NavLink, useParams } from "react-router-dom"
import { getPostsThunk } from "../store/post"
import './postList.css'

const PostList = ({ teamMember }) => {
    const dispatch = useDispatch()
    const { teamId } = useParams()

    const posts = useSelector(state => state.posts)
    useEffect(() => {
        dispatch(getPostsThunk(teamId))
    }, [dispatch, teamId])



    if (Object.values(posts).length === 0) {
        return (
            <h3 className='posttitle'>No Posts Yet</h3>
        )
    }
    if (!posts) {
        return null
    }
    return (
        <>{posts && teamMember.teamId === parseInt(teamId) && Object.values(posts).map(post => (
            <NavLink to={`/post/${post.id}`} key={post.id} className="eachPost">
                <div>{post.private ? 'private' : 'public'}</div>
                <h3 className='posttitle'>{post.title}</h3>
                <div className="desc">{post.content}</div>
                <div className="desc">posted by: {post.user.username}</div>
            </NavLink>
        ))}
            {posts && teamMember.teamId !== parseInt(teamId) && Object.values(posts).map(post => {
                if (!post.private) {
                    return <NavLink to={`/post/${post.id}`} key={post.id} className="eachPost">
                        <div>{post.private ? 'private' : 'public'}</div>
                        <h3 className='posttitle'>{post.title}</h3>
                        <div className="desc">{post.content}</div>
                        <div className="desc">posted by: {post.user.username}</div>
                    </NavLink>
                }
            })}
        </>
    )
}


export default PostList
