import Button from '@/UI/button/Button'
import style from './assets/css/style.module.css'

export default function VerifyInProgress(props) {
    return(
        <>
            <div className={style.main}>
                <p className={style.about}>Connecting to your site to verify Usersnap installation</p>
                <p className={style.information}>This can take up to 60 seconds.</p>
                <Button
                    padding="7px 15px"
                    borderRadius="5px"
                    color="#418EFD"
                    text="Try again"
                    textColor="white"
                    border="solid 2px #418EFD"
                    fontSize='1em'/>
            </div>
        </>
    )
}