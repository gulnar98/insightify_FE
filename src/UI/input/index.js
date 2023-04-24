export default function Input(props) {

    let text = props.text
    let border = props.border
    let textColor = props.textColor
    let borderRadius = props.borderRadius
    let padding = props.padding
    let margin = props.margin
    let fontSize = props.fontSize
    let width = props.width

    return(
        <>
            <input style={{borderRadius, color: textColor, border, padding, margin, fontSize, width}}/>
        </>
    )
}