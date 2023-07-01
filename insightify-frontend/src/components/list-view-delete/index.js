import Button from '../../UI/button/Button'
import style from './assets/css/style.module.css'

export default function ListViewDelete({btn, exitBtn, children}) {

    return (
        <>
            <div className={style.container}>
                <div className={style.text}>
                    <p>{children}</p>
                </div>
                <div className={style.btn}>
                    {btn}
                </div>
                <div className={style.exit}>
                    {exitBtn}
                </div>
            </div>
        </>
    )
}