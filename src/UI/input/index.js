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
  let inpRef = props.inpRef;

  const onChange = (e) => {
    if (!e.target.value) {
      props.setIsOnchange(false);
    } else {
      props.setIsOnchange(true);
    }
  };

  return (
    <>
      <input
        onChange={onChange}
        ref={inpRef}
        style={{
          borderRadius,
          color: textColor,
          border,
          padding,
          margin,
          fontSize,
          width,
          backgroundColor,
          outline: "none",
        }}
        placeholder={placeholder}
      />
    </>
  );
}
