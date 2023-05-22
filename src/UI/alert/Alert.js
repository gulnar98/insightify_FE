import React from "react";
import alert from "./asset/images/alert.svg";

//Alert

export default function Alert(props) {
  let color = props.color;
  let border = props.border;
  let textColor = props.textColor;
  let borderRadius = props.borderRadius;
  let padding = props.padding;
  let margin = props.margin;
  let width = props.width;
  let fontWeight = props.fontWeight
  const { text } = props;
  const displayText = text || "This is Alert";

  return (
    <div
      style={{
        backgroundColor: color,
        borderRadius,
        color: textColor,
        border,
        padding,
        margin,
        display: "flex",
        gap: 8,
        alignItems: "center",
        textAlign: "center",
        fontWeight,
        width,
      }}
    >
      <img src={alert.src} alt="alert" />
      <span style={{ marginTop: 2 }}>{displayText}</span>
    </div>
  );
}
