import { Table, Input, Popconfirm, Pagination } from 'antd';
import React from 'react';
import { connect } from 'dva';
import UserModal from './UserModal';

function UserTable({ dispatch, data: dataSource, total, pageSize, pageNumber, loading }) {
  const columns = [{
    title: '账号',
    dataIndex: 'loginName',
    key: 'loginName',
    width: '25%',
  }, {
    title: '姓名',
    dataIndex: 'userName',
    key: 'userName',
    width: '15%',
  }, {
    title: '手机号',
    dataIndex: 'telephone',
    key: 'telephone',
    width: '20%',
  }, {
    title: '操作',
    key: 'operation',
    render: (text, record) => (
      <span>
        <UserModal record={record} onOk={editHandler.bind(null, record.id)} type='edit'>
          <a>编辑</a>
        </UserModal>
        <Popconfirm title="Confirm to delete?" onConfirm={deleteHandler.bind(null, record.id)}>
          <a>删除</a>
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
    <div>
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
  return {
    data,
    total,
    pageSize,
    pageNumber,
    loading: state.loading.models.user,
  };
}

export default connect(mapStateToProps)(UserTable);