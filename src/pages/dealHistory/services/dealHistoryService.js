import { config, request, download } from '../../../utils/index';

const { api: { dealHistory: dealHistoryApi } } = config;



export function queryAll(params) {
    return request(dealHistoryApi.dealHistoryList, {
        method: 'GET', params
    });
}



export function exportExcel(params) {
    return download(dealHistoryApi.export, { method: 'GET', params })
}