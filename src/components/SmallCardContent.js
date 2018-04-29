import { Icon, Row, Col } from "antd";
import style from './components.less';

function SmallCardContent({ icon_name, color, title, content }) {

    return (<Row>
        <Col span={12}>
            <Icon type={icon_name} style={{ color: color }} className={style.icon} />
        </Col>
        <Col span={12}>
            <p className={style.title}>{title}</p>
            <span className={style.content}>{content}</span>
        </Col>
    </Row>);
}


export default SmallCardContent;