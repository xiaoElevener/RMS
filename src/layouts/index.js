import React from 'react';
import Sider from './Sider';
import Container from './Container';
import {Layout as AntLayout} from 'antd';
import style from './index.less';

const Layout =({children})=>{
    return(
        <AntLayout className={style.index}>
            <Sider/>
            <Container children={children}/>
        </AntLayout>
        
    );
}

export default Layout;