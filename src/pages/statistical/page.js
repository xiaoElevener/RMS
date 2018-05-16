import React from 'react'
import DealShow from '../consume/components/DealShow'
import { Row, Card, Col } from 'antd'
import MessageBoard from '../messageBoard/components/MessageBoard'
import Weather from './components/Weather'
import RowContent from './components/RowContent'

function page() {
  return (
    <div>
      <RowContent />
      <Row gutter={16}>
        <Col span={24}>
          <Card bordered={false}><DealShow /></Card>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          {/* <Card bordered={false}><MessageBoard type='card' /></Card> */}
        </Col>
        <Col span={12}>
          <Card bordered={false} style={{ backgroundColor: '#8fc9fb' }}><Weather /></Card>
        </Col>
      </Row>
    </div>
  );
}

export default page;
