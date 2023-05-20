import label from "./asset/image/label.svg";
import wallet from "./asset/image/wallet.svg";
import walletAge from "./asset/image/walletAge.svg";
import walletWorth from "./asset/image/walletWorth.svg";
import person from "./asset/image/person.svg";
import map from "./asset/image/location.svg";
import clock from "./asset/image/clock.svg";
import PageCount from "./asset/image/PageCount.svg";
import feedback from "./asset/image/msjbox.svg";
import prometr from "./asset/image/prometr.svg";
import google from "./asset/image/google.svg";
import page from "./asset/image/page.svg";
import link from "./asset/image/Link.svg";
import computer from "./asset/image/computer.svg";
import browser from "./asset/image/browser.svg";
import chip from "./asset/image/chip.svg";
import click from "./asset/image/click.svg";
import error from "./asset/image/Error.svg";
import event from "./asset/image/event.svg";
import rageclick from "./asset/image/rageClick.svg";
import turn from "./asset/image/uTurn.svg";

export const filters = [
  {
    title: "Onchain",
    filters: [
      { text: "Wallet", iconSrc: wallet.src },
      { text: "Wallet worth", iconSrc: walletWorth.src },
      { text: "Wallet Age", iconSrc: walletAge.src },
    ],
  },
  {
    title: "Session",
    filters: [
      { text: "New / Returning", iconSrc: person.src },
      { text: "Country", iconSrc: map.src },
      { text: "Duration", iconSrc: clock.src },
      { text: "Page Count", iconSrc: PageCount.src },
    ],
  },
  {
    title: "Feedback",
    filters: [
      { text: "Feedback", iconSrc: feedback.src },
      { text: "Net Promoter Score", iconSrc: prometr.src },
    ],
  },
  {
    title: "Experiment",
    filters: [{ text: "Google Optimize", iconSrc: google.src }],
  },
  {
    title: "Path",
    filters: [
      { text: "Viewed page", iconSrc: page.src },
      { text: "Landing page", iconSrc: page.src },
      { text: "Exit page", iconSrc: page.src },
      { text: "Referrer URL", iconSrc: link.src },
    ],
  },
  {
    title: "Technology",
    filters: [
      { text: "Usersnap user ID", iconSrc: person.src },
      { text: "Device", iconSrc: computer.src },
      { text: "Browser", iconSrc: browser.src },
      { text: "Operating system", iconSrc: chip.src },
    ],
  },
  {
    title: "Behavior",
    filters: [
      { text: "Clicked element", iconSrc: click.src },
      { text: "Error", iconSrc: error.src },
      { text: "Event", iconSrc: event.src },
      { text: "Rage click", iconSrc: rageclick.src },
      { text: "U-turn", iconSrc: turn.src },
    ],
  },
];
