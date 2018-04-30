import { config, request } from '../../../utils/index';

const { api: { predefinedCode: predefinedCodeApi } } = config;

export function queryAll(params) {
    return request(predefinedCodeApi.predefinedCodeList, {
        method: 'GET', params
    });
}

export function query(id) {
    return request(predefinedCodeApi.predefinedCode + '/' + id, {
        method: 'GET'
    });
}

export function create(values) {
    return request(predefinedCodeApi.predefinedCode, {
        method: 'POST',
        body: values
    }
    );
}

export function remove(id) {
    return request(predefinedCodeApi.predefinedCode + '/' + id, {
        method: 'DELETE'
    });
}

export function update(id, values) {
    return request(predefinedCodeApi.predefinedCode + '/' + id, {
        method: 'PUT', body: values
    });
}


