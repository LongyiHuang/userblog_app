import axios from 'axios';
import {notification, message} from 'antd';
import {routerRedux} from 'dva/router';
import store from '../index';

// 设置全局参数，如响应超市时间，请求前缀等。
axios.defaults.timeout = 5000
axios.defaults.baseURL = '/api';
axios.defaults.withCredentials = true;


// 状态码错误信息
// const codeMessage = {
//   200: '服务器成功返回请求的数据。',
//   201: '新建或修改数据成功。',
//   202: '一个请求已经进入后台排队（异步任务）。',
//   204: '删除数据成功。',
//   400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
//   401: '用户没有权限（令牌、用户名、密码错误）。',
//   403: '用户得到授权，但是访问是被禁止的。',
//   404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
//   406: '请求的格式不可得。',
//   410: '请求的资源被永久删除，且不会再得到的。',
//   422: '当创建一个对象时，发生一个验证错误。',
//   500: '服务器发生错误，请检查服务器。',
//   502: '网关错误。',
//   503: '服务不可用，服务器暂时过载或维护。',
//   504: '网关超时。',
// };


// 添加一个返回拦截器
axios.interceptors.response.use((response) => {
  // 请求结束，蓝色过渡滚动条消失
  return response;
}, (error) => {
  // 请求结束，蓝色过渡滚动条消失
  // 即使出现异常，也要调用关闭方法，否则一直处于加载状态很奇怪
  return Promise.reject(error);
});


export default function request(opt) {
  return axios(opt)
    .then((response) => {
      // >>>>>>>>>>>>>> 请求成功 <<<<<<<<<<<<<<
      console.log(`【${opt.method} ${opt.url}】请求成功，响应数据：%o`, response);
      // 打印业务错误提示
      if (response.data && !response.data.success) {
        message.error(response.data.message);
      }
      return {...response.data};
    }).catch((error) => {
      // >>>>>>>>>>>>>> 请求失败 <<<<<<<<<<<<<<
      // 响应时状态码处理
      const status = error.response.status;
      const errortext = error.response.data.message || error.response.statusText;

      notification.error({
        message: `请求错误 ${status}`,
        description: errortext,
      });

      // 存在请求，但是服务器的返回一个状态码，它们都在2xx之外
      const {dispatch} = store;

      if(status === 666){
        dispatch(routerRedux.push('/login'));
      }


      // 开发时使用，上线时删除
      console.log(`【${opt.method} ${opt.url}】请求失败，响应数据：%o`, error.response);

      return {code: status, message: errortext};
    });
}


