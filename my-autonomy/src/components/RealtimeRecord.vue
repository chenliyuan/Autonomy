 <template>
  <div>
    <van-nav-bar
      title="实时记录"
      right-text="项目"
      @click-right="onClickRight"
    />
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
      <van-field v-if="isValue" v-model="value" label="值" :clearable="true" />
      <!-- <van-cell title="值">
        <template #right-icon>
          <van-switch
            v-model="value"
            v-if="!isValue"
            size="24"
            :active-value="1"
            :inactive-value="0"
          />
        </template>
      </van-cell> -->

      <van-field  label="值"  v-if="!isValue" 
        ><template #input>
          <van-switch
            v-model="value"
            v-if="!isValue"
            size="24"
            :active-value="1"
            :inactive-value="0"
          />
        </template>
      </van-field>
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
        :clearable="true"
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
      selectedItem: [],
      itemname: '',
      subitems: [],
      subItemName: '喂奶',
      showItemPicker: false,
      showSubItemPicker: false,
      showDate: false,
      date: new Date(),
      minDate: new Date(2021, 0, 1),
      maxDate: new Date(2025, 10, 1),
      showtime: false,
      desc: '',
      selectedItemid: 3,
      value: 0,
      isValue: true, //是否是布尔类型，布尔类型显示为开关
    };
  },
  computed: {
    datetime: function () {
      return dateFormat('YYYY-mm-dd HH:MM', new Date(this.date));
    },
  },
  watch: {
    itemname(newv, oldv) {
      console.log(newv, 'ild:' + oldv, this.selectedItem);
      if (oldv == '') {
        this.getSubitems();
      }
    },
  },
  methods: {
    onClickRight() {
      this.$router.push({ name: 'itemlist' });
    },
    getSubitems() {
      getSubitems({
        itemid: this.selectedItem.id,
      }).then((res) => {
        this.subitems = [];
        res.map((item) => {
          this.subitems.push({
            id: item.id,
            text: item.sub_item,
            unit: item.unit,
          });
        });
      });
    },
    onConfirmItem(item, index) {
      //index前后选中序列号号
      this.selectedItem = item;
      this.itemname = item.text;
      this.getSubitems();
      //   this.unit = this.items[index[0]].children[index[1]].unit;
      //   this.subitemid = this.items[index[0]].children[index[1]].id;
      this.showItemPicker = false;
    },
    onConfirmSubItem(item) {
      console.log(item);
      this.subItemName = item.text;
      this.selectedItemid = item.id;
      this.showSubItemPicker = false;
      this.isValue = Number(Boolean(item.unit));
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
        note: this.desc,
        img: '',
      };
      saveData(params).then((res) => {
        console.log(res);
        if (res.status == 200) {
          this.$toast({ type: 'success', message: '保存成功' });
          this.$router.push({ name: 'overview' });
        } else {
          this.$toast({ type: 'danger', message: '保存失败' });
        }
      });
    },
  },
  created() {
    var userid = localStorage.getItem('userid');
    getItems({ userID: userid }).then((res) => {
      this.itemname = res[0].main_item; //默认取第一个主项目
      this.selectedItem = res[0];
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

