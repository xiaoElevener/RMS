import {Layout as AntLayout} from 'antd';
import Header from './Header';
import style from "./index.less";

const {Content,Footer} =AntLayout;

const Container =({children})=>{
        return(
        <AntLayout className={style.container}>
            <Header/>
            <Content className={style.content}>{children}</Content>
            <Footer><span>Footer</span></Footer>
        </AntLayout>
    )
}

export default Container;