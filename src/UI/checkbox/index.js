import style from './assets/css/style.module.css'

export default function Check({bool, onChange=()=>{}}) {
    return (
        <>
            <input checked={bool} type='checkbox' style={{width: '18px', height: "18px", marginLeft: "12px"}} onChange={onChange} />
        </>
    )
}