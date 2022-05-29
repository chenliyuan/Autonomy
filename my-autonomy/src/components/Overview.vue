<template>
  <div id="container">
    <van-nav-bar
      title="数据总览"
      right-text="项目"
      @click-right="onClickRight"
    />

    <van-dropdown-menu>
      <van-dropdown-item
        v-model="selectedValue"
        :options="items"
        @change="onChangeItem"
        v-my-directive
      />
    </van-dropdown-menu>
    <div id="myChart" :style="{ width: '400px', height: '300px' }"></div>
    <van-cell-group
      v-for="(item, index) in itemsTree"
      :key="index"
      :title="item.main_item"
      :border="false"
    >
      <template #title>
        <van-cell
          :title="item.main_item"
          icon="shop-o"
          title-class="item_class"
        >
        </van-cell>
      </template>
      <van-collapse v-model="activeNames">
        <van-collapse-item
          :name="subitem.sub_item"
          v-for="(subitem, index) in item.children"
          :key="index"
        >
          <template #title>
            <van-cell
              :title="'--' + subitem.sub_item + '--'"
              title-class="subitem_class"
              :border="false"
            >
              <template #right-icon>
                <van-icon
                  v-if="subitem.chart_type == 'line'"
                  name="chart-trending-o"
                  @click="routerTo(subitem)"
                />
                <van-icon
                  v-else-if="subitem.chart_type == 'bar'"
                  name="bar-chart-o"
                  @click="routerTo(subitem)"
                />
                <van-icon v-else name="more-o" @click="routerTo(subitem)" />
              </template>
            </van-cell>
          </template>

          <van-cell
            v-for="(content, index) in subitem.contents.slice(0, 10)"
            :key="index"
            :value="content.datetime"
            :label="content.note"
            :border="false"
          >
            <template #title>
              <van-cell
                v-if="content.value == 1"
                title="PASS"
                title-style="color:green;font-weight:600"
              />
              <van-cell
                v-else-if="content.value == 0"
                title="FREE"
                title-style="color:red;font-weight:600"
              />
              <van-cell
                v-else
                :title="content.value + ' ' + subitem.unit"
                title-style="font-weight:600"
              />
            </template>
          </van-cell>
          <!-- <el0-button>更多>></el0-button> -->
        </van-collapse-item>
      </van-collapse>
      <!-- </van-cell-group> -->
    </van-cell-group>
    <!-- <van-grid>
      <van-grid-item
        v-for="(item, index) in rankData"
        :key="index"
        :text="item.sub_item + ':' + item.count"
      />
    </van-grid> -->
  </div>
</template>

<script>
import { getItemstree, getItems, getRank } from "@/axios/api";
import { dateFormat } from "@/assets/comm";

export default {
  name: "Overview",
  data() {
    return {
      activeNames: ["1"],
      itemsTree: [],
      originTree: [],
      items: [{value:0,text:'全部'}],
      selectedValue: 0,
      activeNames: [],
      rankData: [],
      WeightData: {}
    };
  },
  methods: {
    onClickRight() {
      this.$router.push({ name: "itemlist" });
    },
    onChangeItem(value) {
      // console.log(value);
      this.itemsTree = this.originTree.filter(function(item) {
        return item.id == value;
      });
      //  console.log(this.items);
    },
    getItemstree() {
      var userid = localStorage.getItem("userid");
      getItemstree({
        userID: userid
      }).then(res => {
        this.originTree = res;
        this.itemsTree = this.originTree;
        this.WeightData = res
          .filter(rt => {
            return rt.id == 5;
          })[0]
          .children.filter(t => {
            return t.id == 4;
          })[0];
        this.drawLine(this.WeightData); //绘图

        res.map(item => {
          // console.log(item);
          this.items.push({ value: item.id, text: item.main_item });
        });

        // res.map((item) => {
        //   // if(item.recordtype==1){//若是实时类型的记录子项目
        //   this.subitems.push({
        //     id: item.id,
        //     text: item.sub_item,
        //   });
        //   // }
        // });

        // console.log(this.items);
      });
    },
    routerTo(subitem) {
      if (subitem.chart_type != "") {
        this.$router.push({ name: "chart", params: { subitem: subitem } });
      } else {
      }
    },
    // getRank() {
    //   getRank().then((res) => {
    //     this.rankData = res;
    //   });
    // },
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
    }
  },
  created() {
    this.getItemstree();
    // this.getRank();
    // this.getItems();
    this.$myMethod();
  },
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.item_class {
  /* background-color: darkmagenta; */
  font-size: 20px;
  color: dimgrey;
  /* font-weight: ; */
}

#container {
  /* height: 2000;
    overflow: auto; */
  margin-bottom: 50px;
}
.subitem_class {
  color: darkolivegreen;
  font-size: 16px;
}
</style>
