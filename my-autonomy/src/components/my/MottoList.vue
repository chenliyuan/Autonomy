<template>
  <div id="container">
    <van-nav-bar
      title="记录列表"
      left-text="返回"
      right-text="添加记录"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <van-dropdown-menu>
      <van-dropdown-item
        v-model="selectedValue"
        :options="dropdownItems"
        @change="onChangeItem"
      />
    </van-dropdown-menu>

    <van-swipe-cell v-for="(motto, index) in mottoList" :key="index">
      <template #left>
        <van-button
          square
          type="primary"
          text="修改"
          @click="onClickUpdate(motto)"
        />
      </template>
      <van-cell
        :label="'('+(index+1)+') '+ 
          '分类:' +
          mottoMap[motto.type] +
          ' 优先级(' +
          motto.prioty +
          ') ' +
          motto.createtime
        "
      >
        <template #title>
          <div class="title_class">{{motto.content }}</div>
        </template>
      </van-cell>
      <template #right>
        <van-button
          square
          text="删除"
          type="danger"
          @click="deleteMotto(motto.id)"
        />
      </template>
    </van-swipe-cell>
    <van-popup v-model="showAdd" :style="{ width: '100%', height: '100%' }">
      <van-form @submit="updateMotto">
        <div style="margin-top: 50px">
          <!-- {{checkedtype}} -->

          <van-radio-group v-model="checkedtype" direction="horizontal">
            <van-radio
              :name="key"
              :key="index"
              v-for="(value, key, index) in mottoMap"
              >{{ value }}</van-radio
            >

          </van-radio-group>
          <van-cell title="优先级"><van-stepper v-model="prioty" /></van-cell>

          <!-- <van-field
            v-model="content"
            type="textarea"
            rows="25"
            name="内容"
            label="内容"
            placeholder="内容"
            :rules="[{ required: true, message: '请填写内容' }]"
          /> -->
          <div style="text-align: center">
            <textarea
              autofocus
              rows="18"
              v-model="content"
              class="textarea_class"
            >
            </textarea>
          </div>
          <van-button round block type="info" native-type="updateMotto"
            >修改</van-button
          >
        </div>
      </van-form>
      <van-button
        round
        block
        type="info"
        @click="showAdd = false"
        style="background: grey; margin-top: 5px"
        >取消</van-button
      >
    </van-popup>

  </div>
</template>

<script>
import { getMottoList, deleteMotto, updateMotto, getMotto } from '@/axios/api';
import { dateFormat } from '@/assets/comm';

export default {
  data() {
    return {
      mottoList: [],
      originData: [],
      selectedValue: 3,
      content: '',
      checkedtype: '2',
      prioty: 1,
      showAdd: false,
      isUpdate: false,
      id: 0, //mottoid
      mottoMap: null,
      dropdownItems: [],
    };
  },
  filters: {
    // dateFilter(date) {
    //   var day = date.split(' ').slice(0, -1)[0];
    //   var oDay = day.split('-').slice(1).join('.');
    //   return oDay;
    // },
  },
  methods: {
    updateMotto() {
      updateMotto({
        id: this.id,
        userid: 1,
        content: this.content,
        createtime: dateFormat('YYYY-mm-dd HH:MM', new Date()),
        prioty: this.prioty,
        type: Number(this.checkedtype),
      }).then((res) => {
        if (res.status == 200) {
          this.$toast({
            type: 'success',
            message: '更新成功',
            icon: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.51yuansu.com%2Fpic2%2Fcover%2F00%2F30%2F64%2F58108b1202d43_610.jpg&refer=http%3A%2F%2Fpic.51yuansu.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1639969596&t=401efc3e877d475603faa124e1a1d5d7',
          });
          this.isUpdate = false;
          this.showAdd = false;
          this.getMottoList();
        } else {
          this.$toast({
            type: 'danger',
            message: '更新失败',
            icon: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F01%2F02%2F87%2F3256f42c34c24d9.jpg&refer=http%3A%2F%2Fbpic.588ku.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1639969620&t=69690cad3014ca53071910282f8c7404',
          });
        }
      });
    },
    onClickUpdate(item) {
      this.id = item.id;
      this.isUpdate = true;
      this.showAdd = true;
      this.getMotto();
    },
    getMotto() {
      getMotto({ mottoid: this.id }).then((res) => {
        this.content = res.content;
        this.prioty = res.prioty;
        this.checkedtype = res.type.toString();
      });
    },
    onChangeItem(value) {
      if (value == 0) {
        this.mottoList = this.originData;
      } else {
        this.mottoList = this.originData.filter(function (item) {
          return item.type == value;
        });
      }
    },
    getMottoList() {
      var userid = localStorage.getItem('userid');
      getMottoList({ userID: userid }).then((res) => {
        this.mottoList = res;
        this.originData = res;
        if (this.selectedValue != 0) {
          this.onChangeItem(this.selectedValue);
        }
      });
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    onClickRight() {
      this.$router.push({ name: 'addmotto' });
    },
    deleteMotto(id) {
      this.$dialog
        .confirm({ message: '确定删除吗', showCancelButton: true })
        .then(() => {
          deleteMotto({ mottoid: id }).then((res) => {
            if (res.status == 200) {
              this.$toast({ type: 'success', message: '删除成功' });
              this.getMottoList();
            } else {
              this.$toast({ type: 'danger', message: '删除失败' });
            }
          });
        });
    },
  },
  created() {
    this.mottoMap = this.$store.getters.getMottoMap;
    for (let mottokey in this.mottoMap) {
      this.dropdownItems.push({
        text: this.mottoMap[mottokey],
        value: Number(mottokey),
      });
    }
    console.log(this.dropdownItems);
    this.getMottoList();
  },
};
</script>

<style scoped>
#container {
  overflow: auto;
  height: 700px;
  margin-bottom: 60px;
}
/* .fixed_class {
  position: fixed;
  bottom: 50px;
} */
.title_class {
  white-space: pre-wrap;
  width: 300px;
  font-size: 16px;
}
.textarea_class {
  width: 90%;
  margin: auto;
}
</style>