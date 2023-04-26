import style from './assets/css/style.module.css'
import Button from "@/UI/button/Button";
import Input from "@/UI/input";

export default function DatingUser({welcome, question}) {
    return (
        <>
            <div className={style.main}>
                <p className={style.welcome}>Welcome, 0xe7A21..... Let’s get you all set up</p>
                <p className={style.question}>What’s your DAO name?</p>
                <div>
                    <Input
                    padding="10px 17px"
                    borderRadius="5px"
                    color="#F8F9FC"
                    text="Next" 
                    border="solid 1px #C8C8C8"
                    width='55%'
                    textColor="black"
                    fontSize='1em'/>
                </div>
                <div>
                   <Button
                    padding="7px 15px"
                    borderRadius="5px"
                    color="#F8F9FC"
                    text="Next"
                    textColor="black"
                    border="solid 1px #C8C8C8"
                    fontSize='1em'/> 
                </div>
                
            </div>
        </>
    )
}