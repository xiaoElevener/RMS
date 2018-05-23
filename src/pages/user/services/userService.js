import { config, request } from '../../../utils/index';

const { api: { user: userApi } } = config;

export function queryAll(params) {
    return request(userApi.userList, {
        method: 'GET', params
    });
}

export function query(id) {
    return request(userApi.user + '/' + id, {
        method: 'GET'
    });
}

export function create(values) {
    return request(userApi.user, {
        method: 'POST',
        body: values
    }
    );
}

export function remove(id) {
    return request(userApi.user + '/' + id, {
        method: 'DELETE'
    });
}

export function update(id, values) {
    return request(userApi.user + '/' + id, {
        method: 'PUT', body: values
    });
}

export function getLoginNameList() {
    return request(userApi.loginNameList, {
        method: 'GET',
        options: {}
    });
}


