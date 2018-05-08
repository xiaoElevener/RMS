import { config, request } from '../../../utils/index';

const { api: { user: userApi, weather: weatherApi } } = config;

export function login(params) {
    return request(userApi.login, {
        method: 'PUT', body: params
    });
}


export function getWeather(params) {
    return request(weatherApi.getWeather, { method: 'GET' });
}
