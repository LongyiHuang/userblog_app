import React from 'react';
import SignUpForm from "../../components/auth/SignupForm";
import PropTypes from 'prop-types';
import { connect } from 'dva';
class SignupPage extends React.Component{

    signupHandler = (values) => {
      console.log(values);
      this.props.dispatch({
        type:'user/signup',
        payload: values

      })
    }

    render(){
      const { loading } = this.props
        return(
            <SignUpForm loading={loading} onSave={this.signupHandler}/>
        );
    }
}

SignupPage.propTypes = {
  loading: PropTypes.bool,
}

const mapStateToProps = (state) => {
    return {
        loading:state.loading.models.user
    }
}


export default connect(mapStateToProps)(SignupPage);
