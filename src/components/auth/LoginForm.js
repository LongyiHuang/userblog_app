import React from 'react';
import { Form, Input,Button,Row, Col } from 'antd';
import PropTypes from 'prop-types';
const FormItem = Form.Item;

class LoginPage extends React.Component{


  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.onLogin(values);
      }
    });
  }
  toggleVerify = (e) => {
    if(!this.props.verify_loading){
      this.props.onToggleVerify();
    }
  }




  render(){
    const { getFieldDecorator } = this.props.form
    const { login_loading,verify_img} = this.props
    const formItemLayout = {
      labelCol: {
        xs: { span: 8 },
        sm: { span: 8 },
        md: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 8 },
        sm: { span: 8 },
        md: { span: 8 },
      },
    };


    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 8,offset:8},
        sm: { span: 8,offset:8},
        md: { span: 8,offset:8},
      },
    };



    return(
      <div>
        <h1 style={{ padding:'0.5em 11em' }} >Login</h1>
        <Form onSubmit={this.handleSubmit}>
          <FormItem
            {...formItemLayout}
            label="Username"
          >
            {getFieldDecorator('username', {
              rules: [
                {required: true, message: 'Please input username!'},
              ],
            })(
              <Input />
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="Password"
          >
            {getFieldDecorator('password', {
              rules: [
                {required: true, message: 'Please input password!'},
              ],
            })(
              <Input type="password" />
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="Verification"
          >
            {getFieldDecorator('verify', {
              rules: [
                {required: true, message: 'Please input verification code!'},
              ],
            })(
              <div  style={{ margin:'0,auto',lineHeight:'45px',verticalAlign: 'middle'}} >
                <Row>
                  <Col span={12}>
                    {/*<iframe id='verify' src={/session/verify} alt="verify" width='170px' height='40px' />*/}
                    {/*<img  src={{verify_img}}>*/}
                    <div dangerouslySetInnerHTML={{__html:verify_img}} onClick={this.toggleVerify}/>
                  </Col>
                  <Col span={12}>
                    <Input placeholder='verification code'/>
                  </Col>
                </Row>
              </div>
            )}
          </FormItem>

          <FormItem {...submitFormLayout}>
            <Button type="primary" htmlType="submit" loading={login_loading} >Login</Button>
          </FormItem>

        </Form>


      </div>
    );
  }
}

LoginPage.propTypes = {
  loading: PropTypes.bool,
  onLogin: PropTypes.func,
  onToggleVerify: PropTypes.func,
}

export default Form.create()(LoginPage);

