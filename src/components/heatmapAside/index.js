import Button from "../../UI/button/Button";
import Input from "../../UI/input";
import search from "./asset/image/searchBtn.svg";
import styles from "./asset/css/style.module.css";
import plus from "./asset/image/plus.svg";
import Link from "next/link";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { MyContext } from "@/context/HeatmapProvider";

function HeatMapAside() {
  const [locationsDropdown, setLocationsDropdown] = useState(false);
  const [state, dispatch] = useContext(MyContext);
  const router = useRouter();

  return (
    <>
      <div className={styles.container}>
        <div className={styles.head}>
          <div className={styles.inputContainer}>
            <Button border="none" btncolor="#ffff">
              <img className={styles.imgIcon} src={search.src} alt="search" />
            </Button>
            <Input
              inputValue={""}
              setIsOpen={setLocationsDropdown}
              isOpen={locationsDropdown}
              data="heatmapAside"
              border="none"
              fontSize="14px"
              placeholder="Jump to..."
            />
          </div>
          <div className={styles.btnContainer}>
            <Button
              border="none"
              btncolor="#ffff"
              onClick={() => router.push(`/heatmaps/new/add`)}
            >
              <img className={styles.btnIcon} src={plus.src} alt="plus" />
              <p className={styles.btnText}>New heatmap</p>
            </Button>
          </div>
        </div>
        <div className={styles.body}>
          {state.heatmapsEndpoints?.map((item) => (
            <Link
              href={`/heatmaps/${item._id}`}
              className={styles.text}
              key={`${item.endpoint}-${item._id}`}
            >
              {item.endpoint}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default HeatMapAside;
