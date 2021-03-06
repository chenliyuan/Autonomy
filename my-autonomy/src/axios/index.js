/****   http.js   ****/
// 导入封装好的axios实例
import request from './request'
import QS from 'qs';
const http ={
    /**
     * methods: 请求
     * @param url 请求地址 
     * @param params 请求参数
     */
    get(url,params){
        const config = {
            method: 'get',
            url:url,
            paramsSerializer: function(params) {
                return QS.stringify(params, {
                  arrayFormat: 'repeat',
                });
              },
        }
        if(params) config.params = params
        return request(config)
    },
    post(url,params){
        const config = {
            method: 'post',
            url:url
        }
        if(params) config.data = params
        return request(config)
    },
    path(url,params){
        const config = {
            method: 'patch',
            url:url
        }
        if(params) config.data = params
        return request(config)
    },
    put(url,params){
        const config = {
            method: 'put',
            url:url
        }
        if(params) config.data = params
        return request(config)
    },
    del(url,params){
        const config = {
            method: 'delete',
            url:url
        }
        if(params) config.params = params
        return request(config)
    }
}
// 导出
export default http
