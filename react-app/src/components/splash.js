import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { NavLink, useParams, useHistory } from "react-router-dom"
import { getOnePostThunk, deletePostThunk } from "../store/post"
import './postList.css'
import EditPostForm from "./editPost"
import image from './biggerspiker.png'

const Splash = () => {



    return (
        <>
            <div className="balldiv">
                <img className='splashball' src="https://pngimg.com/uploads/volleyball/volleyball_PNG1.png"></img>
            </div>
            <img className='splashimage' src={image}></img>
        </>
    )
}


export default Splash
