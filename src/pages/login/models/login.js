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
        weather: {
            city: null,
            text: null,
            temperature: null,
            code: 99
        }

    },

    reducers: {
        save(state, { payload: { data } }) {
            return { ...state, ...data };
        },

        saveWeather(state, { weather }) {
            return { ...state, weather }
        },

        clear(state, {}) {
            return {
                ...state,
                loginName: null,
                userName: null,
                telephone: null,
                lastAttemptedLoginTime: null,
                paths: [],
                roles: [],
            }
        }

    },

    effects: {
        *login({ payload }, { call, put }) {
            const { vo } = yield call(loginService.login, payload);
            yield put({ type: 'save', payload: { data: vo } });
            router.push('/statistical');
        },

        *logout({}, { call, put }) {
            yield call(loginService.logout);
            yield put({ type: 'clear'});
        },

        *checkPath({ pathname }, { select }) {
            const login = yield select(state => state.login);
            const { paths } = login;
            if (!paths || !paths.find((value) => {
                return value === pathname
            })) {
                router.push("/login");
            } else if (pathname === '/') {
                router.push('/statistical');
            }

        },
    },

    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                console.log('login pathname=' + pathname);
                if (pathname === '/login') {
                    dispatch({ type: 'logout' });
                } else if (pathname === '/binding') {

                } else {
                    console.log('checkPath pathname=' + pathname);
                    dispatch({ type: 'checkPath', pathname });
                }

            });
        },
    },
}