import Link from "next/link";
import style from "./style.module.css";

import overview from "@//assets/images/overview.svg";
import dashboard from "@//assets/images/dashboard.svg";
import highlights from "@//assets/images/highlights.svg";
import trends from "@//assets/images/trends.svg";
import funnels from "@//assets/images/funnels.svg";
import recording from "@//assets/images/recording.svg";
import heatmaps from "@//assets/images/heatmaps.svg";
import feedback from "@//assets/images/feedback.svg";
import surveys from "@//assets/images/surveys.svg";
import engage from "@//assets/images/engage.svg";
import collapse from "@//assets/images/collapse.svg";

import overviewActive from "@//assets/images/overview-active.svg";
import dashboardActive from "@//assets/images/dashboard-active.svg";
import highlightsActive from "@//assets/images/highlights-active.svg";
import trendsActive from "@//assets/images/trends-active.svg";
import funnelsActive from "@//assets/images/funnels-active.svg";
import recordingActive from "@//assets/images/recording-active.svg";
import heatmapsActive from "@//assets/images/heatmaps-active.svg";
import feedbackActive from "@//assets/images/feedback-active.svg";
import surveysActive from "@//assets/images/surveys-active.svg";
import engageActive from "@//assets/images/engage-active.svg";
import collapseActive from "@//assets/images/collapse-active.svg";

function NavItem({ children, isActive, path, iconName, soon }) {
  function getIcon() {
    switch (iconName) {
      case "overview":
        return isActive ? overviewActive : overview;
      case "dashboard":
        return isActive ? dashboardActive : dashboard;
      case "highlights":
        return isActive ? highlightsActive : highlights;
      case "trends":
        return isActive ? trendsActive : trends;
      case "funnels":
        return isActive ? funnelsActive : funnels;
      case "recording":
        return isActive ? recordingActive : recording;
      case "heatmaps":
        return isActive ? heatmapsActive : heatmaps;
      case "feedback":
        return isActive ? feedbackActive : feedback;
      case "surveys":
        return isActive ? surveysActive : surveys;
      case "engage":
        return isActive ? engageActive : engage;
      case "collapse":
        return isActive ? collapseActive : collapse;

      default:
        return null;
    }
  }

  const icon = getIcon();

  return (
    <li className={`${style.itemWrapper} ${isActive && style.isActive}`}>
      <Link
        href={path}
        className={`${style.item} ${isActive && style.isActive}`}
      >
        {icon && <img src={icon.src} />}
        <p>{children}</p>

        {soon && <div className={style.soon}>Soon</div>}
      </Link>
    </li>
  );
}

export default NavItem;
