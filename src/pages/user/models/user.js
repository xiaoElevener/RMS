import * as userService from '../services/userService';
import { dealObjectValue } from '../../../utils/index';
import { notification } from 'antd';
export default {
    namespace: 'user',
    state: {
        data: [],
        total: null,
        pageSize: 10,
        pageNumber: 1,
        query: {
            loginName: null,
            userName: null,
            telephone: null
        },

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

        changeQuery(state, { payload: { query } }) {
            return { ...state, query, pageNumber: 1 };
        },



    },

    effects: {
        *fetch({ }, { call, put, select }) {
            const user = yield select(state => state.user);
            const pageSize = user.pageSize;
            const pageNumber = user.pageNumber;
            const query = dealObjectValue(user.query);
            const { voList, total } = yield call(userService.queryAll, { pageSize, pageNumber, ...query });
            yield put({ type: 'save', payload: { data: voList, total } });
        },

        *remove({ payload: id }, { call, put }) {
            yield call(userService.remove, id);
            yield put({ type: 'fetch' });
        },

        *update({ payload: { id, values } }, { call, put }) {
            yield call(userService.update, id, values);
            notification.success({
                message: `更新成功`,
            });
            yield put({ type: 'fetch' });
        },

        *create({ payload: { values } }, { call, put }) {
            yield call(userService.create, values);
            notification.success({
                message: `创建成功`,
            });
            yield put({ type: 'fetch' });
        },


    },

    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                console.log('user pathname=' + pathname);
                if (pathname === '/user') {
                    dispatch({ type: 'fetch' });
                }
            });
        },
    },



}