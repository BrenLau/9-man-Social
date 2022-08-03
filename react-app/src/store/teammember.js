const YOUR_TEAM = "yourallteamspls"
const APPLY_TEAM = "makeyoruyranewteampls"
const ACCEPT_TEAM = "changethgfdheamspls"
const LEAVE_TEAM = "thisteamsuckshgssgfd,imout"
const TEAMMEMBERS = 'ALlthisteaMSmeBERsm'
const NOTEAM = 'wefaefgewargrag'

const ourTeam = (mems) => {
    return {
        type: TEAMMEMBERS,
        mems
    }
}

const noTeam = (mem) => {
    return {
        type: NOTEAM,
        mem
    }
}

const yourTeam = (mem) => {
    return {
        type: YOUR_TEAM,
        mem
    }
}

const applyTeam = (mem) => {
    return {
        type: APPLY_TEAM,
        mem
    }
}

const acceptTeam = (mem) => {
    return {
        type: ACCEPT_TEAM,
        mem
    }
}

const leaveTeam = (mem) => {
    return {
        type: LEAVE_TEAM,
        mem
    }
}

export const ourTeamThunk = (teamId) => async (dispatch) => {
    const res = await fetch(`/api/teams/members/${teamId}`)
    if (res.ok) {
        const data = await res.json()

        dispatch(ourTeam(data.members))
        return data.members
    }
}

export const yourTeamThunk = (userId) => async (dispatch) => {
    const res = await fetch(`/api/teams/member/${userId}`)
    if (res.ok) {
        const data = await res.json()
        console.log(data)
        if (data.none === 'none') {
            dispatch(noTeam(data.none))
        }
        else {
            dispatch(yourTeam(data))
            return data
        }
    }
}

export const makeTeamThunk = (data) => async (dispatch) => {
    const res = await fetch('/api/teams', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })

    if (res.ok) {
        const data = await res.json()
        dispatch(applyTeam(data))
        return data
    }
}

export const editTeamThunk = (data, teamId) => async (dispatch) => {
    console.log(teamId)
    const res = await fetch(`/api/teams/${teamId}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })

    if (res.ok) {
        const data = await res.json()
        dispatch(acceptTeam(data))
        console.log(data)
        return data
    }
}


export const deleteTeamThunk = (teamId) => async (dispatch) => {
    const res = await fetch(`/api/teams/${teamId}`, {
        method: 'DELETE'
    })

    if (res.ok) {
        const data = await res.json()
        dispatch(leaveTeam(data))
        console.log(data)
        return data
    }
}

const members = (state = {}, action) => {
    let newState = {}
    switch (action.type) {
        case YOUR_TEAM:
            newState = { ...state }
            newState['yourTeam'] = action.mem
            return newState
        case TEAMMEMBERS:
            newState = { ...state }
            newState['ourTeam'] = action.mems
            return newState
        case NOTEAM:
            newState = { ...state }
            newState['yourTeam'] = 'none'
            return newState

        case APPLY_TEAM:
            newState = { ...state }
            newState[action.team.id] = action.team
            return newState
        case ACCEPT_TEAM:
            newState = { ...state }
            newState[action.team.id] = action.team
            return newState
        case LEAVE_TEAM:
            newState = { ...state }
            delete newState[action.team.id]
            return newState
        default:
            return state
    }
}
export default members
