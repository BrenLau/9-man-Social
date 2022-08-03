const GET_POSTS = "getallpostspls"
const MAKE_POST = "makeanewgfdsagteampls"
const UPDATE_POST = "changeteamsfsdfdspls"
const DELETE_POST = "thistegfdagdfsaamsucks,imout"

const getPosts = (posts) => {
    return {
        type: GET_POSTS,
        posts
    }
}

const makePost = (post) => {
    return {
        type: MAKE_POST,
        post
    }
}

const editPost = (post) => {
    return {
        type: UPDATE_POST,
        post
    }
}

const deletePost = (post) => {
    return {
        type: DELETE_POST,
        post
    }
}

export const deletePostThunk = (teamId) => async (dispatch) => {
    const res = await fetch(`/api/teams/${teamId}`, {
        method: 'DELETE'
    })

    if (res.ok) {
        const data = await res.json()
        dispatch(deletePost(data))
        console.log(data)
        return data
    }
}

export const editPostThunk = (data, teamId) => async (dispatch) => {
    console.log(teamId)
    const res = await fetch(`/api/teams/${teamId}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })

    if (res.ok) {
        const data = await res.json()
        dispatch(editPost(data))
        console.log(data)
        return data
    }
}

export const makePostThunk = (data) => async (dispatch) => {
    const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })

    if (res.ok) {
        const data = await res.json()
        dispatch(makePost(data))
        return data
    }
}

export const getPostsThunk = (teamId) => async (dispatch) => {
    const res = await fetch(`/api/posts/${teamId}`)
    if (res.ok) {
        const data = await res.json()
        console.log(data.posts)
        dispatch(getPosts(data.posts))
        return data
    }
}

const posts = (state = {}, action) => {
    let newState = {}
    switch (action.type) {
        case GET_POSTS:

            action.posts.forEach(post => {
                newState[post.id] = post
            })
            return newState
        case MAKE_POST:
            newState = { ...state }
            newState[action.post.id] = action.post
            return newState
        case UPDATE_POST:
            newState = { ...state }
            newState[action.post.id] = action.post
            return newState
        case DELETE_POST:
            newState = { ...state }
            delete newState[action.post.id]
            return newState
        default:
            return state
    }
}
export default posts