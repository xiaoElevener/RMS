import { config, request, download } from '../../../utils/index';

const { api: { dealHistory: dealHistoryApi } } = config;

export function getStatistical(parms) {
    return request(dealHistoryApi.statistical, { method: 'GET' })
}

export function queryAll(params) {
    return request(dealHistoryApi.dealHistoryList, {
        method: 'GET', params
    });
}

export function getCountStatistical() {
    return request(dealHistoryApi.countStatistical, { method: 'GET' })
}

export function exportExcel(params) {
    return download(dealHistoryApi.export, { method: 'GET', params })
}