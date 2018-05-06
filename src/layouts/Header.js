import { Layout, Menu, Icon } from 'antd';
import style from './index.less';
import NavLink from 'umi/navlink';

const { Header: AntHeader } = Layout;
const { SubMenu, Item } = Menu;



const Header = () => {
    return (
        <AntHeader className={style.header}>
            <Menu mode="horizontal" className={style.popOverMenu}>
                <Item key="message" className={style.MenuItem}>
                    <NavLink to='/messageBoard'>
                        <Icon type="mail" />
                    </NavLink>
                </Item>
                <SubMenu key="sub_menu" title={<Icon type="user" />} className={style.MenuItem}>
                    <Item key="user_info">个人信息</Item>
                    <Item key="sign_out"><NavLink to='/login'>退出登录</NavLink></Item>
                </SubMenu>
            </Menu>
        </AntHeader>
    );
}

export default Header;