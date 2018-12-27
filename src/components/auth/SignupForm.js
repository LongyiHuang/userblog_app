import React from 'react';
import { Form, Input,Button,Checkbox } from 'antd';
import PropTypes from 'prop-types';
const FormItem = Form.Item;

class SignupForm extends React.Component{
  state = {
    checkAgreement: false,
    confirmDirty:false
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.onSave(values);
      }
    });
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }


  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (this.state.confirmDirty && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }

  checkAgreement = (rule, value, callback) => {
    if (!value) {
      callback('Please read the agreement');
    } else {
      callback();
    }
  }

  handleAgreementChange = (e) => {
    this.setState({
      checkAgreement: e.target.checked,
    });
  }

  handleConfirmChange = (e) => {
    if(this.state.confirmDirty){
      this.setState({
        confirmDirty: false,
      });
    }
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: !!value },() => {
      this.props.form.validateFields(['confirm'], { force: true });
    });
  }




  render(){
    const { getFieldDecorator } = this.props.form
    const { loading } = this.props
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
        xs: { span: 24,offset:8},
        sm: { span: 10,offset:8},
        md: { span: 15,offset:8},
      },
    };


    return(
      <div>
        <h1 style={{ padding:'0.5em 11em' }} >Sign Up</h1>
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
            label="Email"
          >
            {getFieldDecorator('email', {
              rules: [
                {required: true, message: 'Please input email!'},
                {type: 'email', message: 'The input is not valid E-mail!'},
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

                {validator:this.validateToNextPassword}
              ],
            })(
              <Input type="password" />
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="Confirm Password"
          >
            {getFieldDecorator('confirm', {
              rules: [
                {required: true, message: 'Please confirm your password!'},
                {validator: this.compareToFirstPassword },
              ],
            })(
              <Input type="password" onBlur={this.handleConfirmBlur} onChange={this.handleConfirmChange}/>
            )}
          </FormItem>

          <FormItem {...submitFormLayout} >
            {getFieldDecorator('agreement', {
              rules:[
                {validator:this.checkAgreement}
              ],

            })(
              <Checkbox checked={this.state.checkAgreement} onChange={this.handleAgreementChange}>
                I have read the <a href="">agreement</a>
              </Checkbox>
            )}
          </FormItem>

          <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
            <Button type="primary" htmlType="submit" loading={loading} >Save</Button>
          </FormItem>

        </Form>

      </div>
    );
  }
}

SignupForm.propTypes = {
  loading: PropTypes.bool,
}

export default Form.create()(SignupForm);

