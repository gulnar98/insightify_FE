import styles from "./asset/css/style.module.css";
import Input from "../../../UI/input";
import Button from "../../../UI/button/Button";
import FilterBody from "../filterBody";
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
import search from "./asset/image/searchBtn.svg";
import { useEffect, useRef } from "react";

function FilterPopup({ isOpen, setIsOpen }) {
  const popupRef = useRef(null);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (
      popupRef.current &&
      !popupRef.current.contains(event.target) &&
      event.target.dataset.filter !== "filter"
    ) {
      setIsOpen(false);
    }
  };

  return (
    <>
      <div
        ref={popupRef}
        className={`${styles.wrapper} ${isOpen && styles.isOpen}`}
      >
        <div className={styles.inputContainer}>
          <button>
            <img className={styles.imgIcon} src={search.src} alt="search" />
          </button>
          <Input border="none" fontSize="14px" placeholder="Jump to..." />
        </div>
        <div className={styles.row}>
          <div className={styles.columnLeft}>
            <div className={styles.box}>
              <h3 className={styles.title}>Onchain</h3>
              <FilterBody iconSrc={label.src} />
              <FilterBody text="Wallet" iconSrc={wallet.src} />
              <FilterBody text="Wallet worth" iconSrc={walletWorth.src} />
              <FilterBody text="Wallet Age" iconSrc={walletAge.src} />
            </div>
            <div className={styles.box}>
              <h3 className={styles.title}>Session</h3>
              <FilterBody text="New / Returing" iconSrc={person.src} />
              <FilterBody text="Country" iconSrc={map.src} />
              <FilterBody text="Duration" iconSrc={clock.src} />
              <FilterBody text="Page Count" iconSrc={PageCount.src} />
            </div>
            <div className={styles.box}>
              <h3 className={styles.title}>Feedback</h3>
              <FilterBody text="Feedback" iconSrc={feedback.src} />
              <FilterBody text="Net Promoter Score" iconSrc={prometr.src} />
            </div>
            <div className={styles.box}>
              <h3 className={styles.title}>Experiment</h3>
              <FilterBody text="Google Optimize" iconSrc={google.src} />
            </div>
          </div>
          <div className={styles.columnRight}>
            <div className={styles.box}>
              <h3 className={styles.title}>Path</h3>
              <FilterBody text="Viewed page" iconSrc={page.src} />
              <FilterBody text="Landing page" iconSrc={page.src} />
              <FilterBody text="Exit page" iconSrc={page.src} />
              <FilterBody text="Referrer URL" iconSrc={link.src} />
            </div>
            <div className={styles.box}>
              <h3 className={styles.title}>Technology</h3>
              <FilterBody text="Usersnap user ID" iconSrc={person.src} />
              <FilterBody text="Device" iconSrc={computer.src} />
              <FilterBody text="Browser" iconSrc={browser.src} />
              <FilterBody text="Operating system" iconSrc={chip.src} />
            </div>
            <div className={styles.box}>
              <h3 className={styles.title}>Behavior</h3>
              <FilterBody text="Clicked element" iconSrc={click.src} />
              <FilterBody text="Error" iconSrc={error.src} />
              <FilterBody text="Event" iconSrc={event.src} />
              <FilterBody text="Rage click" iconSrc={rageclick.src} />
              <FilterBody text="U-turn" iconSrc={turn.src} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FilterPopup;
