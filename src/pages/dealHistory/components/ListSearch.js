import { DatePicker, Row, Button, Icon, Col } from 'antd';
import { connect } from 'dva';
const { RangePicker } = DatePicker;


function ListSearch({ dispatch }) {
    const onChange = (date, dateString) => {
        dispatch({
            type: 'dealHistory/saveData',
            payload: {
                startDate: dateString[0],
                endDate: dateString[1]
            }
        });
    }

    const exportExcel = () => {
        dispatch({
            type: 'dealHistory/exportExcel'
        });
    }

    const search = () => {
        dispatch({
            type: 'dealHistory/changePageNumber',
            payload: {
                pageNumber: 1
            }
        });
        dispatch({
            type: 'dealHistory/fetch'
        });
    }
    return (
        <Row>
            <Col span='12' >
                <RangePicker onChange={onChange} />
            </Col>
            <Col span='12' >
                <Button type="primary" shape="circle-outline" onClick={search} style={{ marginLeft: 50 }}>
                    <Icon type="search" />
                </Button>
                <Button type="primary" shape="circle-outline" onClick={exportExcel} style={{ marginLeft: 50 }}>
                    <Icon type="download" />
                </Button>
            </Col>
        </Row>
    );
}


export default connect(() => ({}))(ListSearch);