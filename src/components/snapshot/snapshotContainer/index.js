import style from "./assets/css/style.module.css";
import SnapshotBtnGroup from "../snapshotBtnGroup";
import SnapshotImage from "../snapshotImage";
import SnapshotImageUsed from "../snapshotImageUsed";
import SnapshotInfo from "../snapshotInfo";

function SnapshotContainer({ snapshot, records, dateOfScreenshot }) {
  return (
    <div className={style.container}>
      <SnapshotBtnGroup />

      <div className={style.snapshotContentWrapper}>
        <SnapshotImage snapshot={snapshot} records={records} dateOfScreenshot={dateOfScreenshot}>
          <SnapshotImageUsed />
        </SnapshotImage>
        <SnapshotInfo dateOfScreenshot={dateOfScreenshot} />
      </div>
    </div>
  );
}

export default SnapshotContainer;
