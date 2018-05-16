import { config, request } from '../../../utils/index';

const { api: { weather: weatherApi, dealHistory: dealHistoryApi } } = config;

export function getWeather(params) {
    return request(weatherApi.getWeather, { method: 'GET' });
}

export function getCountStatistical() {
    return request(dealHistoryApi.countStatistical, { method: 'GET' })
}

export function getStatistical(parms) {
    return request(dealHistoryApi.statistical, { method: 'GET' })
}