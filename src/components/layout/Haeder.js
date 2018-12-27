import React from 'react';
import {Menu, Icon} from 'antd';
import {Link} from 'dva/router';
import {connect} from 'dva';

class Haeder extends React.Component {

  logoutHandler = () => {
    console.log('lougou')
    console.log(this.props)
    this.props.dispatch({type:'user/logout'});
  }

  render() {
    const {location, user} = this.props;
    return (
      <div>
        <Menu
          theme={"dark"}
          mode="horizontal"
          selectedKeys={[location.pathname]}
          style={{lineHeight: '64px'}}
        >
          <Menu.Item key="/">
            <Link to="/">
              <Icon type="home"/>
              Home
            </Link>
          </Menu.Item>
          <Menu.Item key="/article">
            <Link to="/article">
              <Icon type="book"/>
              Article
            </Link>
          </Menu.Item>
          <Menu.Item key="/todo">
            <Link to="/todo">
              <Icon type="form"/>
              Todo
            </Link>
          </Menu.Item>

          {!user &&
            <Menu.Item key="/signup" style={{float: "right", marginRight: '10px'}}>
              <Link to="/signup">
                <Icon type="user-add"/>
                Sign UP
              </Link>
            </Menu.Item>
          }


          {user ?
            (

              <Menu.Item key="/logout" style={{float: "right"}} onClick={this.logoutHandler}>
                <Icon type="logout"/>
                {user.username} Logout
              </Menu.Item>

            ) :
            (
              <Menu.Item key="/login" style={{float: "right"}}>
                <Link to="/login">
                  <Icon type="login"/>
                  Login
                </Link>
              </Menu.Item>
            )
          }

        </Menu>

      </div>

    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.user
  }
}


export default connect(mapStateToProps)(Haeder);
