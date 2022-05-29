<template>
  <div id="divContainer">
    <van-nav-bar title="数据统计" left-text="返回" @click-left="onClickLeft" />
    <van-cell-group title="总计">
      <!-- <van-cell title="总和" :value="sum.toFixed()" /> -->
      <!-- <van-cell title="平均值" :value="avg" /> -->

      <van-cell title="最小有效值" :value="NotZrMin" />
      <van-cell title="最大值" :value="max" />
      <!-- <van-cell title="最小值" :value="min" /> -->
      <van-cell title="记录总数" :value="num" />

      <van-cell title="极差"  >{{(max-NotZrMin).toFixed(1)}}</van-cell>
    </van-cell-group>
    <van-divider />

    <van-cell-group title="有效记录">
      <van-cell title="有效记录数" :value="validnum" />
      <!-- <van-cell title="有效记录平均值" :value="validavg" /> -->
    </van-cell-group>
    <!-- <van-cell title="" :value="sum" /> -->
    <!-- <van-cell-group title="日喂奶量" v-if="feedList.length > 0">
      <van-cell
        v-for="(item, index) in feedList"
        :key="index"
        :title="item.time"
        :value="item.sumvalue + ' | ' + item.count"
      >
        <template #default>
          <div>
            <span style="font-weight:600;font-size:18px;color:blue">{{
              item.sumvalue
            }}</span>
            /{{ item.count }}
          </div>
        </template>
      </van-cell>
    </van-cell-group> -->
    <div id="myChart" :style="{ width: '400px', height: '300px' }"></div>
  </div>
</template>

<script>
import { dateFormat } from "@/assets/comm";
import { getBreastfeed } from "@/axios/api";
export default {

  name: "ChartView",
  //   props: ['subItem'],
  data() {
    return {
      subItem: [],
      avg: 0,
      sum: 0,
      num: 0,
      validnum: 0,
      validavg: 0,
      min: 1000,
      max: 0,
      feedList: [],
      // showCount: true,
      range: 0,
      NotZrMin: 1000
    };
  },
  watch: {
    // subItem(newv, oldv) {
    //   console.log('newv', newv);
    //   this.$nextTick(function () {
    //     //等待dom加载完成后执行https://www.cnblogs.com/caiba/p/9116107.html
    //     this.drawall();
    //   });
    // },
  },
  methods: {
    drawbar(subitem, index) {
      if (document.getElementById("myChart") == null) {
        console.log("is null?");
        return;
      }
      var barChart;

      barChart = this.$echarts.init(document.getElementById("myChart"));
      barChart.clear();
      // 绘制图表
      barChart.setOption(this.$echartoptions.bar_option);
      var datetimes = subitem.contents
        .map(data => dateFormat("mm.dd", new Date(data.datetime)))
        .reverse();
      var values = subitem.contents.reverse();
      const bar_option = {
        title: {
          text: subitem.sub_item
        },
        xAxis: {
          // type: 'category',
          data: datetimes
        },
        yAxis: [
          {
            name: subitem.unit
          }
        ],
        series: [
          {
            data: values,
            type: "bar",
            markLine: {
              data: [
                {
                  type: "average",
                  name: "平均值"
                }
                //           {
                //   type: 'max',
                //   name: '最大值',
                // },
                //           {
                //   type: 'min',
                //   name: '最小值',
                // },
              ]
            }
          }
        ]
      };
      console.log("bar_option:", bar_option);
      barChart.setOption(bar_option);
    },
    drawLine(subitem, index) {
      console.log("subitem", subitem, index);
      // 基于准备好的dom，初始化echarts实例
      if (document.getElementById("myChart") == null) {
        console.log("is null?");
        return;
      }
      var myChart;

      if (myChart != null && myChart != "" && myChart != undefined) {
        console.log("已经存在");
        // myChart.dispose();
      }
      myChart = this.$echarts.init(document.getElementById("myChart"));
      myChart.clear();
      // 绘制图表
      myChart.setOption(this.$echartoptions.line_option);
      var contents = subitem.contents.filter(item => {
        return item.value > 0;
      });
      var datetimes = contents
        .map(data => dateFormat("mm.dd", new Date(data.datetime)))
        .reverse();
      var values = contents.reverse();
      const myoption = {
        title: {
          text: subitem.sub_item
        },
        xAxis: {
          // type: 'category',
          data: datetimes
        },
        yAxis: [
          {
            name: subitem.unit,
            minInterval: 1,
            min: "dataMin"
          }
        ],
        series: [
          {
            markLine: {
              data: [
                {
                  type: "average",
                  name: "平均值"
                }
              ]
            },
            data: values,
            type: "line",
            smooth: true
          }
        ]
      };
      myChart.setOption(myoption);
    },
    drawall() {
      if (this.subItem.chart_type == "bar") {
        this.drawbar(this.subItem);
      } else if (this.subItem.chart_type == "line") {
        this.drawLine(this.subItem);
      }
    },
    onClickLeft() {
      this.$router.go(-1);
    }
  },
  created() {
    this.subItem = this.$route.params.subitem;
    console.log("chartview created", this.subItem);

    // if (this.subItem.id == 3) {
    //   //喂养
    //   getBreastfeed({ subitemID: 3 }).then(res => {
    //     this.feedList = res.reverse();
    //     console.log("feedList", this.feedList);
    //   });
    // }
    this.num = this.subItem.contents.length;
    for (let content of this.subItem.contents) {
      let contentValue = Number(content.value);
      this.sum += contentValue; //计算出总和
      if (contentValue > this.max) {
        //计算出最大值
        this.max = contentValue.toFixed(1);
      }
      if (contentValue < this.min) {
        if (contentValue != 0) {
          this.NotZrMin = contentValue;
        } else {
          this.min = contentValue;
        }
      }
      if (contentValue != 0) {
        //计算有效个数
        this.validnum += 1;
      }
    }
    this.avg = (this.sum / this.num).toFixed(2);
    this.validavg = (this.sum / this.validnum).toFixed(2);
  },
  mounted() {
    console.log("chartview mounted");
    this.drawall();
  }
};
</script>

<style scoped>
#divContainer {
  /* overflow: auto;
  height: 700px;  */
  /* width: 300px; */
  /* background-color:red; */
  margin-bottom: 60px;
}
</style>
