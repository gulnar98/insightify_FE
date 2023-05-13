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
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <img src={alert.src} alt="alert" style={{ marginRight: "4px" }} />
      <span style={{ alignSelf: "center" }}>{displayText}</span>
    </div>
  );
}
