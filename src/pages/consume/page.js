import React from 'react';
import { Row, Button } from 'antd';
import { connect } from 'dva';
import UserSearch from './components/UserSearch';
import TypeSelect from './components/TypeSelect';
import InputMoney from './components/InputMoney';

class Consume extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dealType: null,
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

        dispatch({
            type: 'consume/create',
            payload: {
                dealType,
                loginName,
                money
            }
        });

        this.setState({
            dealType: null,
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
        debugger;
        return (
            <Row>
                <UserSearch onUserChange={this.changeLoginName} value={loginName} />
                <TypeSelect style={{ width: 240 }} onTypeChange={this.changeDealType} value={dealType} />
                <InputMoney onMoneyChange={this.changeMoney} value={money} />
                <Button type="primary" onClick={this.submitDeal} >提交</Button>
            </Row>);
    }
}

export default connect()(Consume);



