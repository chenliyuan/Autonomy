 <template>
  <div>
    <van-nav-bar
      title="子项目列表"
      left-text="返回"
      left-arrow
      right-text="添加子项目"
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />

    <van-swipe-cell v-for="(item, index) in subitems" :key="index">
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

    <van-popup v-model="showAdd" :style="{ width: '80%', height: '70%' }">
      <van-nav-bar title="添加子项目" />
      <van-form @submit="onSubmit">
        <van-field
          v-model="sub_item"
          name="子项目名称"
          label="子项目名称"
          :rules="[{ required: true, message: '请填写子项目名称' }]"
        />
        <van-field v-model="unit" name="单位" label="单位" />
        <!-- <van-cell
          title="图表类型"
          is-link
          @click="showPicker = true"
          :value="chartType"
        /> -->

        <van-field name="radio" label="记录类型">
          <template #input>
            <van-radio-group v-model="recordtype">
              <van-radio name="1">每日记录</van-radio>
              <van-radio name="0">实时记录</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field
          readonly
          clickable
          label="图表类型"
          :value="chartType"
          placeholder="选择图表"
          @click="showPicker = true"
        />
        <van-popup v-model="showPicker" round position="bottom">
          <van-picker
            title="选择图表类型"
            show-toolbar
            :columns="charts"
            @confirm="onConfirmPicker"
            @cancel="onCancelPicker"
          />
        </van-popup>
        <!-- <van-cell title="选择图表类型">
        <van-dropdown-menu>
          <van-dropdown-item v-model="chartType" :options="charts" />
        </van-dropdown-menu>
        </van-cell> -->
        <!-- {{recordtype}} -->
        <van-field
          v-model="desc"
          autosize
          label="描述"
          type="textarea"
          placeholder="简单描述"
        />
        <van-field name="switch" label="是否有效">
          <template #input>
            <van-switch v-model="isvalid" size="20" />
          </template>
        </van-field>
        <!-- <van-checkbox v-model="isvalid">是否有效</van-checkbox> -->
        <van-button
          v-if="showSubmit"
          round
          block
          type="info"
          native-type="submit"
          >创建新的子项目</van-button
        >
      </van-form>
      <van-button v-if="showSubmit == false" round block @click="updateSubItem"
        >更子项目</van-button
      >
    </van-popup>
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

export default {
  data() {
    return {
      showSubmit: true,
      showPicker: false,
      charts: ['bar', 'line', 'none'],
      chartType: 'line',
      showAdd: false,
      itemid: 0,
      subitemid:0,
      sub_item: '',
      subitems: [],
      unit: '',
      desc: '',
      isvalid: true,
      recordtype: 1, //1是每日记录，0是实时记录
    };
  },
  methods: {
    onClickUpdate(subitem) {
      this.showAdd = true;
      this.showSubmit = false;
      this.subitemid=subitem.id;
      getSubItem({ subitemid: subitem.id }).then((res) => {
        this.sub_item = res.sub_item;
        this.unit = res.unit;
        this.desc = res.desc;
        this.chartType = res.chart_type;
        this.isvalid = res.isvalid;
        this.recordtype = res.recordtype.toString();
      });
    },
    updateSubItem() {
      updateSubItem({
        id:this.subitemid,
        main_itemid: Number(this.itemid),
        sub_item: this.sub_item,
        unit: this.unit,
        desc: this.desc,
        chart_type: this.chartType, //line/bar/''
        isvalid: true,
        recordtype: this.recordtype,
      }).then((res) => {
        if (res.status == 200) {
          this.showAdd=false;
          this.$notify({ type: 'success', message: '更新成功' });
          this.getSubItemstree();
        } else {
          this.$notify({ type: 'danger', message: '更新失败' });
        }
      });
    },
    deleteSubItem(id) {
      deleteSubItem({
        subitemid: id,
      }).then((res) => {
        console.log(res);
        if (res.status == 200) {
          this.$notify({ type: 'success', message: '删除成功' ,duration: 1000});
          this.getSubItemstree();
        } else {
          this.$notify({ type: 'danger', message: '删除失败',duration: 1000 });
        }
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
        this.subitems = res;
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