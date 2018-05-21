import React from 'react';
import { List, InputItem, Button } from 'antd-mobile'
import { connect } from 'dva'

class BindingInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loginName: null,
            password: null
        };
        ["binding", "setLoginName", "setPassword"].map(fn => {
            this[fn] = this[fn].bind(this);
        });
    }

    binding() {
        const { loginName, password } = this.state;
        const { dispatch } = this.props;
        dispatch({
            type: 'binding/bind',
            payload: {
                loginName,
                password
            }
        })
    }

    setLoginName(val) {
        this.setState({
            loginName: val
        })
    }

    setPassword(val) {
        this.setState({
            password: val
        })
    }

    render() {

        return (
            <List renderHeader={() => '验证账号'}>
                {/* <span>openId:{this.props.openId}</span> */}
                <InputItem
                    placeholder="请输入账号"
                    onChange={this.setLoginName}
                >
                    账号：
            </InputItem>
                <InputItem
                    placeholder="请输入密码"
                    type='password'
                    onChange={this.setPassword}
                >密码：
            </InputItem>
                <Button onClick={this.binding}>
                    绑定
            </Button>
            </List>)
    }
}

function mapStateToProps(state) {
    const { openId } = state.binding;
    return { openId };
}


export default connect(mapStateToProps)(BindingInput);