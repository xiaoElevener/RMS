import React from 'react';
import { Row, Button, message } from 'antd';
import { connect } from 'dva';
import UserSearch from './components/UserSearch';
import TypeSelect from './components/TypeSelect';
import InputMoney from './components/InputMoney';

class Consume extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dealType: "CONSUME",
            loginName: null,
            money: null
        };
    }

    changeDealType = (value) => {
        this.setState({
            dealType: value
        })
    }

    changeLoginName = (value) => {
        this.setState({
            loginName: value
        })
    }

    changeMoney = (value) => {
        this.setState({
            money: value
        })
    }

    submitDeal = () => {
        const { dealType, loginName, money } = this.state;
        const { dispatch } = this.props;
        if (!(dealType && loginName && money)) {
            message.error('请检查未填输入框！');
            return;
        }
        dispatch({
            type: 'consume/create',
            payload: {
                dealType,
                loginName,
                money
            }
        });

        this.setState({
            dealType: "CONSUME",
            loginName: null,
            money: null
        });


    }

    render() {
        const {
            dealType,
            loginName,
            money
        } = this.state;
        return (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <UserSearch onUserChange={this.changeLoginName} value={loginName} style={{ width: 200, margin: "30px 0px" }} />
                <TypeSelect style={{ width: 240 }} onTypeChange={this.changeDealType} value={dealType} style={{ width: 200, margin: "30px 0px" }} />
                <InputMoney onMoneyChange={this.changeMoney} value={money} style={{ width: 200, margin: "30px 0px" }} />
                <Button type="primary" onClick={this.submitDeal} style={{ width: 200, margin: "30px 0px" }}>提交</Button>
            </div>);
    }
}

export default connect()(Consume);



