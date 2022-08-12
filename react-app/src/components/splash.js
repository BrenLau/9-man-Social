
import './postList.css'
import image from './biggerspiker.png'

const Splash = () => {

    return (
        <>
            <div className="balldiv">
                <h2 id='splashh2'>This app is designed to be a place where the nineman community can get together and organize/communicate amongst eachother in one centralized location.</h2>
                <img className='splashball' src="https://pngimg.com/uploads/volleyball/volleyball_PNG1.png"></img>
            </div>
            <img className='splashimage' src={image}></img>
        </>
    )
}

export default Splash
