import * as userService from '../../user/services/userService';
import * as consumeService from '../services/consumeService';
import { notification } from 'antd';
export default {
    namespace: 'consume',

    state: {
        loginNameList: [],
        filterList: [],
        statistical: []
    },

    reducers: {
        saveUserList(state, { payload: loginNameList }) {
            const filterList = loginNameList;
            return { ...state, loginNameList, filterList };
        },

        saveFilterList(state, { payload: filterList }) {
            return { ...state, filterList };
        },

        saveStatistical(state, { payload: statistical }) {
            return { ...state, statistical };
        }
    },

    effects: {
        *getLoginNameList({ }, { call, put }) {
            const { voList } = yield call(userService.getLoginNameList);
            yield put({ type: 'saveUserList', payload: voList });
        },

        *filterLoginNameList({ payload: search }, { put, select }) {
            const loginNameList = yield select(state => state.consume.loginNameList);
            const filterLoginNameList = loginNameList.filter(function (loginName) {
                return loginName.search(search) > -1;
            });
            yield put({ type: 'saveFilterList', payload: filterLoginNameList });
        },

        *create({ payload: parms }, { call }) {
            yield call(consumeService.create, parms);
            notification.success({
                message: '成功',
                description: '交易完成'
            });
        },

        *getStatistical({ }, { call, put }) {
            const { voList } = yield call(consumeService.getStatistical);
            yield put({ type: 'saveStatistical', payload: voList });
        }
    },

    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/consume') {
                    dispatch({ type: 'getLoginNameList' });
                } else if (pathname === '/'||pathname === '/index.html') {
                    dispatch({ type: 'getStatistical' });
                }

            });
        },
    },



}