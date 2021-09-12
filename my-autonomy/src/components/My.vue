 <template>
  <div>
    <van-nav-bar title="我的" />
    <van-row type="flex">
      <van-col span="6">
        <van-image
          round
          width="100"
          height="100"
          src="https://img01.yzcdn.cn/vant/cat.jpeg"
        />
      </van-col>
      <van-col span="18"
        ><div>
          aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaab
        </div>

        <!-- <van-cell title="aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaab"/> -->
        <!-- <van-cell title="bbb"/> -->
      </van-col>
    </van-row>

    <van-cell-group title="设置">
      <!-- <van-cell title="添加项目" is-link to="/additem" /> -->
      <van-cell title="项目管理" is-link to="/itemlist" />
      <van-cell title="签名管理" is-link to="" />
    </van-cell-group>
  </div>
</template>

<script>
export default {};
</script>

<style>
div {
  white-space: normal;
  word-break: break-all;
  word-wrap: break-word;
}
</style>