import Axios from 'axios'
import QS from 'qs';
// if (process.env.NODE_ENV == 'development') {
//     Axios.defaults.baseURL = 'http://192.168.8.191:5000/';  
//   } else  {
//     // Axios.defaults.baseURL = 'https://adu.i.shopee.io/';
//   }


  // Axios.defaults.headers.post['Content-Type'] =
  // 'application/x-www-form-urlencoded';

    Axios.defaults.headers.post['Content-Type'] =
  'application/json';
Axios.interceptors.request.use(
  config => {
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

Axios.interceptors.response.use(
  response => {
    return response;
  },
  err => {
    console.log('err', err.response);
    return err.response;
  }
);

export default Axios;

  
  export function get(url, params) {
    return new Promise((resolve, reject) => {
      Axios.get(url, {
          params: params,
          paramsSerializer: function (params) {
            return QS.stringify(params, {
              arrayFormat: 'repeat'
            });
          },
        })
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
  /**
   * post方法，对应post请求
   * @param {String} url [请求的url地址]
   * @param {Object} params [请求时携带的参数]
   */
  // export function post(url, params, q) {
  //   return new Promise((resolve, reject) => {
  //     Axios.post(url, QS.stringify(params, {
  //         indices: false
  //       }), q)
  //       .then(res => {
  //         resolve(res.data);
  //       })
  //       .catch(err => {
  //         reject(err.data);
  //       });
  //   });
  // }

  export function post(url, params, q) {
    return new Promise((resolve, reject) => {
      Axios.post(url,params)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err.data);
        });
    });
  }

  export function put(url, params) {
    return new Promise((resolve, reject) => {
      Axios.put(url, QS.stringify(params, {
          indices: false
        }))
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err.data);
        });
    });
  }
  export function put_with_suffix(url, suffix, params) {
    return new Promise((resolve, reject) => {
      Axios.put(url + suffix + '/', QS.stringify(params, {
          indices: false
        }))
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err.data);
        });
    });
  }
  export function del(url, p) {
    return new Promise((resolve, reject) => {
      Axios.delete(url + '?'+QS.stringify(p,{indices:false}
        ))
        .then(res => {
          console.log('res', res);
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }