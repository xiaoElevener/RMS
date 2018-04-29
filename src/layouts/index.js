import React from 'react';
import Sider from './Sider';
import Container from './Container';
import { Layout as AntLayout } from 'antd';
import style from './index.less';

const Layout = (props) => {
    console.log(props.location);
    if (props.location.pathname === '/login' || props.location.pathname === '/404') {
        return (
            <div>{props.children}</div>
        );
    }

    return (
        <AntLayout className={style.index}>
            <Sider />
            <Container children={props.children} />
        </AntLayout>

    );
}

export default Layout;