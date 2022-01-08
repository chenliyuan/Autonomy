 <template>
  <div>
    <van-nav-bar title="添加记录" left-text="返回" @click-left="onClickLeft" />

    <van-form @submit="onSubmit">
      <van-radio-group v-model="checkedtype" direction="horizontal" >
        <van-radio  :name="key" :key="index" v-for="(value,key,index) in mottoMap">{{value}}</van-radio>
      </van-radio-group>
      <van-cell title="优先级"><van-stepper v-model="prioty" /></van-cell>
      <van-field
        v-model="content"
        type="textarea"
        rows="35"
        name="内容"
        label="内容"
        placeholder="内容"
        :rules="[{ required: true, message: '请填写内容' }]"
      />

      <div>
        <van-button round block type="info" native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { saveMotto } from '@/axios/api';
import { dateFormat } from '@/assets/comm';

export default {
  data() {
    return {
      content: '',
      checkedtype: '3',
      prioty: 1,
      mottoMap:null
    };
  },
  methods: {
    onSubmit() {
      saveMotto({
        userid: 1,
        content: this.content,
        createtime: dateFormat('YYYY-mm-dd HH:MM', new Date()),
        prioty: this.prioty,
        type: Number(this.checkedtype),
      }).then((res) => {
        if (res.status == 200) {
          this.$toast({ type: 'success', message: '创建成功' });
          this.$router.go(-1);
        } else {
          this.$toast({ type: 'danger', message: '创建失败' });
        }
      });
    },
    onClickLeft() {
      this.$router.go(-1);
    },

  },
  created(){
        this.mottoMap = this.$store.getters.getMottoMap;

  }
};
</script>

<style scoped>
.van-button {
  position: fixed;
  bottom: 60px;
}
</style>