 <template>
  <div class="container">
    <van-nav-bar title="每日记录" />
    {{ new Date() }}
    <van-form @submit="onSubmit">
      <van-cell-group
        v-for="(item, index) in items"
        :key="index"
        :title="item.main_item"
        :border="false"
      >
        <template #title>
          <van-cell :title="item.main_item" icon="shop-o" title-class="title_class"> </van-cell>
        </template>
        <div v-for="(subitem, index) in item.children" :key="index">
          <!-- {{ subitem.contents[0] }} -->
          <van-field
            v-if="subitem.unit != '' && subitem.recordtype == 1"
            v-model="subitem.contents[0].value"
            :label="subitem.sub_item + '(' + subitem.unit + ')'"
            input-align="right"
            label-class="left_field"
          >
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
            </template>
          </van-cell>
        </div>
      </van-cell-group>

      <van-button round block type="info" native-type="submit">提交</van-button>
    </van-form>
  </div>
</template>

<script>
import { saveData, getSubitems, getItemstree, saveDataList } from '@/axios/api';
import { dateFormat } from '@/assets/comm';

export default {
  data() {
    return {
      active: 1,
      showCheckbox: false,
      showSelect: true,
      showDate: false,
      value: 0,
      showItemPicker: false,
      items: [
        // { id: 5, text: '体重' },
        // { id: 2, text: '健身' },
        // { id: 3, text: '222' },
        // { id: 4, text: '22221' },
        // { id: 1, text: 'aaaa' },
      ],
      unit: '次',
      desc: '',

      time: new Date(),
      itemname: '',
      subitemid: 0,
      showtime: '',
    };
  },
  methods: {
    onSubmit() {
      //axios.post('saveData')
      const params = [];
      for (let i = 0; i < this.items.length; i++) {
        for (let subitem of this.items[i].children) {
          console.log(subitem.value);
          if (subitem.recordtype == 1) {
            console.log('新的 subitem.contents', subitem.contents);
            params.push(
              subitem.contents[0]
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
          this.$notify({ type: 'success', message: '创建成功' });
        } else {
          this.$notify({ type: 'danger', message: '创建失败' });
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
    getDayItemstree() {
      var endtime=new Date(new Date().setDate(new Date().getDate()+1));
      getItemstree({
        starttime: dateFormat('YYYY-mm-dd HH:MM', new Date()), 
        endtime: endtime,
      }).then((res) => {
        this.items = [];
        // if(this.items.length>0){
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
        // }
        console.log('this.items:', this.items);
      });
    },
  },
  created() {
    this.getDayItemstree();
  },
};
</script>

<style>
.left_field {
  /* background-color: blueviolet; */
  width: 70%;
}
.container {
  height: 1000px;
}
.title_class{
  /* background-color: blueviolet; */
  font-size: 20px;
  color: darkgrey;
}
</style>