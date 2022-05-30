 <template>
  <div id="container">
    <van-nav-bar
      title="我的"
      right-text="添加内容"
      left-text="管理内容"
      @click-right="onClickRight"
      @click-left="onClickLeft"
    />
    <van-row type="flex">
      <van-col span="6">
        <van-image
          round
          width="100"
          height="100"
          src="http://n.sinaimg.cn/sinacn10112/514/w578h736/20191216/a601-ikvenft0998807.jpg"
        />
      </van-col>
      <van-col span="18" style="padding-top: 20px"
        ><div id="motto_class">{{ motto }}</div>
      </van-col>
    </van-row>
    <!-- <van-button type="primary" @click="test">test</van-button> -->
    <van-cell-group
      :title="'待做 (' + planList.length + ')'"
      v-if="planList.length > 0"
    >
      <van-cell
        v-for="(motto, index) in planList"
        :key="index"
        :title="index + 1 + ') ' + motto.content"
        :value="motto.diffDay"
        value-class="value_class"
      >
        <template #extra>
          <span>D</span>
        </template>
      </van-cell>
    </van-cell-group>
    <van-cell-group title="我的记录" v-if="recordList.length > 0">
      <van-cell
        v-for="(motto, index) in recordList"
        :key="index"
        :title="'* ' + motto.content"
      />
    </van-cell-group>
  </div>
</template>

<script>
import { getMottoList } from '@/axios/api';

export default {
  data() {
    return {
      mottoList: [],
      motto: '',
      planList: [],
      recordList: [],
      userId: 1,
    };
  },
  methods: {
    test(){
      console.log(this.$data,this.$options.data())
    },
    onClickLeft() {
      this.$router.push({ name: 'MottoList' });
    },
    onClickRight() {
      this.$router.push({ name: 'addmotto' });
    },
    getMottoList() {
      var userid = localStorage.getItem('userid');

      getMottoList({
        userID: userid,
      }).then((res) => {
        // this.mottoList = res;
        var theMotto = res.filter((item) => {
          return item.type == 1;
        });
        console.log('theMotto:', theMotto);
        this.recordList = res.filter((item) => {
          return item.type == 2;
        });
        this.planList = res.filter((item) => {
          return item.type == 3;
        });
        for (let i = 0; i < this.planList.length; i++) {
          let createTime = new Date(this.planList[i]['createtime']).getTime();
          let currentTime = new Date().getTime();
          let diffTime = parseInt(
            (currentTime - createTime) / (1000 * 3600 * 24)
          );
          console.log(diffTime);
          this.planList[i]['diffDay'] = diffTime;
        }
        this.motto = theMotto.length > 0 ? theMotto.slice(0, 1)[0].content : ''; //获取签名的第一项即优先级最高的项
      });
    },
    turnPersonal() {
      localStorage.setItem('userid', 1);
      this.userId = localStorage.getItem('userid');
      this.getMottoList();
    },
    turnComm() {
      localStorage.setItem('userid', 2);
      this.userId = localStorage.getItem('userid');
      this.getMottoList();
    },
  },
  created() {
    this.getMottoList();
    this.userId = localStorage.getItem('userid');
  },
};
</script>

<style scoped>
div {
  white-space: normal;
  word-break: break-all;
  word-wrap: break-word;
}

#container {
  /* overflow: auto;
  height: 700px; */
  margin-bottom: 60px;
}
#motto_class {
  padding: 10px 20px;
  color: red;
  height: 100px;
  /* font-weight: 800; */
  overflow: scroll;
}
.value_class {
  color: blue;
  font-weight: 600;
}
.van-cell-group__title {
  background-color: burlywood;
  color: aliceblue;
  font-weight: 700;
  font-size: 16px;
}
.account {
  position: absolute;
  top: 186px;
  right: 0px;
}
</style>