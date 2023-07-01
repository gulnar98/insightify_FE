import Head from "next/head";
import style from "./assets/css/style.module.css";
import { useCallback, useEffect, useState } from "react";
import Emptydataview from "../../../components/emptydataview";
import { useRouter } from "next/router";
import HeatmapList from "@/components/Heatmap/HeatmapList";
import PagesHeader from "../../../components/pagesHeader";
import Loading from "../../../components/loading";
import AddNewHeatmap from "../../../components/addNewHeatmap/container";
import HeatmapAside from "../../../components/heatmapAside";
import LastDayAddFilter from "../../../components/lastDayAddFilter/lastDayAddFilterContainer";
import SnapshotContainer from "../../../components/snapshot/snapshotContainer";

export const addNewHtmpBtnProps = {
  padding: "6px 14px",
  btncolor: "inherit",
  btncolorHover: "#f0f0f0",
  text: "Saved",
  textColor: "#707070",
  textColorHover: "#2c2c2c",
  borderRadius: "6px",
  border: "none",
};

export const shareBtnProps = {
  padding: "6px 12px",
  btncolor: "inherit",
  btncolorHover: "#2e8def",
  text: "Share",
  textColor: "#2e8def",
  textColorHover: "#fff",
  borderRadius: "6px",
  border: "1px solid #2e8def",
};

export default function Test() {
  const [isLoading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);
  const [snapshot, setSnapshot] = useState();
  const [records, setRecords] = useState([]);
  const [daoName, setDaoName] = useState();
  const [url, setUrl] = useState();
  const [dateOfScreenshot, setDateOfScreenshot] = useState('');
  const [snapshotComponentKey, setSnapshotComponentKey] = useState(Math.random());
  const router = useRouter();

  const { snapshotId } = router.query;

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
    try {
      fetch("/api/code")
        .then((result) => result.json())
        .then(({ dao_name }) => {
          setDaoName(dao_name);
        });
    } catch (err) {}
  }, []);

  useEffect(() => {
    if (!snapshotId) {
      return;
    }

    const {p: period=30} = router.query;

    fetch(`/api/snapshot/heatmap/${snapshotId}${!isNaN(parseInt(period)) ? '?p=' + period : ''}`)
      .then((result) => result.json())
      .then(({ records, snapshot }) => {
        if (!snapshot || !records?.length) {
          return setError(
            (state) => "Something went wrong. Reload page and try again!"
          );
        }
        setUrl((state) => snapshot.location);
        setSnapshot((state) => snapshot.snapshot);
        setRecords((state) => records);
        setDateOfScreenshot(state => snapshot.timestamp);
        setSnapshotComponentKey(state => Math.random());
      })
      .catch((err) => {});
  }, [snapshotId, router.query]);

  const installCodeClick = useCallback(() => {
    router.push("/overview");
  }, [router]);

  let content = null;

  content = (
    <>
      <HeatmapAside />
      <div className={style.contentWrapper}>
        <header className={style.header}>
          <PagesHeader
            shareButtonProps={shareBtnProps}
            savedButtonProps={addNewHtmpBtnProps}
            title={daoName}
            url={url}
          />
          <LastDayAddFilter />
        </header>
        <main className={style.snapshotWrapper}>
          <SnapshotContainer key={`snapshot-component-key-${snapshotComponentKey}`} snapshot={snapshot} records={records} dateOfScreenshot={dateOfScreenshot} />
        </main>
      </div>
    </>
  );

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
