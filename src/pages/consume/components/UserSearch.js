import { AutoComplete } from 'antd';
import React from 'react';
import { connect } from 'dva';


function UserSearch({ dispatch, dataSource, onUserChange,value}) {

    const handleSearch = (value) => {
        dispatch({
            type: 'consume/filterLoginNameList',
            payload: value
        });
    }


    return (<AutoComplete
        dataSource={dataSource}
        style={{ width: 200 }}
        onSelect={onUserChange}
        onSearch={handleSearch.bind()}
        placeholder="请输入账号"
        value={value}
    />);
}

function mapStateToProps(state) {
    return {
        dataSource: state.consume.filterList,
    };
}

export default connect(mapStateToProps)(UserSearch);
