 <template>
  <div>
    <van-nav-bar
      :title="titleName"
      left-text="返回"
      left-arrow
      right-text="添加"
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />

    <van-swipe-cell v-for="(item, index) in dataList" :key="index">
      <template #left>
        <van-button
          square
          type="primary"
          text="修改"
          @click="onClickUpdate(item)"
        />
      </template>
      <van-cell
        :title="item.sub_item"
        :label="item.desc"
        :value="item.contents.length"
        is-link
        @click="RouteTo(item.id)"
      />

      <template #right>
        <van-button
          square
          text="删除"
          type="danger"
          @click="deleteSubItem(item.id)"
        />
      </template>
    </van-swipe-cell>

    <sub-item :showAdd="showAdd"></sub-item>
  </div>
</template>

<script>
import {
  saveSubItem,
  getSubItemstree,
  deleteSubItem,
  getSubItem,
  updateSubItem,
} from '@/axios/api';
import SubItem from '@/components/my/SubItem.vue';
export default {
  // props: {
  //   titleName: {
  //     type: String,
  //     required: true,
  //   },

  // },
  components: {
    SubItem,
  },
  data() {
    return {
      showSubmit: true,
      showPicker: false,
      charts: ['bar', 'line', 'none'],
      chartType: 'line',
      // showAdd: false,
      itemid: 0,
      subitemid: 0,
      sub_item: '',
      dataList: [],
      unit: '',
      desc: '',
      isvalid: true,
      recordtype: 1, //1是每日记录，0是实时记录
    };
  },
  methods: {
    onClickUpdate(subitem) {
      this.showAdd = true;
      // this.showSubmit = false;
      // this.subitemid = subitem.id;
      // getSubItem({ subitemid: subitem.id }).then((res) => {
      //   this.sub_item = res.sub_item;
      //   this.unit = res.unit;
      //   this.desc = res.desc;
      //   this.chartType = res.chart_type;
      //   this.isvalid = res.isvalid;
      //   this.recordtype = res.recordtype.toString();
      // });
    },
    updateSubItem() {
      updateSubItem({
        id: this.subitemid,
        main_itemid: Number(this.itemid),
        sub_item: this.sub_item,
        unit: this.unit,
        desc: this.desc,
        chart_type: this.chartType, //line/bar/''
        isvalid: this.isvalid,
        recordtype: this.recordtype,
      }).then((res) => {
        if (res.status == 200) {
          this.showAdd = false;
          this.$toast({ type: 'success', message: '更新成功' });
          this.getSubItemstree();
        } else {
          this.$toast({ type: 'danger', message: '更新失败' });
        }
      });
    },
    deleteSubItem(id) {
      this.$dialog
        .confirm({ message: '确定删除吗', showCancelButton: true })
        .then(() => {
          deleteSubItem({
            subitemid: id,
          }).then((res) => {
            console.log(res);
            if (res.status == 200) {
              this.$notify({
                type: 'success',
                message: '删除成功',
                duration: 1000,
              });
              this.getSubItemstree();
            } else {
              this.$notify({
                type: 'danger',
                message: '删除失败',
                duration: 1000,
              });
            }
          });
        });
    },

    onClickLeft() {
      this.$router.push({ name: 'itemlist' });
    },
    onClickRight() {
      this.showAdd = true;
    },
    RouteTo(id) {
      this.$router.push({ path: '/datalist', query: { id: id } });
    },
    onConfirmPicker(value) {
      console.log(value);
      this.chartType = value;
      this.showPicker = false;
    },
    onCancelPicker() {
      this.showPicker = false;
    },
    onSubmit() {
      console.log('onsubmit');
      saveSubItem({
        main_itemid: Number(this.itemid),
        sub_item: this.sub_item,
        unit: this.unit,
        desc: this.desc,
        chart_type: this.chartType, //line/bar/''
        isvalid: true,
        recordtype: this.recordtype,
      }).then((res) => {
        if (res.status == 200) {
          this.$notify({ type: 'success', message: '创建成功' });
          this.showAdd = false;
          this.getSubItemstree();
        } else {
          this.$notify({ type: 'danger', message: '创建失败' });
        }
      });
    },
    getSubItemstree() {
      getSubItemstree({ itemid: this.itemid }).then((res) => {
        this.dataList = res;
      });
    },
  },
  created() {
    this.itemid = this.$route.query.id;
    this.getSubItemstree(this.itemid);
  },
};
</script>

<style>
</style>