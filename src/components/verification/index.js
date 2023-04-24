import VerifyPopUp from '../verifyPopUp'
import style from './assets/css/style.module.css'
import succes from './assets/images/succes.svg'
import succesB from './assets/images/succesB.svg'
import exit from './assets/images/exit.svg'
import exclamation from './assets/images/exclamation.svg'
import Button from '@/UI/button/Button'
import VerifySucces from '../verifySucces'
import VerifyInProgress from '../verifyInProgress'

export default function Verification(props) {

    let backgroundColor = "red"
    let color = "red"
    let borderBottom = "red 2px solid"

    return(
        <>
            <div className={style.main}>
                <header className={style.header} style={{backgroundColor}}>
                    <div>
                        <img src={exclamation.src}/>
                        <p>https://learning.usersnap.io reported data within the past 1h.</p>
                    </div>
                    <div>
                        <button className={style.btn}><img src={exit.src}/></button>
                    </div>
                </header>

                <div className={style.oneDiv}>
                    <p>Tracking code</p>
                    <p className={style.verify} style={{color, borderBottom}}>Verify installation</p>
                </div>

                <div className={style.twoDiv}>
                    <VerifySucces image={succesB} color={"red"}/>
                </div>
            </div>
        </>
    )
}