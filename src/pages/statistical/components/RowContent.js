import { connect } from 'dva'
import { Row, Col, Card } from 'antd'
import SmallCardContent from '../../../components/SmallCardContent'


function rowContent({ countStatistical }) {

    return (
        <Row gutter={16}>
            <Col span={8}>
                <Card bordered={false}><SmallCardContent icon_name='wechat' color="#44b549" title="微信绑定用户" content={countStatistical.wechatUser} /></Card>
            </Col>
            <Col span={8}>
                <Card bordered={false}><SmallCardContent icon_name='bell' color="#D897EB" title="今日留言数" content={countStatistical.wechatMessage} /></Card>
            </Col>
            <Col span={8}>
                <Card bordered={false}><SmallCardContent icon_name='shopping-cart' color="#F69899" title="今日交易次数" content={countStatistical.dealCo} /></Card>
            </Col>
        </Row>
    );


}

function mapStateToProps(state) {
    console.log('RowContent state:' + JSON.stringify(state));
    const { countStatistical } = state.statistical;
    return {
        countStatistical
    };
}

export default connect(mapStateToProps)(rowContent);