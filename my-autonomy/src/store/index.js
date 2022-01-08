import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        // 定义一个name，以供全局使用
        name: '张三',
        // 定义一个number，以供全局使用
        number: 0,
        // 定义一个list，以供全局使用
        mottoMap:{
            0:"全部",
              1: '签名',
              2: '记录',
              3: '待做',
              4: '复盘',
              5: '每日必做事项',
              6: '好句',
            },
            // userxId:1
    },
    //方便统一处理修改state状态数据,注意必须为方法，调用的时候不加括号
    getters:{

        getMottoMap(state){
            return  state.mottoMap;
        },
        
    },
    mutations:{
        // changeUser(state,payload){
        //     state.userId=payload.userId;
        // }
    }
});

export default store;

