import { connect } from 'dva';
import { Table, Tag, Avatar } from 'antd';
import PropTypes from 'prop-types';
import styles from './MessageBoard.less';
import { formatDate } from '../../../utils/index';

function MessageBoard({ partData, loading, data, pageSize, pageNumber, type, total, dispatch }) {
    const columns = [
        {
            title: 'userName',
            dataIndex: 'userName',
            width: 48,
            className: styles.avatarcolumn,
            render: text => (
                <Avatar className={styles.avatar} size="large">
                    {text[0]}
                </Avatar>
            ),
        }, {
            title: 'content',
            dataIndex: 'content',
            render: (text, it) => {
                return (
                    <div>
                        <h5 className={styles.name}>{it.userName}</h5>
                        <p className={styles.content}>{it.content}</p>
                        <div className={styles.daterow}>
                            <span className={styles.date}>{it.createdTime}</span>
                        </div>
                    </div>
                )
            },
        },
    ];

    const pagination = {
        pageSize,
        current: pageNumber,
        showSizeChanger: true,
        total,
        onChange: function (pageNumber, pageSize) {
            dispatch({
                type: 'messageBoard/changePage',
                payload: {
                    pageSize,
                    pageNumber
                }
            });
            dispatch({
                type: 'messageBoard/fetch'
            });
        },

        onShowSizeChange: function (current, size) {
            dispatch({
                type: 'messageBoard/changePageSize',
                payload: {
                    pageSize: size,
                }
            });
            dispatch({
                type: 'messageBoard/fetch'
            });
        },
    };

    let content;
    if (type === 'card') {
        content = (<div className={styles.comments}>
            <Table pagination={false} showHeader={false} columns={columns} rowKey={(record, key) => key} dataSource={partData} loading={loading} />
        </div>);
    } else if (type === 'page') {
        content = (<div className={styles.comments}>
            <Table pagination={pagination} showHeader={false} columns={columns} rowKey={(record, key) => key} dataSource={data} loading={loading} />
        </div>);
    }
    return content;

}

function mapStateToProps(state) {
    console.log('messageBoard state:'+JSON.stringify(state));
    const { data, partData, total, pageNumber, pageSize } = state.messageBoard;
    return {
        data,
        partData,
        total,
        pageNumber,
        pageSize,
        loading: state.loading.models.messageBoard,
    };
}

export default connect(mapStateToProps)(MessageBoard);