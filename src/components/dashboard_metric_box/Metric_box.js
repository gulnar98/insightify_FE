import React from 'react';
import styles from "./asset/css/style.module.css";
import graph from "./asset/images/graph.svg";
import box from "./asset/images/box.svg";

//Bu dasboradda olan total session, total connected wallet ve s. bildiren balaca divlerdir 


export default function Metric_box(props) {
  const count = props.count || 0;
  const noResultsText = props.noResultsText || 'Not result found';
  const metricBoxText = props.metricBoxText || 'Total Reviews: ';
 


  return (
    <>
      <div className={styles.wrapper}>
        <p className={styles.title}>{metricBoxText}</p>
        {
          count ? (
            <div className={styles.true_case}>
              <p className={styles.n}>{count}</p>
             <img  className={styles.ImageWrapper} src={graph.src} alt='graph' />
            </div>


          )


            : (

              <div className={styles.false_case}>
                <img src={box.src} alt='box' />
                <p className={styles.noResultsText}>{noResultsText}</p>

              </div>


            )
        }

      </div>

    </>

  )
}






