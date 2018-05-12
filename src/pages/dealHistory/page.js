import DealHistoryTable from './components/DealHistoryTable'
import ListSearch from './components/ListSearch'
import { Row } from 'antd'
export default function showDealHistory() {
    return (
        <div>
            <Row style={{ margin: "10px 0px" }}>
                <ListSearch />
            </Row>
            <Row>
                <DealHistoryTable />
            </Row>
        </div>);
}