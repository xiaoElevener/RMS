import * as userService from '../services/userService';

export default {
    namespace: 'user',
    state: {
        data: [],
        total: null,
        pageSize: 10,
        pageNumber: 1
    },

    reducers: {
        save(state, { payload: { data, total } }) {
            debugger;
            return { ...state, data, total };
        },

        changePage(state, { payload: { pageSize, pageNumber } }) {
            debugger;
            return { ...state, pageSize, pageNumber };
        },

        changePageSize(state, { payload: { pageSize } }) {
            debugger;
            return { ...state, pageSize, pageNumber: 1 };
        }
    },

    effects: {
        *fetch({ }, { call, put, select }) {
            const user = yield select(state => state.user);
            const pageSize = user.pageSize;
            const pageNumber = user.pageNumber;
            const { voList, total } = yield call(userService.queryAll, { pageSize, pageNumber });
            yield put({ type: 'save', payload: { data: voList, total } });
        },



    },

    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                console.log('pathname=' + pathname);

                if (pathname === '/user') {
                    dispatch({ type: 'fetch' });
                }
            });
        },
    },



}