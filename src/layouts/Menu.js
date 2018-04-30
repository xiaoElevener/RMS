import NavLink from 'umi/navlink';
import { Menu as AntMenu, Icon } from 'antd';
import React from 'react';
import style from './index.less';
const SubMenu = AntMenu.SubMenu;
const MenuItem = AntMenu.Item;


export default class Menu extends React.Component {
    render() {
        return (
            <AntMenu className={style.menu} mode="inline">
                <MenuItem key="index">
                    <NavLink to="/">
                        <span><Icon type="dashboard" />首页</span>
                    </NavLink>
                </MenuItem>
                <SubMenu key="userOption" title={<span><Icon type="bars" /><span>基本功能</span></span>}>
                    <MenuItem key="user">
                        <NavLink to="user">
                            <Icon type="idcard" />
                            <span>用户列表</span>
                        </NavLink>
                    </MenuItem>
                </SubMenu>
                <MenuItem key="consume">
                    <NavLink to="consume">
                        <span><Icon type="pay-circle-o" />消费</span>
                    </NavLink>
                </MenuItem>
                <MenuItem key="predefinedCode">
                    <NavLink to="predefinedCode">
                        <span><Icon type="setting" />系统配置</span>
                    </NavLink>
                </MenuItem>
            </AntMenu>
        );
    }
}