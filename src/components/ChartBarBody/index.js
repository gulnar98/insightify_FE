import React from "react";

// Bu ise top clicked button ve top pages  technology ve top countries olan sehifelerin body hissesi ucundur

const ChartBarBody = ({
  imageSrc,
  iconSrc,
  pTagText,
  anchorHref,
  anchorText,
  faLeftIconSrc,
  mapIconSrc,
  row,
  firstColumn,
  firstRow,
  imageStyle,
  iconStyle,
  secondColumn,
  pStyle,
  aStyle,
  FaIconStyle,
  mapStyle,
}) => {
  return (
    <>
      <div className="row" style={row}>
        <div className="first-column" style={firstColumn}>
          <div className="first-row" style={firstRow}>
            {iconSrc && (
              <img src={iconSrc} alt="desktoporflag" style={iconStyle} />
            )}
            {pTagText && <p style={pStyle}>{pTagText}</p>}
          </div>
          {imageSrc && (
            <img src={imageSrc} style={imageStyle} alt="component image" />
          )}
        </div>
        <div className="second-column" style={secondColumn}>
          {anchorHref && anchorText && (
            <a href={anchorHref} style={aStyle}>
              {anchorText}
            </a>
          )}
          {faLeftIconSrc && (
            <img src={faLeftIconSrc} alt="fa-left-icon" style={FaIconStyle} />
          )}
          {mapIconSrc && (
            <img src={mapIconSrc} alt="map-icon" style={mapStyle} />
          )}
        </div>
      </div>
    </>
  );
};

export default ChartBarBody;
