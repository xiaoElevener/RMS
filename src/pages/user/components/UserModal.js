import { Component } from 'react';
import { Modal, Form, Input } from 'antd';

const FormItem = Form.Item;

class UserModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  showModelHandler = (e) => {
    if (e) e.stopPropagation();
    this.setState({
      visible: true,
    });
  };

  hideModelHandler = () => {
    this.setState({
      visible: false,
    });
  };

  okHandler = () => {
    const { onOk, type } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (type === 'edit') {
          const { record: { lockVersion } } = this.props;
          values = { ...values, lockVersion };
        }
        onOk(values);
        this.hideModelHandler();
      }
    });
  };

  render() {
    const { children, type } = this.props;
    const { getFieldDecorator } = this.props.form;
    let loginNameInput = null;
    let userNameInput = null;
    let telephoneInput = null;
    if (type === 'edit') {
      const { loginName, userName, telephone, lockVersion } = this.props.record;
      loginNameInput = loginName;
      userNameInput = userName;
      telephoneInput = telephone;
    }

    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    return (
      <span>
        <span onClick={this.showModelHandler}>
          {children}
        </span>
        <Modal
          title="用户"
          visible={this.state.visible}
          onOk={this.okHandler}
          onCancel={this.hideModelHandler}
          okText="确认"
          cancelText="取消"
        >
          <Form horizontal="true" onSubmit={this.okHandler}>
            <FormItem
              {...formItemLayout}
              label="账号"
            >
              {
                getFieldDecorator('loginName', {
                  initialValue: loginNameInput,
                })(<Input />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="姓名"
            >
              {
                getFieldDecorator('userName', {
                  initialValue: userNameInput,
                })(<Input />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="手机号"
            >
              {
                getFieldDecorator('telephone', {
                  initialValue: telephoneInput,
                })(<Input />)
              }
            </FormItem>
            {type === 'create' && (
              <FormItem
                {...formItemLayout}
                label="密码"
              >
                {
                  getFieldDecorator('password', {
                  })(<Input />)
                }
              </FormItem>)}
          </Form>
        </Modal>
      </span>
    );
  }
}

export default Form.create()(UserModal);