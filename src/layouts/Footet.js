import { Layout, Menu, Icon } from 'antd';
import style from './index.less';
const { Footer: AntFooter } = Layout;



const Footer = () => {
    return (
        <AntFooter className={style.footer}>
            <span> WMS 员工餐费管理系统</span>
        </AntFooter>
    );
}

export default Footer;