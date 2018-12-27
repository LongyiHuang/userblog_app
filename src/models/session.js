import * as sessionService from "../services/session";
import configs from '../configs';

export default {

  namespace: 'session',

  state: {
    verify_img:"",
  },

  subscriptions: {
    setup({dispatch, history}) {  // eslint-disable-line
    },
  },

  effects: {
    * verify(_, {call, put}) {  // eslint-disable-line
      const res = yield call(sessionService.verify, configs.verifyCode);
      if(res.success){
        const { img,token } = res.data;
        localStorage.setItem("verifyToken",token);
        yield put({ type: 'save',payload: {
            verify_img:img,
          }});
      }
    },

    * auth({payload},{call,put}){
      const res = yield call(sessionService.auth, payload);
      if(res.success){
        yield put({type: 'user/save',payload: {user:res.data}});

      }
    }
  },

  reducers: {
    save(state, action) {
      return {...state, ...action.payload};
    },
  },

}
