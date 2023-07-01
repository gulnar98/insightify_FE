import style from "./assets/css/style.module.css";
import { useEffect, useState } from "react";

function SuggestedPage({ inpRef, isOpen, setSnapshotDatas }) {
  const [snapshots, setSnapshots] = useState([]);

  useEffect(() => {
    try {
      fetch("/api/snapshot/heatmap")
        .then((result) => result.json())
        .then(({ snapshots }) => {
          setSnapshots((state) => snapshots);
        });
    } catch (err) {}
  }, []);

  const onClick = (_id, location) => {
    setSnapshotDatas({ id: _id, location });
    inpRef.current.value = location;
  };

  return (
    <div
      data-dataname={"suggestedPages"}
      className={`${style.container} ${isOpen && style.isOpen}`}
    >
      <h2 data-dataname={"suggestedPages"}>Suggested pages</h2>
      <ul data-dataname={"suggestedPages"}>
        {snapshots?.map(({ _id, appid, location, timestamp }, index) => (
          <li
            key={`heatmap-snapshots-${index}`}
            data-dataname={"suggestedPages"}
          >
            <button
              onClick={() => onClick(_id, location)}
              className={style.locationBtn}
              data-dataname={"suggestedPages"}
            >
              {location}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SuggestedPage;
