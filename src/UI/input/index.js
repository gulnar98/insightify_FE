export default function Input(props) {
  let border = props.border;
  let textColor = props.textColor;
  let borderRadius = props.borderRadius;
  let padding = props.padding;
  let margin = props.margin;
  let fontSize = props.fontSize;
  let width = props.width;
  let backgroundColor = props.color;
  let placeholder = "Usersnap";

  return (
    <>
      <input
        style={{
          borderRadius,
          color: textColor,
          border,
          padding,
          margin,
          fontSize,
          width,
          backgroundColor,
        }}
        placeholder={placeholder}
      />
    </>
  );
}
