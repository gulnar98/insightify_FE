import style from "./assets/css/style.module.css";
import { useState, useEffect, useRef, useContext } from "react";
import urlIcon from "./assets/images/url-icon.svg";
import arrowDown from "./assets/images/arrow-down.svg";
import exitIcon from "./assets/images/exit-icon.svg";
import Input from "../../../UI/input";
import Button from "../../../UI/button/Button";
import SuggestedPage from "../suggestedPage";
import { dropdownProps, viewHtmpBtnProps } from "./constants";
import DropDown from "@/UI/drop-down";
import { useRouter } from "next/router";
import { MyContext } from "../../../context/HeatmapProvider";

function AddNewHeatmap({ htmpEndpoints, setHtmpEndpoints }) {
  const [snapshots, setSnapshots] = useState([]);
  const [state, dispatch] = useContext(MyContext);

  const inpRef = useRef("");

  useEffect(() => {
    try {
      fetch("/api/snapshot/heatmap")
        .then((result) => result.json())
        .then(({ snapshots }) => {
          setSnapshots((state) => snapshots);
        });
    } catch (err) {}
  }, []);

  const addNewHtmp = () => {
    const url = inpRef.current.value;
    const endpoint = new URL(url).pathname.substring(1);
    const snapshot = snapshots.filter(
      (snapshot) => snapshot.location === url
    )[0];

    if (
      !state.heatmapsEndpoints.filter((item) => item?.location === url).length
    ) {
      snapshot.endpoint = `/${endpoint}`;
      dispatch({
        type: "setHtmpEndpoints",
        payload: snapshot,
      });

      localStorage.setItem(
        "snapshotEndpoints",
        JSON.stringify([...state.heatmapsEndpoints, snapshot])
      );
    }
  };

  return (
    <div className={style.container}>
      <button className={style.selectUrl} data-dataname="lastDayDropDown">
        <img src={urlIcon.src} alt="url-icon" data-dataname="select-format" />
        <h2 data-dataname="select-format">URL is</h2>
        <img
          src={arrowDown.src}
          alt="downArrow"
          data-dataname="select-format"
        />
      </button>
      <div className={style.inputContainer}>
        <input
          ref={inpRef}
          list="location-lists"
          id="location"
          name="location"
          type="text"
          className={style.input}
        />

        <datalist id="location-lists">
          {snapshots.map((snapshot, index) => (
            <option key={`location-${index}`} value={snapshot.location} />
          ))}
        </datalist>
      </div>
      <div className={style.viewBtnWrapper}>
        <Button onClick={addNewHtmp} {...viewHtmpBtnProps} />
      </div>
    </div>
  );
}

export default AddNewHeatmap;
