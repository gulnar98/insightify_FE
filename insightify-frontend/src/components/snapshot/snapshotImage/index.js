import { useEffect, useRef } from "react";
import h337 from "heatmap.js";
import style from "./assets/css/style.module.css";
import Loading from "@/components/loading";

const loadingProps = {
  title: "Snapshot",
  gap: 4,
  margin: "100px auto",
  textFontSize: 14,
  imgWidth: 30,
  imgHeight: 30,
};

function SnapshotImage({ children, snapshot, records }) {
  const divRef = useRef();

  useEffect(() => {
    if (!divRef?.current) {
      return;
    }

    const heatmap = h337.create({
      container: divRef.current,
    });

    setTimeout(() => {
      heatmap.setData({
        max: 5,
        data: records,
      });
    }, 1000);
  }, [divRef?.current, records]);

  return (
    <div className={style.container} ref={divRef}>
      <div className={style.imgWrapper}>
        {snapshot ? (
          <img src={snapshot} alt="snapshot" />
        ) : (
          <Loading {...loadingProps} />
        )}
        {children}
      </div>
    </div>
  );
}

export default SnapshotImage;
