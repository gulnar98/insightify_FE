import desktop from "./assets/images/desktop.svg";
import phoneVertical from "./assets/images/phone-vertical.svg";
import phoneHorizontal from "./assets/images/phone-horizontal.svg";
import fingerTouch from "./assets/images/finger-touch.svg";
import fingerSlide from "./assets/images/finger-slide.svg";
import upDown from "./assets/images/up-down.svg";

export const responsiveDesignButtons = [
  {
    dataName: "desktop",
    src: desktop.src,
    alt: "desktop",
    count: 32,
  },
  {
    dataName: "phoneHorizontal",
    src: phoneHorizontal.src,
    alt: "phoneHorizontal",
    count: 2,
  },
  {
    dataName: "phoneVertical",
    src: phoneVertical.src,
    alt: "phoneVertical",
    count: 0,
  },
];

export const typeOfUseButtons = [
  {
    dataName: "fingerTouch",
    src: fingerTouch.src,
    alt: "fingerTouch",
  },
  {
    dataName: "fingerSlide",
    src: fingerSlide.src,
    alt: "fingerSlide",
  },
  {
    dataName: "upDown",
    src: upDown.src,
    alt: "upDown",
  },
];
