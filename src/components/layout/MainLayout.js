import React from 'react';
import Header from './Haeder';
import { Layout } from 'antd';
const { Content } = Layout;
class MainLayout extends React.Component{
    render(){
      const {children,location} = this.props;
      return(
        <Layout className="layout">
          <Header location={location}/>
          <Content style={{ padding: '20px 20px' }}>
            <div style={{ background: '#fff', padding:'24px' , minHeight:'480px' }}>
              {children}
            </div>
          </Content>
        </Layout>
        );
    }
}

export default MainLayout;
