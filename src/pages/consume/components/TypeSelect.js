import { Select } from 'antd';
import React from 'react';
const Option = Select.Option;


function TypeSelect({ onTypeChange, value, style }) {

    return (
        <Select onChange={onTypeChange} value={value} style={style}>
            <Option key="RECHARGE">充值</Option>
            <Option key="CONSUME">消费</Option>
        </Select >
    );

}
export default TypeSelect;
