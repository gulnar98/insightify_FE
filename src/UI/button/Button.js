export default function Button(props) {
  const {
    btncolor,
    text,
    border,
    textColor,
    borderRadius,
    padding,
    margin,
    fontSize,
    onClick,
  } = props;

  return (
    <>
      <button
        onClick={() => onClick()}
        style={{
          backgroundColor: btncolor,
          borderRadius,
          color: textColor,
          border,
          padding,
          margin,
          fontSize,
          cursor: "pointer",
          fontFamily: "inherit",
        }}
      >
        {text}
      </button>
    </>
  );
}
