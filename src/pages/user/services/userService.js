import {config,request} from '../../../utils/index';

console.log('config='+config+' request=' +request);
const {api:{user:userApi}} = config;

export function queryAll(params) {
  return request(userApi.userList,{method:'GET',params});
}

export function query(id = 1) {
    return request(userApi.user+'/'+id,{method:'GET'});
}

export function create(user){
    return request(userApi.user,{
        method:'POST',
        body:JSON.stringify(user)
    }
);
}