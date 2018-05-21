import {Layout as AntLayout} from 'antd'
import Header from './Header'
import Footer from './Footet'
import style from "./index.less"

const {Content} =AntLayout;

const Container =({children})=>{
        return(
        <AntLayout className={style.container}>
            <Header/>
            <Content className={style.content}>{children}</Content>
            <Footer/>
        </AntLayout>
    )
}

export default Container;