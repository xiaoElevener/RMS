import {Layout,Menu,Icon} from 'antd';
import style from './index.less';
const {Header:AntHeader} =Layout;
const {SubMenu,Item} = Menu;


const Header =()=>{
    return(
        <AntHeader className={style.header}>
            <Menu mode="horizontal"  className={style.popOverMenu}>
                <Item key="message" className={style.MenuItem}><Icon type="mail"/></Item>
                <SubMenu key="sub_menu" title={<Icon type="user"/>} className={style.MenuItem}>   
                    <Item key="user_info">个人信息</Item>
                    <Item key="sign_out">退出登录</Item>
                </SubMenu>
            </Menu>
        </AntHeader>
    );
}

export default Header;