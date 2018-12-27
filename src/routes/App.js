import React from 'react';
import MainLayout from '../components/layout/MainLayout';
import { connect } from 'dva';
import { withRouter } from 'dva/router';
class App extends React.Component{
    render(){
      let { children, location } = this.props
        return(
          <MainLayout location={location}>
            {children}
          </MainLayout>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        app:state.app,
        loading:state.loading
    }
}


export default withRouter(connect(mapStateToProps)(App));
