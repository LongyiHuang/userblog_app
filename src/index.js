import dva from 'dva';
import './index.css';
import { createBrowserHistory as createHistory } from 'history';
import createLoading from 'dva-loading';
// import { createLogger } from 'redux-logger';



// 1. Initialize
const app = dva({
  history: createHistory(),
  // onAction:createLogger(),
});

// 2. Plugins
app.use(createLoading());

// 3. Model
// app.model(require('./models/example').default);
require('./models').default.forEach(key => app.model(key.default));

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');


//为已有登录权限的用户回复权限
const token = localStorage.getItem("authToken");
if(token){
  app._store.dispatch({type:'session/auth',payload:token});

}

export default app._store;


