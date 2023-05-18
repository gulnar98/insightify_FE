import Button from '../../UI/button/Button'
import style from './assets/css/style.module.css'
import deletee from './assets/images/delete.png'
import exit from './assets/images/exit.png'

export default function ListViewDelete() {
    return (
        <>
            <div className={style.container}>
                <div className={style.text}>
                    <p>1 recording selected</p>
                </div>
                <div className={style.btn}>
                    <button>
                        <img src={deletee.src}/>
                        &nbsp;&nbsp;Delete
                    </button>
                </div>
                <div className={style.exit}>
                    <img src={exit.src}/>
                </div>
            </div>
        </>
    )
}