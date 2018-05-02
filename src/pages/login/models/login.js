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
        roles: []
    },

    reducers: {
        save(state, { payload: { data } }) {
            return { ...state, ...data };
        },

    },

    effects: {
        *login({ payload }, { call, put }) {
            const { vo } = yield call(loginService.login, payload);
            yield put({ type: 'save', payload: { data: vo } });
            router.push('/');
        },

        *checkPath({ pathname }, { select }) {
            const login = yield select(state => state.login);
            const { paths } = login;
            if (!paths || !paths.find((value) => {
                return value === pathname
            })) {
                router.push("/login");
                notification.error({
                    message: `无此页面权限`,
                    description: '请更换账号',
                });
            }
        }
    },

    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname !== '/login') {
                    dispatch({ type: 'checkPath', pathname });
                }
            });
        },
    },
}