import { config, request } from '../../../utils/index';

const { api: { consume: consumeApi } } = config;


export function create(parms) {
    return request(consumeApi.dealHistory, { method: 'POST', body: parms })
}