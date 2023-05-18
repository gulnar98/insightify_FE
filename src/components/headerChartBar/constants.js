import hash from "./asset/images/hash.svg";
import percent from "./asset/images/percent.svg";
import bar from "./asset/images/bar.svg";
import line from "./asset/images/line.svg";
import pie from "./asset/images/pie.svg";

export const hashDropdownItems = [
  {
    icon: hash.src,
    text: "Numbers",
  },
  {
    icon: percent.src,
    text: "Percents",
  },
];

export const chartDropdownItems = [
  {
    icon: bar.src,
    text: "Bar",
  },
  {
    icon: line.src,
    text: "Line",
    isSelected: false,
  },
  {
    icon: pie.src,
    text: "Pie",
  },
];
