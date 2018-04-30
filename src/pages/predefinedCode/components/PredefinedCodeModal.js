import { Component } from 'react';
import { Modal, Form, Input } from 'antd';

const FormItem = Form.Item;

class PredefinedCodeModal extends Component {

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
    let codeInput = null;
    let valueInput = null;
    let descriptionInput = null;
    if (type === 'edit') {
      const { code, value, description } = this.props.record;
      codeInput = code;
      valueInput = value;
      descriptionInput = description;
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
          title="预定义"
          visible={this.state.visible}
          onOk={this.okHandler}
          onCancel={this.hideModelHandler}
          okText="确认"
          cancelText="取消"
        >
          <Form horizontal="true" onSubmit={this.okHandler}>
            <FormItem
              {...formItemLayout}
              label="编码"
            >
              {
                getFieldDecorator('code', {
                  initialValue: codeInput,
                })(<Input disabled={true} />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="值"
            >
              {
                getFieldDecorator('value', {
                  initialValue: valueInput,
                })(<Input />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="描述"
            >
              {
                getFieldDecorator('description', {
                  initialValue: descriptionInput,
                })(<Input />)
              }
            </FormItem>
          </Form>
        </Modal>
      </span>
    );
  }
}

export default Form.create()(PredefinedCodeModal);