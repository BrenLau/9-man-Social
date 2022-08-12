
import './postList.css'
import image from './biggerspiker.png'

const Splash = () => {

    return (
        <>
            <div className="balldiv">
                <h2 id='splashh2'>A place where the nineman community can get together to organize and communicate amongst eachother in one centralized location.</h2>
                <img className='splashball' src="https://pngimg.com/uploads/volleyball/volleyball_PNG1.png"></img>
            </div>
            <img className='splashimage' src={image}></img>
        </>
    )
}

export default Splash
