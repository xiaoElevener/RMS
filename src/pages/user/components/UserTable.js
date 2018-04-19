import { Table, Input, Popconfirm, Pagination } from 'antd';
import React from 'react';
import { connect } from 'dva';

function UserTable({ dispatch, data: dataSource, total, pageSize, pageNumber }) {
  const columns = [{
    title: '账号',
    dataIndex: 'loginName',
    width: '25%',
  }, {
    title: '姓名',
    dataIndex: 'userName',
    width: '15%',
  }, {
    title: '手机号',
    dataIndex: 'telephone',
    width: '20%',
  }];

  const pagination = {
    pageSize,
    current: pageNumber,
    showSizeChanger: true,
    total,
    onChange: function (pageNumber, pageSize) {
      console.log("pageNumber=" + pageNumber + "   pageSize=" + pageSize);
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
      console.log("current=" + current + "   size=" + size);
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
  debugger;
  console.log('pagination=' + JSON.stringify(pagination));
  return (
    <div>
      <Table
        bordered
        dataSource={dataSource}
        columns={columns}
        rowKey='id'
        pagination={pagination}
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
    loading: state.loading.models.users,
  };
}

export default connect(mapStateToProps)(UserTable);