<template>
  <div class="container">
    <van-nav-bar
      title="每日记录"
      right-text="项目"
      @click-right="onClickRight"
    />
    <!-- {{mottoList[0].content}} -->
    <!-- <van-notice-bar wrapable :scrollable="false" :text="mottoList[0].content" />
    <van-notice-bar wrapable :scrollable="false" :text="mottoList[1].content" />
    <van-notice-bar wrapable :scrollable="false" :text="mottoList[2].content" /> -->
    <div class="time">
      宝宝已经<span style="padding: 10px; color: blue">{{
        bornMonDiff
      }}</span>了
    </div>
    <!-- {{ lastWeekData }} -->
    <div>{{ "上周和本周情况" }}</div>
    <div
      v-for="(item, index) in lastWeekData"
      :key="index"
      class="grid-style"
      :class="{ 'pass-style': item.result, 'fail-style': !item.result }"
    >
      <div>{{ item.text }}</div>
      <div>{{ item.realValue }}/{{ item.threshold }}</div>
    </div>
    <div
      v-for="(line, i) in currWeekData"
      :key="i+line.text"
      class="grid-style"
      :class="{ 'pass-style': line.result, 'fail-style': !line.result }"
    >
      <div>{{ line.text }}</div>
      <div>{{ line.realValue }}/{{ line.threshold }}</div>
    </div>
    <van-cell
      title="选择日期"
      is-link
      :value="selectedDate"
      @click="showDate = true"
      :style="{ background: bkColor }"
    />
    <van-calendar
      v-model="showDate"
      @confirm="onConfirm"
      :min-date="minDate"
      :max-date="maxDate"
    />

    <van-form @submit="onSubmit" class="form">
      <van-cell-group
        v-for="(item, index) in items"
        :key="index"
        :title="item.main_item"
        :border="false"
      >
        <template #title>
          <van-cell
            :title="item.main_item"
            icon="shop-o"
            title-class="title_class"
          >
          </van-cell>
        </template>
        <div v-for="(subitem, index) in item.children" :key="index">
          <!-- {{ subitem.contents[0] }} -->

          <van-field
            v-if="subitem.unit != '' && subitem.recordtype == 1"
            v-model="subitem.contents[0].value"
            :label="subitem.sub_item + '(' + subitem.unit + ')'"
            input-align="right"
            label-class="left_field"
            :clearable="true"
          >
            <!-- <van-field
            v-if="subitem.unit != '' && subitem.recordtype == 1"
            v-model="subitem.contents[0].value"
            :label="subitem.sub_item + '(' + subitem.unit + ')'"
            input-align="right"
            label-class="left_field"
            :clearable="true"
            right-icon="more-o"
            @click-right-icon="routeToChart(subitem)"
          > -->
            <!-- <template #button>
              <van-button
                size="small"
                type="primary"
                @click="routeToChart(subitem.id)"
                >详情</van-button
              >
            </template> -->
          </van-field>
          <van-cell
            center
            :title="subitem.sub_item"
            v-if="subitem.unit == '' && subitem.recordtype == 1"
          >
            <template #right-icon>
              <van-switch
                v-model="subitem.contents[0].value"
                size="24"
                :active-value="1"
                :inactive-value="0"
              />
              <!-- <van-icon name="more-o" @click="routeToChart(subitem)" /> -->
            </template>
          </van-cell>
        </div>
      </van-cell-group>
      <div  class="submit">
      <van-button round block type="info" native-type="submit" class="submit"
        >提交</van-button
      >
      </div>
    </van-form>
  </div>
</template>

<script>
import {
  saveData,
  getSubitems,
  getItemstree,
  saveDataList,
  getMottoList,
  getDataList,
  getWeekData,
  getCurrWeekData,
} from "@/axios/api";
import { dateFormat, timeFn ,monDiff} from "@/assets/comm";

export default {
  data() {
    return {
      showDate: false,
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(),
      selectedDate: dateFormat("YYYY-mm-dd", new Date()),
      active: 1,
      showCheckbox: false,
      showSelect: true,
      showItemPicker: false,
      items: [
      ],
      unit: "次",
      desc: "",

      time: new Date(),
      itemname: "",
      subitemid: 0,
      showtime: "",
      bornTime: "",
      // workTime: "",
      mottoList: [{ content: "" }, { content: "" }, { content: "" }],
      bkColor: "AQUA",
      lastWeekData: [
      ],
      currWeekData:[],
      bornMonDiff:''
    };
  },
  methods: {
    getWeekData() {
      getWeekData().then((res) => {
        this.lastWeekData = res;
      });
    },
    getCurrWeekData() {
      getCurrWeekData().then((res) => {
        this.currWeekData = res;
      });
    },
    onClickRight() {
      this.$router.push({ name: "itemlist" });
    },
    getMottoList() {
      getMottoList().then((res) => {
        this.mottoList = res.filter(function (item) {
          return item.type == 5;
        });
      });
    },
    onSubmit() {
      console.log("提交。。。。");
      //axios.post('saveData')
      const params = [];
      for (let i = 0; i < this.items.length; i++) {
        for (let subitem of this.items[i].children) {
          console.log(subitem.value);
          if (subitem.recordtype == 1) {
            // console.log('新的 subitem.contents', subitem.contents);
            let newContent = subitem.contents[0];
            newContent.datetime = this.selectedDate;
            newContent.updatetime = this.selectedDate;

            params.push(
              newContent

              //   {
              //   itemid: subitem.id,
              //   value:
              //     subitem.contents[0].value == undefined
              //       ? 0
              //       : Number(subitem.value),
              //   datetime: dateFormat('YYYY-mm-dd HH:MM', new Date()),
              //   updatetime: dateFormat('YYYY-mm-dd HH:MM', new Date()),
              //   note: '',
              //   img: '',
              // }
            );
          }
        }
      }
      saveDataList(params).then((res) => {
        if (res.status == 200) {
          this.$toast({
            type: "success",
            message: "更新成功",
            icon:
              "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.51yuansu.com%2Fpic2%2Fcover%2F00%2F30%2F64%2F58108b1202d43_610.jpg&refer=http%3A%2F%2Fpic.51yuansu.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1639969596&t=401efc3e877d475603faa124e1a1d5d7",
          });
        } else {
          this.$toast({
            type: "danger",
            message: "更新失败",
            icon:
              "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F01%2F02%2F87%2F3256f42c34c24d9.jpg&refer=http%3A%2F%2Fbpic.588ku.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1639969620&t=69690cad3014ca53071910282f8c7404",
          });
        }
      });
    },
    openTime() {
      this.showDate = true;
    },
    getSubitems(itemid) {
      getSubitems({ itemid: itemid }).then((res) => {
        this.subitems = res;
      });
    },
    getDayItemstree(startDate, endDate) {
      var userid = localStorage.getItem("userid");
      getItemstree({
        starttime: startDate, // dateFormat('YYYY-mm-dd', new Date()),
        endtime: endDate,
        userID: userid,
      }).then((res) => {
        this.items = res;
        if (this.items.length > 0) {
          for (let i = 0; i < this.items.length; i++) {
            for (let j = 0; j < this.items[i].children.length; j++) {
              if (this.items[i].children[j].contents.length == 0) {
                //如果content中没有内容则添加空值
                this.items[i].children[j].contents = [
                  {
                    itemid: this.items[i].children[j].id,
                    value: 0,
                    datetime: dateFormat("YYYY-mm-dd HH:MM", new Date()),
                    updatetime: dateFormat("YYYY-mm-dd HH:MM", new Date()),
                    note: "",
                    img: "",
                  },
                ];
              }
            }
          }
        }
        console.log("this.items:", this.items);
      });
    },
    onConfirm(date) {
      this.showDate = false;
      this.selectedDate = dateFormat("YYYY-mm-dd", date);
      let startDate = dateFormat("YYYY-mm-dd", date);
      let endDate = dateFormat(
        "YYYY-mm-dd",
        new Date(date.setDate(date.getDate() + 1))
      );
      this.getDayItemstree(startDate, endDate);
    },
    // routeToChart(subitem) {//由于该链接用户交互不友好，该功能暂且隐藏
    //   console.log('subitem:', subitem);
    //   getDataList({
    //     subitemid: subitem.id,
    //   }).then((res) => {
    //     let newSubitem = subitem;
    //     newSubitem.contents = res; //替换为当前项目所有该子项目的数据
    //     this.$router.push({ name: 'chart', params: { subitem: newSubitem } });
    //   });
    // },
  },
  created() {
    let startDate = dateFormat("YYYY-mm-dd", new Date());
    let endDate = dateFormat(
      "YYYY-mm-dd",
      new Date(new Date().setDate(new Date().getDate() + 1))
    );
    this.getDayItemstree(startDate, endDate);
    this.getMottoList();
    // this.getWeekData();
    // this.getCurrWeekData();
    this.bornTime = timeFn("2021-05-25 09:18:00", new Date());
    // this.workTime = timeFn(new Date(), "2021-12-20 19:00:00");
    this.bornMonDiff=monDiff("2021-05-25 09:18:00", new Date());
  },
};
</script>

<style scoped>
.left_field {
  width: 60%;
}
.container {
  height: 1000px;
  /* height: 100vh; */
  /* margin-bottom: 250px; */
}
.title_class {
  /* background-color: blueviolet; */
  font-size: 20px;
  color: darkgrey;
  width: 70%;
}
.time {
  margin: 20px 0px 20px 20px;
}
.submit {
  position: fixed;
  bottom: 60px;
}

.grid-style {
  float: left;
  /* display: inline; */
  padding: 20px 0px;
  font-size: 14px;
  font-weight: 700;
  /* height: 80%; */
  width: 18%;
  text-align: center;
  border: solid black;
  color: white;
}
.pass-style {
  background-color: green;
}
.fail-style {
  background-color: red;
}

/* .result-text{
  color:white;

} */

.form{
  padding-bottom:160px;
  /* border:solid red; */
}
</style>
