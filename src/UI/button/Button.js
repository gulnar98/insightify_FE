import { useState } from "react";

export default function Button(props) {
  const [isHover, setIsHover] = useState(false);

  const {
    btncolor,
    btncolorHover,
    text,
    border,
    textColor,
    textColorHover,
    borderRadius,
    padding,
    margin,
    fontSize,
    onClick,
    fontWeight
  } = props;

  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
  };

  const buttonStyle = {
    backgroundColor: isHover ? btncolorHover : btncolor,
    borderRadius,
    color: isHover ? textColorHover : textColor,
    border,
    padding,
    margin,
    fontSize,
    cursor: "pointer",
    fontFamily: "inherit",
    fontWeight
  };

  return (
    <>
      <button
        onClick={() => onClick()}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={buttonStyle}
      >
        {text}
      </button>
    </>
  );
}
