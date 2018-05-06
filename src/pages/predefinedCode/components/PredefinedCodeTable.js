import { Table, Input, Popconfirm, Pagination, Icon } from 'antd';
import React from 'react';
import { connect } from 'dva';
import PredefinedCodeModal from './PredefinedCodeModal';

function PredefinedCodeTable({ dispatch, data: dataSource, total, pageSize, pageNumber, loading }) {
  const columns = [{
    title: '描述',
    dataIndex: 'description',
    key: 'description',
    width: '50%',
  }, {
    title: '值',
    dataIndex: 'value',
    key: 'value',
    width: '30%',
  }, {
    title: '操作',
    key: 'operation',
    render: (text, record) => (
      <span style={{ fontSize: 20 }}>
        <PredefinedCodeModal record={record} onOk={editHandler.bind(null, record.id)} type='edit'>
          <a style={{ margin: "0px 20px" }} ><Icon type="form" /></a>
        </PredefinedCodeModal>
      </span>
    )
  }];

  function deleteHandler(id) {
    dispatch({
      type: 'predefinedCode/remove',
      payload: id
    })
  }

  function editHandler(id, values) {
    dispatch({
      type: 'predefinedCode/update',
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
        type: 'predefinedCode/changePage',
        payload: {
          pageSize,
          pageNumber
        }
      });
      dispatch({
        type: 'predefinedCode/fetch'
      });
    },

    onShowSizeChange: function (current, size) {
      dispatch({
        type: 'predefinedCode/changePageSize',
        payload: {
          pageSize: size,
        }
      });
      dispatch({
        type: 'predefinedCode/fetch'
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
  const { data, total, pageSize, pageNumber } = state.predefinedCode;
  return {
    data,
    total,
    pageSize,
    pageNumber,
    loading: state.loading.models.predefinedCode,
  };
}

export default connect(mapStateToProps)(PredefinedCodeTable);