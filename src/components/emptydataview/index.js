import style from './assets/css/style.module.css'

export default function Emptydataview({alert, button}) {

    return (
        <div>
            <h1 className={style.title}>Recordings</h1>
            {alert}
            {button}
        </div>
    );
}






