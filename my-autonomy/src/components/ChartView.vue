 <template>
  <div id="divContainer">
    <!-- 这里是ChartView
    {{ subItem }} -->
    <div
      v-for="(item, index) in subItem"
      :key="index"
      :id="`div${index}`"
      :style="{ width: '400px', height: '300px' }"
    >
      <!-- caonima{{ item.name }} -->
    </div>
  </div>
</template>

<script>
// import { getSubitems } from '@/axios/api';
export default {
  name: 'ChartView',
  //   props: ['subItem'],
  data() {
    return {
      itemid: 0,
      subItem: [],
      //   subitems: [],
    };
  },
  watch: {
    subItem(newv, oldv) {
      console.log('newv', newv);
      this.$nextTick(function () {
        //等待dom加载完成后执行https://www.cnblogs.com/caiba/p/9116107.html
        this.drawall();
      });
    },
  },
  methods: {
    drawbar(subitem, index) {
      console.log('subitem ', subitem.contents);

      if (document.getElementById(`div${index}`) == null) {
        console.log('is null?');
        return;
      }
      var barChart;

      barChart = this.$echarts.init(document.getElementById(`div${index}`));
      barChart.clear();
      // 绘制图表
      barChart.setOption(this.$echartoptions.bar_option);
      var datetimes = subitem.contents.map((data) => data.datetime);
      var values = subitem.contents;
      const bar_option = {
        title: {
          text: subitem.sub_item,
        },
        xAxis: {
          // type: 'category',
          data: datetimes,
        },
        yAxis: [
          {
            name: subitem.unit,
          },
        ],
        series: [
          {
            data: values,
            type: 'bar',
            markLine: {
              data: [
                {
                  type: 'average',
                  name: '平均值',
                },
              ],
            },
          },
        ],
      };
      console.log('bar_option:', bar_option);
      barChart.setOption(bar_option);
    },
    drawLine(subitem, index) {
      console.log('subitem', subitem, index);
      // 基于准备好的dom，初始化echarts实例
      if (document.getElementById(`div${index}`) == null) {
        console.log('is null?');
        return;
      }
      var myChart;

      if (myChart != null && myChart != '' && myChart != undefined) {
        console.log('已经存在');
        // myChart.dispose();
      }
      myChart = this.$echarts.init(document.getElementById(`div${index}`));
      myChart.clear();
      // 绘制图表
      myChart.setOption(this.$echartoptions.line_option);
      var datetimes = subitem.contents.map((data) => data.datetime);
      var values = subitem.contents;
      const myoption = {
        title: {
          text: subitem.text,
        },
        xAxis: {
          // type: 'category',
          data: datetimes,
        },
        yAxis: [
          {
            name: subitem.unit,
          },
        ],
        series: [
          {
            markLine: {
              data: [
                {
                  type: 'average',
                  name: '平均值',
                },
              ],
            },
            data: values,
            type: 'line',
          },
        ],
      };
      myChart.setOption(myoption);
    },
    drawall() {
      console.log("drallall",this.subItem)
      if (this.subItem!=undefined&&this.subItem.length > 0) {
        for (let i = 0; i < this.subItem.length; i++) {
          console.log('打印', this.subItem);
          if (this.subItem[i].chart_type == 'bar') {
            console.log('bar,,');
            this.drawbar(this.subItem[i], i);
          } else if (this.subItem[i].chart_type == 'line') {
            this.drawLine(this.subItem[i], i);
          }
        }
      }
    },
  },
  created() {
    console.log('chartview created');
    this.subItem = this.$route.params.subitem;
  },
  mounted() {
    console.log('chartview mounted');
    this.drawall();
  },
};
</script>

<style scoped>
#divContainer {
  overflow: auto;
  height: 1000px;
  width: 300px;
  /* background-color:red; */
}
</style>