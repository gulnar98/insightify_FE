import React from 'react'
import DonutChartBody from '../DonutChartBody'
import HeaderDonutChart from '../headerDonutChart'
import styles from './asset/css/style.module.css'

function WalletDonutChart() {
  return (
     <>
     <div className={styles.wrapper}>
        <div className={styles.head}><HeaderDonutChart text="Wallet distribution"/></div>
        <div className={styles.body}><DonutChartBody text1="Metamask" text2='Coinbase' data={[20, 10]} showPercentage={true}/></div>
     </div>
  
    </>
  )
}

export default WalletDonutChart