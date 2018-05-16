import * as bindingService from '../services/bindingService';
export default {
    namespace: 'binding',

    state: {
        success: false,
        openId: null
    },

    reducers: {
        saveState(state, { payload: newState }) {
            return { ...state, ...newState };
        }
    },

    effects: {
        *bind({ payload }, { call, put, select }) {
            const state = yield select(state => state.binding);
            const { openId } = state;
            yield call(bindingService.bind, { ...payload, openId });
            yield put({ type: 'saveState', payload: { success: true } })
        },

        *getOpenId({ payload }, { call, put }) {
            debugger;
            const { vo } = yield call(bindingService.getOpenId, payload);
            yield put({
                type: 'saveState', payload: { openId: vo }
            });
        }
    },

    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/binding') {
                    const { code } = query;
                    debugger;
                    dispatch({
                        type: 'getOpenId',
                        payload: { code }
                    })
                }
            });
        },
    },
}