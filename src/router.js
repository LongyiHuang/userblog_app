import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import App from './routes/App';
import dynamic from 'dva/dynamic' // 路由按需加载
import ArticleDetailPage from './routes/article/ArticleDetailPage';
// import ArticlePage from './routes/article/ArticlePage';
// import IndexPage from './routes/IndexPage';
// import TodoPage from './routes/todo/TodoPage';
// import LoginPage from './routes/auth/LoginPage';
// import SignUpPage from './routes/auth/SignupPage';

function RouterConfig({ history,app }) {
  const IndexPage = dynamic({
    app,
    component: () => import('./routes/IndexPage')
  });
  const ArticlePage = dynamic({
    app,
    component: () => import('./routes/article/ArticlePage')
  });

  // const ArticleDetailPage = dynamic({
  //   app,
  //   component:() => import('./routes/article/ArticleDetailPage')
  // });

  const TodoPage = dynamic({
    app,
    component:() => import('./routes/todo/TodoPage')
  });

  const LoginPage = dynamic({
    app,
    component:() => import('./routes/auth/LoginPage')
  });

  const SignUpPage = dynamic({
    app,
    component:() => import('./routes/auth/SignupPage')
  });

  return (
    <Router history={history}>
      <App>
        <Switch>
          <Route path="/" exact component={IndexPage} />
          <Route path="/article" exact component={ArticlePage} />
          <Route path="/article/new"  component={ArticleDetailPage} />
          <Route path="/article/:id"  component={ArticleDetailPage} />
          <Route path="/todo" exact component={TodoPage} />
          <Route path="/signup" exact component={SignUpPage} />
          <Route path="/login" exact component={LoginPage} />
        </Switch>
      </App>
    </Router>
  );
}

export default RouterConfig;
