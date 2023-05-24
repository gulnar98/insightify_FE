import style from './assets/css/style.module.css'

export default function Checkbox() {
    return (
        <>
            <div className={style.checkboxWrapper-45}>
            <input id="cbx-45" type="checkbox"/>
            <label className={style.cbx} for="cbx-45">
                <div className={style.flip}>
                <div className={style.front}></div>
                <div className={style.back}>
                    <svg width="16" height="14" viewBox="0 0 16 14">
                    <path d="M2 8.5L6 12.5L14 1.5"></path>
                    </svg>
                </div>
                </div>
            </label>
            </div>
        </>
    )
}