import { InputNumber } from 'antd';
import React from 'react';


function InputMoney(props) {
    return (
        <InputNumber
            formatter={value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={value => value.replace(/\￥\s?|(,*)/g, '')}
            onChange={props.onMoneyChange}
            value={props.value}
        />
    );

}
export default InputMoney;
