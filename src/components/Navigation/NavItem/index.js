import style from "./style.module.css";

import Link from "next/link";
import PropTypes from "prop-types";

import overview from "@//assets/images/nav-icons/overview.svg";
import dashboard from "@//assets/images/nav-icons/dashboard.svg";
import highlights from "@//assets/images/nav-icons/highlights.svg";
import trends from "@//assets/images/nav-icons/trends.svg";
import funnels from "@//assets/images/nav-icons/funnels.svg";
import recording from "@//assets/images/nav-icons/recording.svg";
import heatmaps from "@//assets/images/nav-icons/heatmaps.svg";
import feedback from "@//assets/images/nav-icons/feedback.svg";
import surveys from "@//assets/images/nav-icons/surveys.svg";
import engage from "@//assets/images/nav-icons/engage.svg";

import overviewActive from "@//assets/images/nav-icons/overview-active.svg";
import dashboardActive from "@//assets/images/nav-icons/dashboard-active.svg";
import highlightsActive from "@//assets/images/nav-icons/highlights-active.svg";
import trendsActive from "@//assets/images/nav-icons/trends-active.svg";
import funnelsActive from "@//assets/images/nav-icons/funnels-active.svg";
import recordingActive from "@//assets/images/nav-icons/recording-active.svg";
import heatmapsActive from "@//assets/images/nav-icons/heatmaps-active.svg";
import feedbackActive from "@//assets/images/nav-icons/feedback-active.svg";
import surveysActive from "@//assets/images/nav-icons/surveys-active.svg";
import engageActive from "@//assets/images/nav-icons/engage-active.svg";

import { useRouter } from "next/router";
import { useState } from "react";

function NavItem({ children, path, iconName, soon, isOpen }) {
  const [isHover, setIsHover] = useState(false);
  const { pathname } = useRouter();

  let isActive = pathname == path ? true : false;

  function getIcon() {
    switch (iconName) {
      case "overview":
        return isActive || isHover ? overviewActive : overview;
      case "dashboard":
        return isActive || isHover ? dashboardActive : dashboard;
      case "highlights":
        return isActive || isHover ? highlightsActive : highlights;
      case "trends":
        return isActive || isHover ? trendsActive : trends;
      case "funnels":
        return isActive || isHover ? funnelsActive : funnels;
      case "recording":
        return isActive || isHover ? recordingActive : recording;
      case "heatmaps":
        return isActive || isHover ? heatmapsActive : heatmaps;
      case "feedback":
        return isActive || isHover ? feedbackActive : feedback;
      case "surveys":
        return isActive || isHover ? surveysActive : surveys;
      case "engage":
        return isActive || isHover ? engageActive : engage;

      default:
        return null;
    }
  }

  const icon = getIcon();

  return (
    <li
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className={`${style.itemWrapper} ${isActive && style.isActive}`}
    >
      <Link
        href={path}
        className={`${style.item} ${isActive && style.isActive}`}
      >
        {icon && <img src={icon.src} alt={iconName} />}

        {isOpen && <p>{children}</p>}

        {soon && isOpen && <div className={style.soon}>Soon</div>}
      </Link>
    </li>
  );
}

NavItem.protoTypes = {
  isActive: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  iconName: PropTypes.string,
  soon: PropTypes.bool,
  isOpen: PropTypes.bool,
};

export default NavItem;
