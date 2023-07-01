import style from "./assets/css/style.module.css";
import viewRecordings from "./assets/images/view-recordings.svg";
import download from "./assets/images/download.svg";
import max from "./assets/images/max.svg";
import Image from "next/image";
import Link from "next/link";

function SnapshotBtnGroup() {
  return (
    <div className={style.container}>
      <Link href={'/recording'} className={style.button}>
        <Image width={16} height={14} src={viewRecordings.src} alt="View recordings" />
        View recordings
      </Link>
      <button className={style.button}>
        <Image width={16} height={14} src={download.src} alt="Download" />
        Download
      </button>
      <button className={style.button}>
        <image width={16} height={14} src={max.src} alt="max" />
        Max
      </button>
    </div>
  );
}

export default SnapshotBtnGroup;
