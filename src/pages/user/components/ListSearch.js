import { Input, Row, Col, Button, Icon, InputNumber } from 'antd';
import React from 'react';
import { connect } from 'dva';
import UserModal from './UserModal';

const InputGroup = Input.Group;

class ListSearch extends React.Component {

    constructor(props) {
        super(props);
        ["changeQuery", "createHandler"].map(fn => {
            this[fn] = this[fn].bind(this);
        });
    }

    changeQuery() {
        const { dispatch } = this.props;
        let loginName = this.refs.loginName.input.value;
        let userName = this.refs.userName.input.value;
        let telephone = this.refs.telephone.inputNumberRef.input.value;
        if (!loginName)
            loginName = null;
        if (!userName)
            userName = null;
        if (!telephone)
            telephone = null;
        const query = { loginName, userName, telephone };
        dispatch({
            type: 'user/changeQuery',
            payload: {
                query
            }
        });

        dispatch({
            type: 'user/fetch'
        });
    }

    createHandler(id, values) {
        const { dispatch } = this.props;
        dispatch({
            type: 'user/create',
            payload: { values },
        });
    }


    render() {
        return (
            <Row>
                <InputGroup>
                    <Col span="6">
                        <Input id="loginName" placeholder="账号" ref="loginName" />
                    </Col>
                    <Col span="6">
                        <Input id="userName" placeholder="姓名" ref="userName" />
                    </Col>
                    <Col span="6">
                        <InputNumber id="telephone" placeholder="手机号" ref="telephone" />
                    </Col>
                    <Button type="primary" shape="circle-outline" onClick={this.changeQuery}>
                        <Icon type="search" />
                    </Button>

                    <UserModal type='create' onOk={this.createHandler.bind(null, null)}>
                        <Button type="primary">新建用户</Button>
                    </UserModal>

                </InputGroup>

            </Row>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps)(ListSearch);