import { config, request } from '../../../utils/index';

const { api: { dealHistory: dealHistoryApi } } = config;


export function create(parms) {
    return request(dealHistoryApi.dealHistory, { method: 'POST', body: parms })
}
