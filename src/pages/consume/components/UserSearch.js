import { AutoComplete } from 'antd';
import React from 'react';
import { connect } from 'dva';


function UserSearch({ dispatch, dataSource, onUserChange, value, style }) {

    const handleSearch = (value) => {
        dispatch({
            type: 'consume/filterLoginNameList',
            payload: value
        });
    }


    return (<AutoComplete
        dataSource={dataSource}
        style={{ width: 200 }}
        onChange={onUserChange}
        onSearch={handleSearch.bind()}
        placeholder="请输入账号"
        value={value}
        allowClear={true}
        style={style}
    />);
}

function mapStateToProps(state) {
    return {
        dataSource: state.consume.filterList,
    };
}

export default connect(mapStateToProps)(UserSearch);
