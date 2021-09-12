 <template>
  <div>
    <van-nav-bar title="趋势变化" />
    <van-row type="flex">
      <van-col>
        <!-- classify{{ items }} -->
        <van-sidebar v-model="activeName" @change="onChange">
          <!-- <van-sidebar-item title="总览"></van-sidebar-item> -->
          <van-sidebar-item
            v-for="(item, index) in items"
            :key="index"
            :name="item.main_item"
            :title="item.main_item"
          />
        </van-sidebar>
      </van-col>
      <van-col>
        <ChartView ref="chart_view"></ChartView>
      </van-col>
    </van-row>
  </div>
</template>

<script>
import { getItems ,getSubitems,getSubItemstree} from '@/axios/api';
import ChartView from './ChartView.vue';
export default {
  components: {
    ChartView,
  },

  data() {
    return {
      subItem: [],
      activeName: '',
      items: [
        {
          id: 2,
          name: '阅读',
        },
      ],
    };
  },
  methods: {
    onChange(index) {
      console.log(index)
      // this.subItem = this.items[index].children;
      getSubItemstree({ itemid: this.items[index].id }).then((res) => {
        this.$refs.chart_view.subItem = res.filter((item)=>{
          return   item.chart_type!="none"
        });
      });
    },
    //  getItems() {

    //   },
  },
  created() {
    console.log('classfy created');
    // this.getItems();
  },
  mounted() {
    // this.items = this.$route.params.items;
    getItems({}).then((res) => {
      this.items = res;
      // this.$refs.chart_view.subItem = this.items[0].children;
    });
  },
};
</script>

<style>
</style>