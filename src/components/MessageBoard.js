import { connect } from 'dva';
import { Table, Tag, Avatar } from 'antd';
import PropTypes from 'prop-types';
import styles from './MessageBoard.less';
import { formatDate } from '../utils/index';

function MessageBoard({ partData }) {
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
    return (
        <div className={styles.comments}>
            <Table pagination={false} showHeader={false} columns={columns} rowKey={(record, key) => key} dataSource={partData} />
        </div>
    );
}

function mapStateToProps(state) {
    const { data, partData } = state.messageBoard;
    return {
        data, partData
    };
}

export default connect(mapStateToProps)(MessageBoard);