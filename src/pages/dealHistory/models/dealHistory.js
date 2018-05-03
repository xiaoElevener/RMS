import * as dealHistoryService from '../services/dealHistoryService';
import { notification } from 'antd';
export default {
    namespace: 'dealHistory',
    state: {
        statistical: [],
        data: [],
        total: null,
        pageSize: 10,
        pageNumber: 1,
        countStatistical: {
            wechatUser: null,
            wechatMessage: null,
            dealCount: null
        }
    },

    reducers: {
        saveStatistical(state, { payload: statistical }) {
            return { ...state, statistical };
        },

        save(state, { payload: { data, total } }) {
            return { ...state, data, total };
        },

        changePage(state, { payload: { pageSize, pageNumber } }) {
            return { ...state, pageSize, pageNumber };
        },

        changePageSize(state, { payload: { pageSize } }) {
            return { ...state, pageSize, pageNumber: 1 };
        },

        saveCountStatistical(state, { payload: countStatistical }) {
            return { ...state, countStatistical };
        }
    },

    effects: {
        *fetch({ }, { call, put, select }) {
            const dealHistory = yield select(state => state.dealHistory);
            const pageSize = dealHistory.pageSize;
            const pageNumber = dealHistory.pageNumber;
            const { voList, total } = yield call(dealHistoryService.queryAll, { pageSize, pageNumber });
            yield put({ type: 'save', payload: { data: voList, total } });
        },

        *getStatistical({ }, { call, put }) {
            const { voList } = yield call(dealHistoryService.getStatistical);
            yield put({ type: 'saveStatistical', payload: voList });
        },

        *getCountStatistical({ }, { call, put }) {
            debugger;
            const { vo } = yield call(dealHistoryService.getCountStatistical);
            yield put({ type: 'saveCountStatistical', payload: vo });
        }
    },

    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/' || pathname === '/index.html' || pathname == 'dealHistory') {
                    dispatch({ type: 'getStatistical' });
                    dispatch({ type: 'getCountStatistical' });
                }
                if (pathname === '/dealHistory') {
                    dispatch({ type: 'fetch' });
                }
            });
        },
    },



}