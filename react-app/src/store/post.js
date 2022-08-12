const GET_POSTS = "getallpostspls"
const MAKE_POST = "makeanewgfdsagteampls"
const UPDATE_POST = "changeteamsfsdfdspls"
const DELETE_POST = "thistegfdagdfsaamsucks,imout"
const ONEPOST = 'justonepostpls'

const getOnePost = (post) => {
    return {
        type: ONEPOST,
        post
    }
}

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

export const getOnePostThunk = (postId) => async (dispatch) => {
    const res = await fetch(`/api/posts/one/${postId}`)
    if (res.ok) {
        const data = await res.json()
        dispatch(getOnePost(data.post))
        return data
    }
}

export const deletePostThunk = (postId) => async (dispatch) => {
    const res = await fetch(`/api/posts/each/${postId}`, {
        method: 'DELETE'
    })

    if (res.ok) {
        const data = await res.json()
        dispatch(deletePost(data))
        return data
    }
}

export const editPostThunk = (data, postId) => async (dispatch) => {
    console.log(postId)
    const res = await fetch(`/api/posts/each/${postId}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })

    if (res.ok) {
        const data = await res.json()
        dispatch(editPost(data))
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
        console.log(data)
        dispatch(makePost(data.post))
        return data
    }
}

export const getPostsThunk = (teamId) => async (dispatch) => {
    const res = await fetch(`/api/posts/${teamId}`)
    if (res.ok) {
        const data = await res.json()
        dispatch(getPosts(data.posts))
        return data
    }
}

const posts = (state = {}, action) => {
    let newState = {}
    switch (action.type) {
        case GET_POSTS:
            action.posts.forEach(post => {
                newState[post[0].id] = post[0]
                newState[post[0].id].user = post[1]
            })
            return newState
        case MAKE_POST:
            newState = { ...state }
            newState[action.post[0][0].id] = action.post[0][0]
            newState[action.post[0][0].id].user = action.post[0][1]
            return newState
        case UPDATE_POST:
            newState = { ...state }
            newState[action.post.id] = action.post
            return newState
        case DELETE_POST:
            newState = { ...state }
            delete newState[action.post.id]
            return newState
        case ONEPOST:
            newState[action.post[0][0].id] = action.post[0][0]
            newState[action.post[0][0].id].user = action.post[0][1]
            return newState
        default:
            return state
    }
}
export default posts
