import React from 'react';
import style from './index.less';
import logo from '../assets/logo.png';
const Logo= (props) =>{
    return (
        <div className={style.logo}>
            <img src={logo} alt="logo"/>
            <span>WMS</span>
        </div>
    );
}

export default Logo;