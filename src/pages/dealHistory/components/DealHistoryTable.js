import { Table, Input, Popconfirm, Pagination, Icon, Tag } from 'antd';
import React from 'react';
import { connect } from 'dva';


const status = {
    RECHARGE: {
        color: '#8fc9fb',
        text: '充值',
    },
    CONSUME: {
        color: '#f69899',
        text: '消费',
    },
}

function DealHistoryTable({ dispatch, data: dataSource, total, pageSize, pageNumber, loading }) {
    const columns = [{
        title: '姓名',
        dataIndex: 'userName',
        key: 'userName',
        width: '25%',
    }, {
        title: '账号',
        dataIndex: 'loginName',
        key: 'loginName',
        width: '25%',
    }, {
        title: '类型',
        dataIndex: 'dealType',
        key: 'dealType',
        width: '10%',
        render: text => <Tag color={status[text].color}>{status[text].text}</Tag>,
    }, {
        title: '金额',
        key: 'money',
        dataIndex: 'money',
        width: '25%',
        render: (text, record) => <span style={{ color: status[record.dealType].color }}>￥{text}</span>,
    }, {
        title: '时间',
        key: 'createdTime',
        dataIndex: 'createdTime',
        width: '25%',
    }];

    const pagination = {
        pageSize,
        current: pageNumber,
        showSizeChanger: true,
        total,
        onChange: function (pageNumber, pageSize) {
            dispatch({
                type: 'dealHistory/changePage',
                payload: {
                    pageSize,
                    pageNumber
                }
            });
            dispatch({
                type: 'dealHistory/fetch'
            });
        },

        onShowSizeChange: function (current, size) {
            dispatch({
                type: 'dealHistory/changePageSize',
                payload: {
                    pageSize: size,
                }
            });
            dispatch({
                type: 'dealHistory/fetch'
            });
        },
    };

    return (
        <div style={{ backgroundColor: "white" }}>
            <Table
                bordered
                dataSource={dataSource}
                columns={columns}
                rowKey='id'
                pagination={pagination}
                loading={loading}
            />

        </div>);
}

function mapStateToProps(state) {
    console.log('dealHistory state:' + JSON.stringify(state));
    const { data, total, pageSize, pageNumber } = state.dealHistory;
    return {
        data,
        total,
        pageSize,
        pageNumber,
        loading: state.loading.models.dealHistory,
    };
}

export default connect(mapStateToProps)(DealHistoryTable);