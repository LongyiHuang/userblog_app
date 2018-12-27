import * as articleService from '../services/article';
import { routerRedux } from 'dva/router';
import moment from 'moment';
import configs from '../configs';


export default {

  namespace: 'article',

  state: {
    list:[],
    total:0,
    pageNumber:1,
    pageSize:configs.PAGE_SIZE,
    current:{},
  },

  subscriptions: {
    setup({ dispatch, history ,state}) {
      // console.log(state)
      // return history.listen(({ pathname, search }) => {
      //   if (pathname === '/article') {
      //     dispatch({type:'article/fetch',payload:{pageNumber:1, pageSize:state.pageSize }});
      //   }
      // });
    }
  },

  effects: {
    *fetch({payload:{pageNumber=1,pageSize=PAGE_SIZE}}, { call, put }) {  // eslint-disable-line
      const res = yield call(articleService.fetch,pageNumber,pageSize);
      if(res.success){
        var articles = res.data.articles;
        if(articles.length > 0){
          articles.forEach(article => {
            article.updated_at = moment(article.updated_at).format('YYYY-MM-DD HH:mm:ss');
            article.created_at = moment(article.created_at).format('YYYY-MM-DD HH:mm:ss');
          })
        }
        yield put({ type: 'save',payload: {
            list:articles,
            pageNumber: pageNumber,
            pageSize:pageSize,
            total:res.data.total,
          }});
      }
    },

    *fetchOne({payload : id}, { call, put }){
      const res =  yield call(articleService.fetchOne,id);
        if(res.success){
          yield put({ type: 'save',payload: {
              current:res.data,
            }});
        }
    },

    *patch({payload : {id,values}}, { call, put }){
      const res = yield call(articleService.update,id,values);
      if(res.success){
        yield put({ type: 'reload' });
        yield put(routerRedux.goBack());
      }
    },

    *create({payload}, { call, put }) {
      const res = yield call(articleService.create,payload);
        if(res.success){
          yield put({ type: 'reload' });
          yield put(routerRedux.push({
            pathname:'/article',
          }));

        }
    },

    *remove({payload : id}, { call, put }){
      const res = yield call(articleService.remove,id);
      if(res.success){
        yield put({ type: 'reload' });
      }
    },

    *reload(action,{ put, select }){
      const pageNumber = yield select(state => state.article.pageNumber);
      const pageSize = yield select(state => state.article.pageSize);
      yield put({ type: 'fetch', payload: { pageNumber:pageNumber,pageSize:pageSize } });
    }
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },

    changeState(state, {payload}) {
      return {...state, ...payload}
    }

  },

};
