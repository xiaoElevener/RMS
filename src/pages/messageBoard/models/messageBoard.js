import * as messageBoardService from '../services/messageBoardService';
import { dealObjectValue } from '../../../utils/index';
export default {
    namespace: 'messageBoard',
    state: {
        data: [],
        partData: [],
        total: null,
        pageSize: 10,
        pageNumber: 1,

    },

    reducers: {
        save(state, { payload: { data, total } }) {
            return { ...state, data, total };
        },

        savePartData(state, { payload: partData }) {
            return { ...state, partData };
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
            const messageBoard = yield select(state => state.messageBoard);
            const pageSize = messageBoard.pageSize;
            const pageNumber = messageBoard.pageNumber;
            const partData = messageBoard.partData;
            const { voList, total } = yield call(messageBoardService.queryAll, { pageSize, pageNumber });
            if (partData.length === 0) {
                yield put({ type: 'savePartData', payload: voList.filter((item, key) => key < 4) })
            }
            yield put({ type: 'save', payload: { data: voList, total } });
        },


    },

    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                console.log('messageBoard pathname');
                if (pathname === '/messageBoard' || pathname === '/statistical') {
                    dispatch({ type: 'fetch' });
                }
            });
        },
    },



}