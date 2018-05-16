import * as userService from '../../user/services/userService';
import * as consumeService from '../services/consumeService';
import { notification } from 'antd';
export default {
    namespace: 'consume',

    state: {
        loginNameList: [],
        filterList: [],
    },

    reducers: {
        saveUserList(state, { payload: loginNameList }) {
            const filterList = loginNameList;
            return { ...state, loginNameList, filterList };
        },

        saveFilterList(state, { payload: filterList }) {
            return { ...state, filterList };
        },

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
            const { vo } = yield call(consumeService.create, parms);
            notification.success({
                message: '交易成功',
                description: '余额：' + vo.balance + '   透支次数：' + vo.overdraft
            });
        },

    },

    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                console.log('consume pathname');
                if (pathname === '/consume') {
                    dispatch({ type: 'getLoginNameList' });
                }
            });
        },
    },



}