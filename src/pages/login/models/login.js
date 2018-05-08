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

        clear(state, ) {
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
            router.push('/');
        },

        *checkPath({ pathname }, { select }) {
            const login = yield select(state => state.login);
            const { paths } = login;
            if (!paths || !paths.find((value) => {
                return value === pathname
            })) {
                router.push("/login");
            }
        },

        *getWeather({ }, { call, put }) {
            const { vo } = yield call(loginService.getWeather);
            const weather = {
                city: vo.location.name,
                text: vo.now.text,
                temperature: vo.now.temperature,
                code: vo.now.code
            }
            yield put({ type: 'saveWeather', weather });
        }
    },

    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname !== '/login') {
                    dispatch({ type: 'checkPath', pathname });
                } else {
                    dispatch({ type: 'clear' });
                }

                if (pathname === '/') {
                    dispatch({ type: 'getWeather' });
                }
            });
        },
    },
}