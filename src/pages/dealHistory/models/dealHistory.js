import * as dealHistoryService from '../services/dealHistoryService';
import { notification } from 'antd';
import { dealObjectValue } from '../../../utils/index';
export default {
    namespace: 'dealHistory',
    state: {
        data: [],
        total: null,
        pageSize: 10,
        pageNumber: 1,
        startDate: null,
        endDate: null,
        
    },

    reducers: {
        

        save(state, { payload: { data, total } }) {
            return { ...state, data, total };
        },

        changePage(state, { payload: { pageSize, pageNumber } }) {
            return { ...state, pageSize, pageNumber };
        },

        changePageSize(state, { payload: { pageSize } }) {
            return { ...state, pageSize, pageNumber: 1 };
        },

        
        saveData(state, { payload }) {
            return { ...state, ...payload };
        }
    },

    effects: {
        *fetch({ }, { call, put, select }) {
            const dealHistory = yield select(state => state.dealHistory);
            const { pageSize, pageNumber, startDate, endDate } = dealHistory;
            const query = { pageSize, pageNumber, startDate, endDate };
            const { voList, total } = yield call(dealHistoryService.queryAll, dealObjectValue(query));
            yield put({ type: 'save', payload: { data: voList, total } });
        },
        *exportExcel({ }, { select, call }) {
            const dealHistory = yield select(state => state.dealHistory);
            const { startDate, endDate } = dealHistory;
            //前端控制导出数量
            const query = { pageSize: 10000, pageNumber: 0, startDate, endDate };
            yield call(dealHistoryService.exportExcel, dealObjectValue(query));
        },

        
    },

    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                console.log('dealhistory pathname=' + pathname + '   ' + pathname === '/');
                if (pathname === '/dealHistory') {
                    dispatch({ type: 'fetch' });
                }
            });
        },
    },



}