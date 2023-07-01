import Head from "next/head";
import style from "./assets/css/style.module.css";
import { useCallback, useEffect, useState } from "react";
import Emptydataview from "../../components/emptydataview";
import { useRouter } from "next/router";
import PagesHeader from "../../components/pagesHeader";
import Loading from "../../components/loading";
import HeatmapList from "@/components/Heatmap/HeatmapList";
import AddNewHeatmap from "../../components/addNewHeatmap/container";
import HeatmapAside from "../../components/heatmapAside";
import LastDayAddFilter from "../../components/lastDayAddFilter/lastDayAddFilterContainer";
import SnapshotContainer from "../../components/snapshot/snapshotContainer";

const addNewHtmpBtnProps = {
  padding: "8px 14px",
  btncolor: "inherit",
  btncolorHover: "#f0f0f0",
  text: "Saved",
  textColor: "#707070",
  textColorHover: "#2c2c2c",
  borderRadius: "6px",
  border: "none",
};

const shareBtnProps = {
  padding: "6px 12px",
  btncolor: "inherit",
  btncolorHover: "#2e8def",
  text: "Share",
  textColor: "#2e8def",
  textColorHover: "#fff",
  borderRadius: "6px",
  border: "1px solid #2e8def",
};

const loadingProps = {
  title: "Heatmaps",
  gap: 12,
  margin: "200px auto",
  textFontSize: 18,
};

export default function Heatmaps() {
  const [isLoading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);
  const [snapshotId, setSnapshotId] = useState(null);
  const router = useRouter();
  let content = null;

  useEffect(() => {
    try {
      fetch("/api/code/verify?ro=1")
        .then((result) => result.json())
        .then(({ verified }) => {
          setVerified((state) => verified);
        })
        .finally(() => {
          setLoading((state) => false);
        });
    } catch (err) {}
  }, []);

  useEffect(() => {
    fetch("/api/snapshot/heatmap/")
      .then((result) => result.json())
      .then((snapshot) => {
        if (!snapshot) {
          return setError(
            (state) => "Something went wrong. Reload page and try again!"
          );
        }
        setSnapshotId((state) => snapshot.snapshots[0]?._id);
      })
      .catch((err) => {});
  }, []);

  const installCodeClick = useCallback(() => {
    router.push("/overview");
  }, [router]);

  if (isLoading) {
    content = (
      <div className={style.loadingWrapper}>
        <PagesHeader title={"Heatmaps"} />
        <Loading {...loadingProps} />
      </div>
    );
  } else if (!isLoading && !verified) {
    content = (
      <div className={style.emptyDataViewWrapper}>
        <PagesHeader title={"Heatmaps"} />
        <Emptydataview buttonOnClick={installCodeClick} />
      </div>
    );
  } else {
    router.push(`/heatmaps/${snapshotId}`);
  }

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Heatmap</title>
      </Head>

      <div className={style.container}>{content}</div>
    </>
  );
}
