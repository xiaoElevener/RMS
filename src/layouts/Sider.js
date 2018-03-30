import React from 'react';
import Logo from './Logo';
import Menu from './Menu';
import style from './index.less';
import {Layout} from 'antd';
const {Sider:AntSider} =Layout;

export default class Sider extends React.Component{

    render(){
        return(
            <AntSider className={style.sider}>
                <Logo/>
                <Menu/>
            </AntSider>
        );
    }
}