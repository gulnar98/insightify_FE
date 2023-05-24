import Button from '../../UI/button/Button'
import style from './assets/css/style.module.css'

import exit from './assets/images/exit.png'

export default function ListViewDelete({btn, exitBtn}) {

    return (
        <>
            <div className={style.container}>
                <div className={style.text}>
                    <p>1 recording selected</p>
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