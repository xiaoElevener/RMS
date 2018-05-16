import { config, request } from '../../../utils/index';

const { api: { user: userApi } } = config;

export function login(params) {
    return request(userApi.login, {
        method: 'PUT', body: params
    });
}

