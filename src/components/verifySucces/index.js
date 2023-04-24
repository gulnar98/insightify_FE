import Button from '@/UI/button/Button'
import style from './assets/css/style.module.css'

export default function VerifySucces({image, color}) {

    
    return (
        <>
            <div className={style.main}>
                <img src={image.src} width={"9%"}/>
                <p style={{fontWeight: "bold", fontSize: "1.4em", color}}>Installation successful!</p>
                <p className={style.p}>Usersnap is capturing data on your site, adn you’re ready to
                    get started with all of Usersnap’s tools.</p>
                    <Button
                        padding="7px 15px"
                        borderRadius="5px"
                        color="#418EFD"
                        text="Continue"
                        textColor="white"
                        border="solid 2px #418EFD"
                        fontSize='1em'
                    />
            </div>

            
        </>
    )
}