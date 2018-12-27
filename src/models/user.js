import * as userService from "../services/user";
import * as sessionService from '../services/session';
import { routerRedux } from 'dva/router';
import { message } from 'antd';
import BaizeCode from '../utils/encrypt/baize_coder';
import configs from "../configs";


export default {

  namespace: 'user',

  state: {
    user:null
  },

  subscriptions: {
    setup({dispatch, history}) {  // eslint-disable-line
      // history.listen(({ pathname }) => {
      //   if (pathname === '/') {
      //    console.log('出发')
      //   }
      // });
    },
  },

  effects: {
    *signup({payload:user}, {call, put}) {  // eslint-disable-line
      const {username,password,email} = user;
      //加密
      const encryptData = BaizeCode.baizeEncrypt(password,configs.PUBLIC_KEY);
      console.log("encryptData:" + encryptData);
      user = {
        username:username,
        password:encryptData,
        email:email
      }
      const res = yield call(userService.signup, user);
      if (res.success) {
        yield put(routerRedux.push({
          pathname: '/login',
        }));
        message.success(res.message);
      }
    },

    *login({payload:user},{call,put}){
      const {username,password,verify} = user;
      //获取加密公钥
      const publicKeyRes = yield call(sessionService.publicKey);
      if(publicKeyRes.success){
        const { publicKey,token } = publicKeyRes.data;
        localStorage.setItem("authToken",token);
        // 加密
        const encryptData = BaizeCode.baizeEncrypt(password,publicKey);
        user = {
          username:username,
          password:encryptData,
          verify:verify
        }
        const verifyToken = localStorage.getItem("verifyToken");
        const loginRes = yield call(userService.login,user,verifyToken,token);
        console.log(loginRes);
        if(loginRes.success){
          yield put({ type: 'save',payload: {user:loginRes.data}});
          yield put(routerRedux.push({
            pathname: '/',
          }));
          message.success(loginRes.message);
        }else if(loginRes.message === '验证码已过期'){
           yield put({type:'session/verify'});
        }
      }
    },

    *logout(_,{call,put}){
      const token = localStorage.getItem("authToken");
      const res = yield call(userService.logout,token);
      if(res.success){
        yield put({ type: 'save',payload: {user:null}});
        localStorage.removeItem("authToken");
      }
    }
  },

  reducers: {
    save(state, action) {
      return {...state, ...action.payload};
    },
  },

}
