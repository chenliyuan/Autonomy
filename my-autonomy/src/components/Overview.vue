<template>
  <div>
    <van-nav-bar title="数据总览" />
    <van-cell-group
      v-for="(item, index) in itemsTree"
      :key="index"
      :title="item.main_item"
    >
      <template #title>
        <van-cell
          :title="item.main_item"
          icon="shop-o"
          title-class="item_class"
        >
        </van-cell>
      </template>
      <van-cell-group
        :border="false"
        v-for="(subitem, index) in item.children"
        :key="index"
        :title="subitem.sub_item"
      >
        <van-cell
          v-for="(content, index) in subitem.contents"
          :key="index"
          :title="content.value"
          :value="content.datetime"
        ></van-cell>
      </van-cell-group>
    </van-cell-group>
  </div>
</template>

<script>
import { getItemstree } from '@/axios/api';

export default {
  name: 'Overview',
  data() {
    return {
      activeNames: ['1'],
      itemsTree: [],
      // allnum:10
    };
  },
  methods: {
    getItemstree() {
      getItemstree({
        // starttime: dateFormat('YYYY-mm-dd HH:MM', new Date()),
        // endtime: endtime,
      }).then((res) => {
        this.itemsTree = res;
        // for (let i = 0; i < this.items.length; i++) {
        //   for (let j = 0; j < this.items[i].children.length; j++) {
        //     if (this.items[i].children[j].contents.length == 0) {
        //       this.items[i].children[j].contents = [
        //         {
        //           itemid: this.items[i].children[j].id,
        //           value: 0,
        //           datetime: dateFormat('YYYY-mm-dd HH:MM', new Date()),
        //           updatetime: dateFormat('YYYY-mm-dd HH:MM', new Date()),
        //           note: '',
        //           img: '',
        //         },
        //       ];
        //     }
        //   }
        // }
        console.log('this.items:', this.items);
      });
    },
    drawBar(id) {
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById(id));
      // 绘制图表
      myChart.setOption(this.$echartoptions);
    },
  },
  created() {
    this.getItemstree();
  },
  mounted() {
    for (let i = 1; i <= 10; i++) {
      this.drawBar(i);
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.item_class {
  /* background-color: darkmagenta; */
  font-size: 20px;
  /* color: darkgrey; */
}
</style>
