 <template>
  <div>
    <van-nav-bar
      title="历史数据"
      left-text="返回"
      right-text="添加数据"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <van-swipe-cell v-for="(item, index) in datali" :key="index">
      <!-- <van-cell :title="item.value" :value="item.datetime" :label="item.desc" /> -->
      <template #left>
        <van-button
          square
          type="primary"
          text="修改"
          @click="onClickUpdate(item)"
        />
      </template>
      <van-cell
        v-if="item.value == 1"
        :value="item.datetime"
        :label="item.desc"
        title="PASS"
        title-style="color:green;font-weight:600"
      />
      <van-cell
        v-else-if="item.value == 0"
        :value="item.datetime"
        :label="item.desc"
        title="FREE"
        title-style="color:red;font-weight:600"
      />
      <van-cell
        v-else
        :title="item.value"
        :value="item.datetime"
        :label="item.desc"
        title-style="font-weight:600"
      />

      <template #right>
        <van-button
          square
          text="删除"
          type="danger"
          @click="deleteData(item.id)"
        />
      </template>
    </van-swipe-cell>
    <van-popup v-model="showPop" :style="{ width: '60%', height: '50%' }">
      <van-nav-bar title="添加/修改子项目" />
      <van-form @submit="onSubmit">
        <van-field
          v-model="contentValue"
          name="值"
          label="值"
          :rules="[{ required: true, message: '请填写值' }]"
        />
        <!-- <van-field
          v-model="contentTime"
          name="时间"
          label="时间"
          :rules="[{ required: true, message: '请填写时间' }]"
        /> -->
        <van-field
          v-model="note"
          rows="2"
          autosize
          label="备注"
          type="textarea"
          placeholder="备注可忽略"
          :clearable="true"
        />
        <van-button round block type="info" native-type="submit"
          >更新</van-button
        >
      </van-form>
    </van-popup>
  </div>
</template>

<script>
import { getDataList, deleteData, updateData } from '@/axios/api';
import { dateFormat } from '@/assets/comm';

export default {
  data() {
    return {
      subitemid: 0,
      datali: [],
      showPop: false,
      contentItem: {},
      contentId: 0,
      note: '',//新备注
      contentValue:0,//新值
      // contentTime:new Date(),
      // isAdd:false,
    };
  },
  methods: {
    onClickRight(){
      // this.showPop=true;
      // this.isAdd=true;
      this.$router.push({name:'records'})
    },

    onSubmit() {
      updateData({
        value: this.contentValue,
        note: this.note,
        //没变
        id: this.contentItem.id,
        itemid: this.contentItem.itemid,
        datetime: this.contentItem.datetime,
        updatetime: dateFormat('YYYY-mm-dd HH:MM', new Date()),
        img: '',
      }).then((res) => {
        if (res.status == 200) {
          this.showPop = false;
          this.$notify({ type: 'success', message: '更新成功' });
          this.getDataList();
        } else {
          this.$notify({ type: 'danger', message: '更新失败' });
        }
      });
    },
    onClickUpdate(item) {
      this.showPop = true;
      this.contentValue = item.value;
      this.note = item.note;
      this.contentItem = item;
    },

    deleteData(id) {
      deleteData({ contentID: id }).then((res) => {
        if (res.status == 200) {
          this.$notify({
            type: 'success',
            message: '删除成功',
            duration: 1000,
          });
          this.getDataList();
        } else {
          this.$notify({ type: 'danger', message: '删除失败', duration: 1000 });
        }
      });
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    getDataList() {
      getDataList({ subitemid: this.subitemid }).then((res) => {
        this.datali = res;
      });
    },
  },
  created() {
    this.subitemid = this.$route.query.id;
    this.getDataList();
  },
};
</script>

<style>
</style>