 <template>
  <div>
    <van-nav-bar
      title="历史数据"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-swipe-cell v-for="(item, index) in datali" :key="index">
      <van-cell :title="item.value" :value="item.datetime" :label="item.desc" />

      <template #right>
        <van-button
          square
          text="删除"
          type="danger"
          @click="deleteData(item.id)"
        />
      </template>
    </van-swipe-cell>
  </div>
</template>

<script>
import { getDataList, deleteData } from '@/axios/api';

export default {
  data() {
    return {
      subitemid: 0,
      datali: [
        {
          value: 65,
          datetime: '2021-9-11 14:30',
          updatetime: '2021-9-11 14:32',
          desc: '晚上体重且已进食',
          img: '',
        },
        {
          value: 95,
          datetime: '2021-9-11 14:30',
          updatetime: '2021-9-11 14:32',
          desc: '晚上体重且已进食',
          img: '',
        },
      ],
    };
  },
  methods: {
    deleteData(id) {
      deleteData({ contentID: id }).then((res) => {
        if (res.status == 200) {
          this.$notify({ type: 'success', message: '删除成功' ,duration: 1000});
          this.getDataList();
        } else {
          this.$notify({ type: 'danger', message: '删除失败' ,duration: 1000});
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