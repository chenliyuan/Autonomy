 <template>
     <van-popup v-model="showAdd" :style="{ width: '80%', height: '70%' }">
      <van-nav-bar title="添加/修改子项目" />
      <van-form @submit="onSubmit">
        <van-field
          v-model="sub_item"
          name="子项目名称"
          label="子项目名称"
          :rules="[{ required: true, message: '请填写子项目名称' }]"
        />
        <van-field
          v-model="unit"
          name="单位"
          label="单位"
          placeholder="空单位默认表示Bool类型"
        />

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
      <van-button
        type="primary"
        v-if="showSubmit == false"
        round
        block
        @click="updateSubItem"
        >更新子项目
      </van-button>
    </van-popup>
</template>

<script>
export default {
props:{
        showAdd:{
      type:Boolean,
      required:false,
      default:false
    }
}
}
</script>

<style>

</style>