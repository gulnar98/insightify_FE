import style from "./assets/css/style.module.css";
import { useState } from "react";
import { responsiveDesignButtons, typeOfUseButtons } from "./constants";

function SnapshotImageUsed() {
  const [respDesgnBtnActive, setRespDesgnBtnActive] = useState("desktop");
  let [typOfUseBtnActive, setTypOfUseBtnActive] = useState("fingerTouch");

  const respDesgnClick = (e) => {
    switch (e.target.dataset.dataname) {
      case "desktop":
        setRespDesgnBtnActive("desktop");
        break;
      case "phoneHorizontal":
        setRespDesgnBtnActive("phoneHorizontal");
        break;
      case "phoneVertical":
        setRespDesgnBtnActive("phoneVertical");
        break;
    }
  };

  const typofUseClick = (e) => {
    switch (e.target.dataset.dataname) {
      case "fingerTouch":
        typOfUseBtnActive = "fingerTouch";
        setTypOfUseBtnActive("fingerTouch");

        break;
      case "fingerSlide":
        typOfUseBtnActive = "fingerSlide";
        setTypOfUseBtnActive("fingerSlide");

        break;
      case "upDown":
        typOfUseBtnActive = "upDown";
        setTypOfUseBtnActive("upDown");

        break;
    }
  };

  return (
    <div className={style.snapshotUsedWrapper}>
      <div className={style.responsiveDesign}>
        {responsiveDesignButtons.map((button, index) => (
          <button
            key={index}
            onClick={respDesgnClick}
            data-dataname={button.dataName}
            className={`${style.button} ${
              respDesgnBtnActive === button.dataName && style.activeBtn
            }`}
          >
            <img
              src={button.src}
              alt={button.alt}
              data-dataname={button.dataName}
            />
            {button.count}
          </button>
        ))}
      </div>

      <div className={style.typeOfUse}>
        {typeOfUseButtons.map((button, index) => (
          <button
            key={index}
            onClick={typofUseClick}
            data-dataname={button.dataName}
            className={`${style.button} ${
              typOfUseBtnActive === button.dataName && style.activeBtn
            }`}
          >
            <img
              src={button.src}
              alt={button.alt}
              data-dataname={button.dataName}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

export default SnapshotImageUsed;
