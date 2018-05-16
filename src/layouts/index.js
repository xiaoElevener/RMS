import React from 'react';
import Sider from './Sider';
import Container from './Container';
import { Layout as AntLayout } from 'antd';
import style from './index.less';

const Layout = (props) => {
    console.log('layout' + JSON.stringify(props.location) );
    const notLayout = ['/login', '/404', '/binding'];
    if (notLayout.find((value) => value === props.location.pathname)) {
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