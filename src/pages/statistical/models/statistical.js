import * as statisticalService from '../services/statisticalService';
import router from 'umi/router';
import { notification } from 'antd';
export default {
    namespace: 'statistical',
    state: {
        weather: {
            city: null,
            text: null,
            temperature: null,
            code: 99
        },
        countStatistical: {
            wechatUser: null,
            wechatMessage: null,
            dealCount: null
        },
        statistical: [],
    },

    reducers: {
        saveWeather(state, { weather }) {
            return { ...state, weather }
        },
        saveStatistical(state, { payload: statistical }) {
            return { ...state, statistical };
        },
        saveCountStatistical(state, { payload: countStatistical }) {
            return { ...state, countStatistical };
        },
    },

    effects: {
        *getWeather({ }, { call, put }) {
            const { vo } = yield call(statisticalService.getWeather);
            const weather = {
                city: vo.location.name,
                text: vo.now.text,
                temperature: vo.now.temperature,
                code: vo.now.code
            }
            yield put({ type: 'saveWeather', weather });
        },
        *getStatistical({ }, { call, put }) {
            console.log('getStatistical');
            const { voList } = yield call(statisticalService.getStatistical);
            yield put({ type: 'saveStatistical', payload: voList });
        },

        *getCountStatistical({ }, { call, put }) {
            const { vo } = yield call(statisticalService.getCountStatistical);
            yield put({ type: 'saveCountStatistical', payload: vo });
        }
    },

    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/statistical') {
                    dispatch({ type: 'getWeather' });
                    dispatch({ type: 'getStatistical' });
                    dispatch({ type: 'getCountStatistical' });
                }
            });
        },
    },
}