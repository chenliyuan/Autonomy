 <template>
  <div>
    <van-nav-bar
      title="主项目列表"
      left-text="返回"
      right-text="添加项目"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <!-- {{ items }} -->

    <van-swipe-cell v-for="(item, index) in items" :key="index">
      <template #left>
        <van-button
          square
          type="primary"
          text="修改"
          @click="onClickUpdate(item)"
        />
      </template>
      <van-cell
        :title="item.main_item"
        :label="item.desc"
        is-link
        :value="item.prioty"
        @click="RouteTo(item.id)"
      >
      </van-cell>
      <template #right>
        <van-button
          square
          text="删除"
          type="danger"
          @click="deleteItem(item.id)"
        />
      </template>
    </van-swipe-cell>
    <van-popup v-model="showAdd" :style="{ width: '80%', height: '70%' }">
      <van-nav-bar title="添加主项目" />
      <van-form @submit="onSubmit">
        <van-field
          v-model="item_name"
          name="主项目名称"
          label="主项目名称"
          :rules="[{ required: true, message: '请填写主项目名称' }]"
        />
        <van-cell title="优先级"><van-stepper v-model="prioty" /></van-cell>
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
        <van-button
          v-if="isUpdate == false"
          round
          block
          type="info"
          native-type="submit"
          >提交</van-button
        >
      </van-form>
      <van-button v-if="isUpdate" round block type="info" @click="updateItem"
        >修改</van-button
      >
    </van-popup>
  </div>
</template>

<script>
import {
  getItem,
  getItems,
  deleteItem,
  updateItem,
  saveItem,
} from '@/axios/api';

export default {
  data() {
    return {
      itemid: 1,
      items: [],
      item_name: '',
      item_subname: '',
      unit: '',
      isvalid: true,
      prioty: 1,
      desc: '',
      showAdd: false,
      isUpdate: false,
    };
  },
  methods: {
    getItems() {
      getItems({}).then((res) => {
        this.items = res;
      });
    },
    onSubmit() {
      saveItem({
        userID: 1,
        main_item: this.item_name,
        prioty: this.prioty,
        isvalid: this.isvalid,
        desc: this.desc,
      }).then((res) => {
        if (res.status == 200) {
          this.$notify({ type: 'success', message: '创建成功' });
          this.showAdd = false;
          this.getItems();
        } else {
          this.$notify({ type: 'danger', message: '创建失败' });
        }
      });
    },
    getItem() {
      getItem({ itemid: this.itemid }).then((res) => {
        this.item_name = res.main_item;
        this.prioty = res.prioty;
        this.isvalid = res.isvalid;
        this.desc = res.desc;
      });
    },
    onClickUpdate(item) {
      console.log('item', item);
      this.itemid = item.id;
      this.isUpdate = true;
      this.showAdd = true;
      this.getItem();
    },
    updateItem() {
      var params = {
        id: this.itemid,
        userID: 1,
        main_item: this.item_name,
        prioty: this.prioty,
        isvalid: this.isvalid,
        desc: this.desc,
      };
      updateItem(params).then((res) => {
        if (res.status == 200) {
          this.$notify({ type: 'success', message: '更新成功' });
          this.isUpdate = false;
          this.showAdd = false;
          this.getItems();
        } else {
          this.$notify({ type: 'danger', message: '更新失败' });
        }
      });
    },
    deleteItem(id) {
      this.$dialog
        .confirm({ message: '确定删除吗', showCancelButton: true })
        .then(() => {
          this.isUpdate = false;
          deleteItem({ itemid: id }).then((res) => {
            console.log(res, res.status == 200);
            if (res.status == 200) {
              this.$notify({ type: 'success', message: '删除成功' });
              this.getItems();
            } else {
              this.$notify({ type: 'danger', message: '删除失败' });
            }
          });
        })
        .catch(() => {
          console.log('取消');
        });
    },
    RouteTo(itemid) {
      this.$router.push({
        path: '/subitemlist',
        query: {
          id: itemid,
        },
      });
    },
    onClickLeft() {
      // this.$router.push({ name: 'my' });
      this.$router.go(-1);
    },
    onClickRight() {
      // this.$router.push({ name: 'additem' });
      this.showAdd = true;
    },
    onClickDelete() {
      this.$notify('aaa');
    },
  },
  created() {
    this.getItems();
  },
};
</script>

<style>
</style>