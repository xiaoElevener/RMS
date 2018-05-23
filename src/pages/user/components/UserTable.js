import { Table, Input, Popconfirm, Pagination, Icon } from 'antd';
import React from 'react';
import { connect } from 'dva';
import UserModal from './UserModal';
import { StateType } from 'rmc-tabs/lib/DefaultTabBar';

function UserTable({ dispatch, data: dataSource, total, pageSize, pageNumber, loading }) {
  const columns = [{
    title: '账号',
    dataIndex: 'loginName',
    key: 'loginName',
    width: '20%',
  }, {
    title: '姓名',
    dataIndex: 'userName',
    key: 'userName',
    width: '20%',
    render: (text, record) => {
      const roles = record.roles;
      if (roles.find(role => (role.roleCode === 'admin'))) {
        return text + '👷';
      } else {
        return text;
      }
    }
  }, {
    title: '手机号',
    dataIndex: 'telephone',
    key: 'telephone',
    width: '30%',
  }, {
    title: '余额',
    dataIndex: 'balance',
    key: 'balance',
    width: '20%',
  }, {
    title: '操作',
    key: 'operation',
    render: (text, record) => (
      <span style={{ fontSize: 20 }}>
        <UserModal record={record} onOk={editHandler.bind(null, record.id)} type='edit'>
          <a style={{ margin: "0px 20px" }} ><Icon type="form" /></a>
        </UserModal>
        <Popconfirm title="确认要删除?" onConfirm={deleteHandler.bind(null, record.id)} cancelText="取消" okText="确认">
          <a><Icon type="user-delete" /></a>
        </Popconfirm>
      </span>
    )
  }];

  function deleteHandler(id) {
    dispatch({
      type: 'user/remove',
      payload: id
    })
  }

  function editHandler(id, values) {
    dispatch({
      type: 'user/update',
      payload: { id, values },
    });
  }

  const pagination = {
    pageSize,
    current: pageNumber,
    showSizeChanger: true,
    total,
    onChange: function (pageNumber, pageSize) {
      dispatch({
        type: 'user/changePage',
        payload: {
          pageSize,
          pageNumber
        }
      });
      dispatch({
        type: 'user/fetch'
      });
    },

    onShowSizeChange: function (current, size) {
      dispatch({
        type: 'user/changePageSize',
        payload: {
          pageSize: size,
        }
      });
      dispatch({
        type: 'user/fetch'
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
  const { data, total, pageSize, pageNumber } = state.user;
  console.log('userTable  ' + JSON.stringify(state));
  return {
    data,
    total,
    pageSize,
    pageNumber,
    loading: state.loading.models.user,
  };
}

export default connect(mapStateToProps)(UserTable);