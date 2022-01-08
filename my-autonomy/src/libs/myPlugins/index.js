const myPlugin={};
myPlugin.install=function(Vue,options){
    //1. 全局方法 使用：在main.js文件里引入，并使用 Vue.use()方法使用。Vue.myGlobalMethod();
    Vue.myGlobalMethod=function(){
        console.log("插件自定义的全局方法myGlobalMethod")
    }
    // 2. 自定义组件里面定义的全局自定义指令     <van-dropdown-item v-my-directive />
    Vue.directive('my-directive', {  
        bind() {    
            console.log('自定义组件里面的自定义指令绑定成功啦~~~');  
        }});

    //3. 自定义实例方法 this.$myMethod()
    Vue.prototype.$myMethod = function(){  console.log("自定义组件里面定义的实例方法");}
    //4. 混入：全局注入到每个组件的 created 生命周期中 
    Vue.mixin({    
        created() {    
            console.log("created in plugin")  
            },
        })
}
export default myPlugin;