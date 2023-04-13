export default function Button(props) {

    let btncolor = props.color
    let text = props.text
    let border = props.border
    let textColor = props.textColor
    let borderRadius = props.borderRadius
    let padding = props.padding
    let margin = props.margin

    return (
        <>
            <button style={{backgroundColor: btncolor, borderRadius, color: textColor, border, padding, margin}}>{text}</button>
        </>
    )
}