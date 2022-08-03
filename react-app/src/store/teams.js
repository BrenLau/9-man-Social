const GET_TEAMS = "getallteamspls"
const MAKE_TEAMS = "makeanewteampls"
const UPDATE_TEAMS = "changeteamspls"
const DELETE_TEAMS = "thisteamsucks,imout"

const getTeams = (teams) => {
    return {
        type: GET_TEAMS,
        teams
    }
}

const makeTeam = (team) => {
    return {
        type: MAKE_TEAMS,
        team
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
        dispatch(makeTeam(data))
        return data
    }
}

export const getTeamsThunk = () => async (dispatch) => {
    const res = await fetch('/api/teams')
    if (res.ok) {
        const data = await res.json()
        dispatch(getTeams(data.teams))
        console.log(data)
        return data
    }
}

const teams = (state = {}, action) => {
    let newState = {}
    switch (action.type) {
        case GET_TEAMS:
            newState = { ...state }
            action.teams.forEach(team => {
                newState[team.id] = team
            })
            return newState
        default:
            return state
    }
}
export default teams
