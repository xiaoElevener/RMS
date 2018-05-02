import React from 'react';
import DealShow from './consume/components/DealShow';
import { Row, Card, Col } from 'antd';
import SmallCardContent from '../components/SmallCardContent';
import MessageBoard from '../pages/messageBoard/components/MessageBoard'

function IndexPage() {
  return (
    <div>
      <Row gutter={16}>
        <Col span={8}>
          <Card bordered={false}><SmallCardContent icon_name='wechat' color="#44b549" title="微信绑定用户" content="55" /></Card>
        </Col>
        <Col span={8}>
          <Card bordered={false}><SmallCardContent icon_name='bell' color="#D897EB" title="今日留言数" content="42" /></Card>
        </Col>
        <Col span={8}>
          <Card bordered={false}><SmallCardContent icon_name='shopping-cart' color="#F69899" title="今日交易次数" content="600" /></Card>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Card bordered={false}><DealShow /></Card>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Card bordered={false}><MessageBoard type='card' /></Card>
        </Col>
        <Col span={12}>
          <Card bordered={false}>内容</Card>
        </Col>
      </Row>
    </div>
  );
}


export default IndexPage;
