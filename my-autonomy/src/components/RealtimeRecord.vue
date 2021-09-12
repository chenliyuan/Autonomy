 <template>
  <div>
    <van-nav-bar title="实时记录" />
    <van-form @submit="onSubmit">
      <van-field
        readonly
        clickable
        label="项目"
        :value="itemname"
        placeholder="选择项目"
        @click="showItemPicker = true"
      />
      <van-popup
        v-model="showItemPicker"
        position="bottom"
        :style="{ height: '50%' }"
      >
        <van-picker
          title="选择项目"
          show-toolbar
          :columns="items"
          @confirm="onConfirmItem"
        />
      </van-popup>

      <van-field
        readonly
        clickable
        label="子项目"
        :value="subItemName"
        placeholder="选择子项目"
        @click="showSubItemPicker = true"
      />
      <van-popup
        v-model="showSubItemPicker"
        position="bottom"
        :style="{ height: '50%' }"
      >
        <van-picker
          title="选择子项目"
          show-toolbar
          :columns="subitems"
          @confirm="onConfirmSubItem"
        />
      </van-popup>
      <van-field v-model="value" label="值" />
      <van-field
        readonly
        clickable
        label="时间"
        @click="showDate = true"
        v-model="datetime"
      />
      <van-popup
        v-model="showDate"
        position="bottom"
        :style="{ height: '50%' }"
      >
        <van-datetime-picker
          type="datetime"
          title="选择完整时间"
          v-model="date"
          :min-date="minDate"
          :max-date="maxDate"
          @confirm="onConfirmTime"
          @cancel="showDate = false"
        />
      </van-popup>
      <van-field
        v-model="desc"
        rows="2"
        autosize
        label="备注"
        type="textarea"
        placeholder="备注可忽略"
      />
      <van-button round block type="info" native-type="submit">提交</van-button>
    </van-form>
  </div>
</template>

<script>
import { getItems, getSubitems, saveData } from '@/axios/api';
import { dateFormat } from '@/assets/comm';
export default {
  data() {
    return {
      items: [],
      itemname: '',
      subitems: [],
      subItemName: '',
      showItemPicker: false,
      showSubItemPicker: false,
      showDate: false,
      date: new Date(),
      minDate: new Date(2021, 0, 1),
      maxDate: new Date(2021, 10, 1),
      showtime: false,
      desc: '',
      selectedItemid: 0,
      value: 0,
    };
  },
  computed: {
    datetime: function () {
      return dateFormat('YYYY-mm-dd HH:MM', new Date(this.date));
    },
  },
  methods: {
    formatter(type, val) {
      console.log(type, val);
    },
    onConfirmItem(item, index) {
      console.log(dateFormat('YYYY-mm-dd HH:MM', new Date()));
      //index前后选中序列号号
      this.itemname = item.text;
      getSubitems({
        itemid: item.id,
      }).then((res) => {
        res.map((item) => {
          // if(item.recordtype==1){//若是实时类型的记录子项目
          this.subitems.push({
            id: item.id,
            text: item.sub_item,
          });
          // }
        });
      });
      //   this.unit = this.items[index[0]].children[index[1]].unit;
      //   this.subitemid = this.items[index[0]].children[index[1]].id;
      this.showItemPicker = false;
    },
    onConfirmSubItem(item) {
      this.subItemName = item.text;
      this.selectedItemid = item.id;
      this.showSubItemPicker = false;
    },
    onConfirmTime(item, index) {
      console.log(item, index);
      this.showtime = item;
      this.showDate = false;
    },
    onSubmit() {
      var params = {
        itemid: this.selectedItemid,
        value: Number(this.value),
        datetime: this.datetime,
        updatetime: dateFormat('YYYY-mm-dd HH:MM', new Date()),
        note: '',
        img: '',
      };
      saveData(params).then((res) => {
        console.log(res);
        if (res.status == 200) {
          this.$notify({ type: 'success', message: '保存成功' });
          this.$router.go(-1);
        } else {
          this.$notify({ type: 'danger', message: '保存失败' });
        }
      });
    },
  },
  created() {
    getItems().then((res) => {
      res.map((item) => {
        this.items.push({
          id: item.id,
          text: item.main_item,
        });
      });
    });
  },
};
</script>

<style>
</style>

