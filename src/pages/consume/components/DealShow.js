import ReactEcharts from 'echarts-for-react';  // or var ReactEcharts = require('echarts-for-react');
import { connect } from 'dva';

function DealShow({ dispatch, statistical }) {

  const rechargeData = statistical.filter((value) => value.dealType === 'RECHARGE')
    .map((value) => value.sum);

  const consumeData = statistical.filter((value) => value.dealType === 'CONSUME')
    .map((value) => value.sum);

  const dateData = statistical.map((value) => value.date);
  let set = new Set(dateData);

  const date = Array.from(set);
  const option = {
    color: ['#daecfd', '#e6fdd3'],
    title: {
      text: '近期交易金额统计'
    },
    tooltip: {},
    legend: {
      data: ['充值', '消费']
    },
    xAxis: {
      data: date
    },
    yAxis: {},
    series: [{
      name: '充值',
      type: 'bar',
      data: rechargeData
    }, {
      name: '消费',
      type: 'bar',
      data: consumeData
    }]
  }

  const onChartReadyCallback = (e) => {
    console.log("回调函数");
  }


  return (
    <ReactEcharts
      option={option}
      notMerge={true}
      lazyUpdate={true}
      theme={"white"}
      onChartReady={onChartReadyCallback}
      opts={{ renderer: 'svg' }}
      style={{ width: 1200 }} />
  );
}

function mapStateToProps(state) {
  const { statistical } = state.consume;
  return { statistical };
}

export default connect(mapStateToProps)(DealShow);

