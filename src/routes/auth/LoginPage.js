import React from 'react';
import LoginForm from '../../components/auth/LoginForm'
import {connect} from 'dva';
import PropTypes from 'prop-types';

class LoginPage extends React.Component {

  componentDidMount() {
    this.toggleVerifyHandler();
  }


  toggleVerifyHandler = () => {
    this.props.dispatch({
      type: 'session/verify'
    });
  }

  loginHandler = (values) => {
    this.props.dispatch({
      type: 'user/login',
      payload: values
    });
  }



  render() {
    const {verify_img, login_loading, verify_loading} = this.props;
    return (

      <LoginForm
        verify_img={verify_img}
        login_loadding={login_loading}
        verify_loadding={verify_loading}
        onToggleVerify={this.toggleVerifyHandler}
        onLogin={this.loginHandler}
      />
    );
  }
}

LoginPage.propTypes = {
  verify_img: PropTypes.string,
  login_loading: PropTypes.bool,
  verify_loading: PropTypes.bool
}

const mapStateToProps = (state) => {
  return {
    verify_img: state.session.verify_img,
    login_loading: state.loading.models.user,
    verify_loading: state.loading.models.session
  }
}


export default connect(mapStateToProps)(LoginPage);
