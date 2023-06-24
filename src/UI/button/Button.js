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
    imgprops,
    fontWeight,
    title,
    children,
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
    fontWeight,
    display: "flex",
    "align-items": "center",
    fontFamily: "inherit",
    transition: "all 0.2s ease",
  };

  return (
    <button
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={buttonStyle}
      title={title}
    >
      <img src={imgprops} />
      {children}
      {text}
    </button>
  );
}
