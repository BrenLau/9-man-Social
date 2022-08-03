import { useState } from 'react'
import { useSelector } from 'react-redux';

const CreateTeam = () => {
    const sessionUser = useSelector((state) => state.session.user);
    console.log(sessionUser)

    return (
        sessionUser && <form>
            <div>Hello</div>
        </form>
    )
}

export default CreateTeam
