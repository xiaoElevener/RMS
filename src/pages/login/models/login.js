import * as loginService from '../services/loginService';
import router from 'umi/router';
import { notification } from 'antd';
export default {
    namespace: 'login',
    state: {
        loginName: null,
        userName: null,
        telephone: null,
        lastAttemptedLoginTime: null,
        paths: [],
        roles: [],
    },

    reducers: {
        save(state, { payload: { data } }) {
            return { ...state, ...data };
        },
        clear(state) {

        }

    },

    effects: {
        *login({ payload }, { call, put }) {
            const { vo } = yield call(loginService.login, payload);
            yield put({ type: 'save', payload: { data: vo } });
            router.push('/');
        },

        *checkPath({ pathname }, { select }) {
            debugger;
            const login = yield select(state => state.login);
            const { paths } = login;
            if (!paths || !paths.find((value) => {
                return value === pathname
            })) {
                router.push("/login");
            }
        },

    },

    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname !== '/login') {
                    debugger;
                    dispatch({ type: 'checkPath', pathname });
                }
            });
        },
    },
}