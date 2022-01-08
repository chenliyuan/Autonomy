<template>
  <div>
    <van-nav-bar title="登录" />

    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    onSubmit() {
      if (this.username == '陈立元' && this.password == '123456') {
        localStorage.setItem('token', 'sdfghdswewxcd');
        localStorage.setItem('userid', 1);
        this.$router.push({ name: 'overview' });
      } else if (this.username == 'user' && this.password == '123456') {
        localStorage.setItem('userid', 2);
        this.$router.push({ name: 'overview' });
        // this.$store.commit('changeUser', { userId: 2 });
      } else {
        alert('用户名或密码错误');
      }
    },
  },
};
</script>

<style>
</style>