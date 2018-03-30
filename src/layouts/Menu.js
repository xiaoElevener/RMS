import NavLink from 'umi/navlink';
import { Menu as AntMenu, Icon } from 'antd';
import React from 'react';
import style from './index.less';
const SubMenu = AntMenu.SubMenu;
const MenuItem=AntMenu.Item;


export default class Menu extends React.Component{
    render(){
        return (
            <AntMenu className={style.menu} mode="inline">
            <SubMenu key="userOption" title={<span><Icon type="mail" /><span>基本功能</span></span>}>
                <MenuItem key="user">
                <NavLink to="user">
                <Icon type="pie-chart" />
                <span>用户</span>
                </NavLink>
                </MenuItem>
            </SubMenu>
                <MenuItem key="consume">
                    <NavLink to="consume">
                    <span><Icon type="pay-circle-o" />消费</span>
                    </NavLink>
                </MenuItem>
            </AntMenu>
        );
    }    
}