export const new_colors=
[
    '#ee4d2d',
    '#e6b600',
    '#0098d9',
    '#2b821d',
    '#005eaa',
    '#339ca8',
    '#cda819',
    '#32a487',
    '#2ec7c9',
    '#b6a2de',
    '#5ab1ef',
    '#97b552',
    '#95706d',
    '#dc69aa',
    '#07a2a4',
    '#9a7fd1',
    '#588dd5',
    '#f5994e',
    '#c05050',
    '#59678c',
    '#c9ab00',
    '#7eb00a',
    '#6f5553',
    '#c14089',
];
var bar_option={
    title: {
      text: "ECharts 入门示例",
    },
    tooltip: {},
    xAxis: {
      data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
    },
    yAxis: {},
    series: [
      {
        name: "销量",
        type: "bar",
        data: [5, 20, 36, 10, 10, 20],
      },
    ],
  }
  var line_option = {
    title: {
      left: 'center',
    },
    color: new_colors,
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross', //直线指示器
        label: {
          backgroundColor: '#283b56',
        },
      },
    },
    legend: {
      bottom: true,
    },
    grid: {},
    // toolbox: {
    //   show: true,
    //   feature: {
    //     magicType: {
    //       type: ['bar'],
    //     },
    //     dataView: {
    //       readOnly: true,
    //       buttonColor: '#ee4d2d',
    //       lang: ['数据视图', '关闭'],
    //     },
    //     restore: {},
    //     saveAsImage: {},
    //   },
    // },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        // name:'Date'
      },
    ],
    yAxis: [
      {
        // name: 'bug个数',
        type: 'value',
        // minInterval: 1,
      },
    ],
    series: [],
  };

  export {bar_option,line_option}