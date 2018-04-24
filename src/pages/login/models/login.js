import * as loginService from '../services/loginService';
import { duration } from 'moment';
import { dealObjectValue } from '../../../utils/index';
import router from 'umi/router';
export default {
    namespace: 'login',
    state: {
        loginName: null,
        userName: null,
        telephone: null,
        lastAttemptedLoginTime: null,
        roles: {}
    },

    reducers: {
        save(state, { payload: { data } }) {
            return { ...state, ...data };
        },

    },

    effects: {
        *login({ payload }, { call, put }) {
            const { vo } = yield call(loginService.login, payload);
            debugger;
            yield put({ type: 'save', payload: { data: vo } });
            router.push('/');
        },

    },


}