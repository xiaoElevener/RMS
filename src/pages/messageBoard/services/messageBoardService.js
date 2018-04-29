import { config, request } from '../../../utils/index';

const { api: { messageBoard: messageBoardApi } } = config;

export function queryAll(params) {
    return request(messageBoardApi.messageBoardList, {
        method: 'GET', params
    });
}


