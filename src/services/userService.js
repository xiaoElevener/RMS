import request from '../utils/request';
import {utils} from '../utils/index';

const {config}= utils;
const {api:{user:userApi}} = config;

export function queryAll() {
  return request(userApi.listUsers,{method:'GET'});
}

export function query(id = 1) {
    return request(userApi.user+'/'+id,{method:'GET'});
}

export function create(user){
    return request(userApi.user+'/'+user.id,{
        method:'POST',
        body:JSON.stringify(user)
    }
);
}