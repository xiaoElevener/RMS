import * as predefinedCodeService from '../services/predefinedCodeService';
import { dealObjectValue } from '../../../utils/index';
import { notification } from 'antd';
export default {
    namespace: 'predefinedCode',
    state: {
        data: [],
        total: null,
        pageSize: 10,
        pageNumber: 1,
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


    },

    effects: {
        *fetch({ }, { call, put, select }) {
            const predefinedCode = yield select(state => state.predefinedCode);
            const pageSize = predefinedCode.pageSize;
            const pageNumber = predefinedCode.pageNumber;
            const { voList, total } = yield call(predefinedCodeService.queryAll, { pageSize, pageNumber });
            yield put({ type: 'save', payload: { data: voList, total } });
        },

        *remove({ payload: id }, { call, put }) {
            yield call(predefinedCodeService.remove, id);
            yield put({ type: 'fetch' });
        },

        *update({ payload: { id, values } }, { call, put }) {
            yield call(predefinedCodeService.update, id, values);
            notification.success({
                message: `更新成功`,
            });
            yield put({ type: 'fetch' });
        },

        *create({ payload: { values } }, { call, put }) {
            yield call(predefinedCodeService.create, values);
            notification.success({
                message: `创建成功`,
            });
            yield put({ type: 'fetch' });
        },


    },

    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                console.log("consume pathname=" + pathname);
                if (pathname === '/predefinedCode') {
                    dispatch({ type: 'fetch' });
                }
            });
        },
    },



}