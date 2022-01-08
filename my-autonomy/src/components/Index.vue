 <template>
  <div>

    <router-view> </router-view>
    <van-tabbar v-model="active"  id="bar_class">
      <van-tabbar-item icon="home-o" name="overview" to="/overview"
        >概览</van-tabbar-item
      >

      <van-tabbar-item icon="records" name="dailyrecord" to="/dailyrecord"
        >每日记录</van-tabbar-item
      >
      <van-tabbar-item icon="underway-o" name="records" to="/records"
        >实时记录</van-tabbar-item
      >
      <!-- <van-tabbar-item icon="chart-trending-o" name="classify"
        >分析</van-tabbar-item
      > -->
      <!-- <van-tabbar-item icon="friends-o" name="calendar">日历</van-tabbar-item> -->
      <van-tabbar-item icon="wap-home-o" name="my" to="/my"
        >我的</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script>
import { getItems } from '@/axios/api';
export default {
  data() {
    return {
      active: 'records',
    };
  },
  methods: {

  },
  created(){
    // console.log(this.$route);
    this.active=this.$route.name;
  }
};
</script>

<style scoped>

</style>