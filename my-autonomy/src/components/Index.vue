 <template>
  <div class="nav-container">

    <router-view> </router-view>
    <van-tabbar v-model="active"  id="bar_class">
      <van-tabbar-item icon="home-o" name="overview" to="/overview"
        >概览</van-tabbar-item
      >

      <van-tabbar-item icon="records" name="dailyrecord" to="/dailyrecord"
        >每日记录</van-tabbar-item
      >
      <!-- <van-tabbar-item icon="underway-o" name="records" to="/records"
        >实时记录</van-tabbar-item
      > -->

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
      active: 'my',
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
.nav-container{
  height: 100%;
}
</style>