import React from 'react';
import { Form, Input,Button } from 'antd';
import { withRouter } from 'dva/router';
import PropTypes from 'prop-types';

const FormItem = Form.Item;

class ArticleForm extends React.Component{


  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.onSave(values);
      }
    });
  }

  validateToDescription = (rule, value, callback) => {
    if (value && value.length > 100) {
      callback('The number of words described is limited to 100!');
    } else {
      callback();
    }
  }


  handleCancel = () => {
    const { history,dispatch } = this.props;
    this.props.form.resetFields();
    dispatch({
      type:'article/changeState',
      payload:{
        current:{}
      }
    });
    history.goBack();

  }




  render(){
        const { getFieldDecorator } = this.props.form
        const { loading,current } = this.props
        const formItemLayout = {
          labelCol: {
            xs: { span: 5 },
            sm: { span: 5 },
            md: { span: 5 },
          },
          wrapperCol: {
            xs: { span: 15 },
            sm: { span: 15 },
            md: { span: 15 },
          },
        };

        const submitFormLayout = {
          wrapperCol: {
            xs: { span: 24,offset:5},
            sm: { span: 10,offset:5},
            md: { span: 15,offset:5 },
          },
        };


        return(
          <div>
            <h1 style={{ padding:'0.5em 6em' }} >{!current.id ? 'Create Article' : 'Edit Article'}</h1>
            <Form onSubmit={this.handleSubmit}>
              <FormItem
                {...formItemLayout}
                label="Title"
              >
                {getFieldDecorator('title', {
                  rules: [
                    {required: true, message: 'Please input title!'},
                  ],
                  initialValue:current.title
                })(
                  <Input />
                )}
              </FormItem>

              <FormItem
                {...formItemLayout}
                label="Author"
              >
                {getFieldDecorator('author', {
                  rules: [
                    {required: true, message: 'Please input author!'},
                  ],
                  initialValue:current.author

                })(
                  <Input />
                )}
              </FormItem>

              <FormItem
                {...formItemLayout}
                label="Description"
              >
                {getFieldDecorator('description', {
                  rules: [
                    {required: true, message: 'Please input author!'},
                    {validator:this.validateToDescription}
                  ],
                  initialValue:current.description
                })(
                  <Input />
                )}
              </FormItem>

              <FormItem
                {...formItemLayout}
                label="Content"
              >
                {getFieldDecorator('content', {
                  rules: [
                    {required: true, message: 'Please input content!'},
                  ],
                  initialValue:current.content
                })(
                  <Input.TextArea style={{ minHeight: 150 }}/>
                )}
              </FormItem>

              <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
                <Button type="primary" htmlType="submit" loading={loading} >Save</Button>
                <Button style={{ marginLeft: 8 }} onClick={this.handleCancel}>Cancel</Button>
              </FormItem>

            </Form>

          </div>
        );
    }
}

ArticleForm.propTypes = {
  loading: PropTypes.bool,
  current: PropTypes.object,
}

export default Form.create()(withRouter(ArticleForm));

