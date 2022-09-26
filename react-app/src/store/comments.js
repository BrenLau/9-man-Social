const GET_COMMENTS = "getallCOMMENTSpls"
const MAKE_COMMENTS = "makeanewCOMMENTpls"
const UPDATE_COMMENTS = "changeghfsdteamspls"
const DELETE_COMMENT = "thisteamhgfd,imout"

const getComments = (comments) => {
    return {
        type: GET_COMMENTS,
        comments
    }
}

const makeComment = (comment) => {
    return {
        type: MAKE_COMMENTS,
        comment
    }
}

const editComment = (comment) => {
    return {
        type: UPDATE_COMMENTS,
        comment
    }
}

const deleteComment = (comment) => {
    return {
        type: DELETE_COMMENT,
        comment
    }
}



export const deleteCommentThunk = (commentId) => async (dispatch) => {
    const res = await fetch(`/api/comments/${commentId}`, {
        method: 'DELETE'
    })

    if (res.ok) {
        const data = await res.json()
        dispatch(deleteComment(data))
        return data
    }
}

// export const editCommentThunk = (data, teamId) => async (dispatch) => {
//     const res = await fetch(`/api/teams/${teamId}`, {
//         method: 'PUT',
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(data)
//     })

//     if (res.ok) {
//         const data = await res.json()
//         dispatch(editTeam(data))
//         return data
//     }
// }

export const makeCommentThunk = (data) => async (dispatch) => {
    const res = await fetch(`/api/comments/post/${data.postId}`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })

    if (res.ok) {
        const data = await res.json()
        dispatch(makeComment(data))
        return null
    } else if (res.status < 500) {
        const data = await res.json()
        if (data.errors) {
            return data.errors
        }
    } else {
        return ['An error occurred. Please try again.']
    }
}

export const getCommentsThunk = (postId) => async (dispatch) => {
    const res = await fetch(`/api/comments/post/${postId}`)
    if (res.ok) {
        const data = await res.json()
        dispatch(getComments(data.comments))
        return null
    }

}

const comments = (state = {}, action) => {
    let newState = {}
    switch (action.type) {
        case GET_COMMENTS:
            newState = {}
            action.comments.forEach(comment => {
                newState[comment.id] = comment
            })
            return newState
        case MAKE_COMMENTS:
            newState = { ...state }
            newState[action.comment.id] = action.comment
            return newState
        case UPDATE_COMMENTS:
            newState = { ...state }
            newState[action.team.id] = action.team
            return newState
        case DELETE_COMMENT:
            newState = { ...state }
            delete newState[action.comment.id]
            return newState
        default:
            return state
    }
}
export default comments
