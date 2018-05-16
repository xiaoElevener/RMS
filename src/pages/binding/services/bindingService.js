import { config, request } from '../../../utils/index';

const { api: { user: userApi, wechat: wechatApi } } = config;

export function bind(params) {
    return request(userApi.bind, { method: 'POST', body: params })
}

export function getOpenId(params) {
    return request(wechatApi.getOpenId, { method: 'GET', params })
}