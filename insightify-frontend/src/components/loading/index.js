import loadingIcon from "./assets/images/loading.svg";
import style from "./assets/css/style.module.css";

function Loading({ title, gap, margin, textFontSize, imgWidth, imgHeight }) {
  const containerStyle = {
    gap,
    margin,
  };

  const textStyle = {
    fontSize: textFontSize,
  };

  const imgStyle = {
    width: imgWidth,
    height: imgHeight,
  };

  return (
    <div style={containerStyle} className={style.container}>
      <img
        style={imgStyle}
        className={style.laodingIcon}
        src={loadingIcon.src}
        alt="loading"
      />
      <strong style={textStyle} className={style.text}>
        {title} are on the way...
      </strong>
    </div>
  );
}

export default Loading;
