import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import styles from './asset/css/style.module.css';
import red from './asset/image/red.svg';
import blue from './asset/image/blue.svg';
import ChartDataLabels from 'chartjs-plugin-datalabels';

function DonutChartBody(props) {
  const { data, showPercentage } = props;
  const text1 = props.text1 || 'Search Engine';
  const text2 = props.text2 || 'Union Ads';

  const chartData = {
    datasets: [{
      data: data || [20, 10],
      backgroundColor: ['#5470C6', '#EE6666'],
      hoverBackgroundColor: ['#5470C6', '#EE6666'],
      borderRadius: [5, 5],
      borderWidth: 0
    }]
  };

  const chartOptions = {
    cutout: 85,
    plugins: {
      tooltip: {
        enabled: false
      },
      datalabels: {
        align: 'center',
        formatter: (value, context) => {
          if (showPercentage) {
            const datapoints = context.chart.data.datasets[0].data;
            const totalValue = datapoints.reduce((total, datapoint) => total + datapoint, 0);
            const percentageValue = ((value / totalValue) * 100).toFixed(1);
            return `${percentageValue}%`;
          }
          return '';
        },
        color: '#fff'
      }
    }
  };

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.chart_container}>
          <Doughnut data={chartData} chart={Chart} options={chartOptions} plugins={[ChartDataLabels]} />
        </div>
        <div className={styles.text_container}>
          <div className={styles.blueLabel}>
            <img className={styles.blue} src={blue.src} alt="blue_icon" />
            <p>{text1}</p>
          </div>
          <div className={styles.redLabel}>
            <img className={styles.red} src={red.src} alt="red_icon" />
            <p>{text2}</p>
          </div>
        </div>
      </div>
    </>
  );
}

DonutChartBody.defaultProps = {
  showPercentage: false // Default to not showing the percentage
};

export default DonutChartBody;




