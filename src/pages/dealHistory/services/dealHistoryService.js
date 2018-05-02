import { config, request } from '../../../utils/index';

const { api: { dealHistory: dealHistoryApi } } = config;

export function getStatistical(parms) {
    return request(dealHistoryApi.statistical, { method: 'GET'})
}

export function queryAll(params) {
    return request(dealHistoryApi.dealHistoryList, {
        method: 'GET', params
    });
}